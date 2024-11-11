import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.44.2";
import { supabaseClient as supabaseServiceClient } from "../_shared/supabase_client.ts";

function sendNotification(userIds: string[]) {
  supabaseServiceClient.functions.invoke('send_notification', {
    body: { 
      userIds,
      title: "💜 New circle to discover!",
      body: "Post to find who is in your circle today!"
    }
  });
}

function divideIntoGroups(n: number): number[] {
  const groups = [];
  
  while (n > 0) {
    if (n % 3 === 0) {
      for (let i = 0; i < n / 3; i++) {
        groups.push(3);
      }
      break;
    } else if (n % 3 === 1) {
      for (let i = 0; i < Math.floor(n / 3) - 1; i++) {
        groups.push(3);
      }
      groups.push(4);
      break;
    } else if (n % 3 === 2) {
      for (let i = 0; i < Math.floor(n / 3); i++) {
        groups.push(3);
      }
      groups.push(2);
      break;
    }
  }
  return groups;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const handler = async (request: Request) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { global: { headers: { Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}` } } });
    
    const { data: users, error } = await supabaseClient
      .from('account')
      .select('id, school_id')
      .order('school_id')

    if (error) throw error;
    if (!users?.length) {
      return new Response(JSON.stringify({ message: 'No active users found.' }), { status: 200 });
    }

    // Group users by school
    const usersBySchool = users.reduce<Record<string, string[]>>((acc, user) => {
      acc[user.school_id] = [...(acc[user.school_id] ?? []), user.id];
      return acc;
    }, []);

    // Shuffle users by school
    const shuffledUsersBySchool = Object.fromEntries(
      Object.entries(usersBySchool).map(([schoolId, users]) => [
        schoolId,
        shuffleArray(users)
      ])
    );

    // Define group sizes by school
    const lengthGroupsBySchool = Object.fromEntries(
      Object.entries(shuffledUsersBySchool).map(([schoolId, users]) => [
        schoolId,
        divideIntoGroups(users.length)
      ])
    );

    // Create user groups by school
    const userGroupsBySchool = Object.fromEntries(
      Object.entries(shuffledUsersBySchool).map(([schoolId, users]) => {
        const groupSizes = lengthGroupsBySchool[schoolId];
        const groups = [];
        let currentIndex = 0;

        // For each group size defined
        for (const size of groupSizes) {
          // Extract a subarray of users of the specified size
          const group = users.slice(currentIndex, currentIndex + size);
          groups.push(group);
          currentIndex += size;
        }

        return [schoolId, groups];
      })
    );
    
    // Check for duplicates, it's not necessary but I think it's a good thing.
    const checkForDuplicates = () => {
      for (const [schoolId, groups] of Object.entries(userGroupsBySchool)) {
        const allUsersInGroups = groups.flat();
        const uniqueUsers = new Set(allUsersInGroups);
        
        if (allUsersInGroups.length !== uniqueUsers.size) {
          throw new Error(`Duplicate users found in school ${schoolId}`);
        }

        // Vérifier que tous les utilisateurs originaux sont présents
        const originalUsers = new Set(shuffledUsersBySchool[schoolId]);
        if (uniqueUsers.size !== originalUsers.size) {
          throw new Error(`Missing users in groups for school ${schoolId}`);
        }

        for (const user of uniqueUsers) {
          if (!originalUsers.has(user)) {
            throw new Error(`Unknown user ${user} in groups for school ${schoolId}`);
          }
        }
      }
    };

    checkForDuplicates();

    // Créer les cercles pour chaque groupe de chaque école
    const createdCircles = await Promise.all(
      Object.entries(userGroupsBySchool).flatMap(([schoolId, groups]) =>
        groups.map(group =>
          supabaseClient
            .from('circles')
            .insert({
              created_at: new Date().toISOString(),
              user_ids: group,
              name: "Daily Circle",
              school_id: schoolId,
            })
            .select()
            .single()
        )
      )
    );

    // Vérifier s'il y a des erreurs
    const errors = createdCircles.filter(result => result.error);
    if (errors.length) {
      throw new Error(`Failed to create some circles: ${JSON.stringify(errors)}`);
    }

    sendNotification(createdCircles.map(circle => circle.data?.user_ids).flat());

    return new Response(JSON.stringify({ 
      message: 'Success', 
    }), { status: 200 });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ 
      error: 'An error occurred',
      details: error.message 
    }), { status: 500 });
  }
}

Deno.serve(handler);

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/daily-circles' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
