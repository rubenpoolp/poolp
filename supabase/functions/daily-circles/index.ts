import "jsr:@supabase/functions-js/edge-runtime.d.ts"

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.44.2";
import { supabaseClient as supabaseServiceClient } from "../_shared/supabase_client.ts";


console.log("Hello from Daily Circles Function!")

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
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    );
    
    // Récupération des utilisateurs actifs
    const { data: users, error } = await supabaseClient
      .from('account')
      .select('id')
      // .eq('is_active', true);

    if (error) throw error;
    if (!users?.length) {
      return new Response(JSON.stringify({ message: 'No active users found.' }), { status: 200 });
    }

    // Création des groupes
    const shuffledUsers = shuffleArray(users);
    const groups = divideIntoGroups(shuffledUsers.length);
    const userGroups = groups.reduce<string[][]>((acc, size) => {
      const start = acc.flat().length;
      acc.push(shuffledUsers.slice(start, start + size).map(user => user.id));
      return acc;
    }, []);

    // Création des cercles
    const createdCircles = await Promise.all(
      userGroups.map(group => 
        supabaseClient
          .from('circles')
          .insert({ 
            created_at: new Date().toISOString(), 
            user_ids: group, 
            name: "Daily Circle" 
          })
          .select()
          .single()
      )
    );

    const errors = createdCircles.filter(result => result.error);
    if (errors.length) {
      throw new Error(`Failed to create some circles: ${JSON.stringify(errors)}`);
    }

    return new Response(JSON.stringify({ 
      message: 'Success', 
      totalUsers: users.length,
      createdCircles: createdCircles.length
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
