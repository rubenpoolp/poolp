import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.44.2";
import { supabaseClient as supabaseServiceClient } from "../_shared/supabase_client.ts";

function sendNotification(userIds: string[]) {
  supabaseServiceClient.functions.invoke('send_notification', {
    body: { 
      userIds,
      title: "poolp",
      body: "⏳ Posts are awaiting you in your circle. Discover now from who!"
    }
  });
}

const handler = async (request: Request) => {
  try {

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { global: { headers: { Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}` } } });
    

    // 1. Get all users with their circles
    const { data: circles, error: circlesError } = await supabaseClient
      .from('circles')
      .select('id,created_at,user_ids')
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
    
    if (circlesError) throw circlesError;


    const {data: users, error: usersError} = await supabaseClient
      .from('account')
      .select('id,last_interaction_at')
      .in('id', circles.flatMap(circle => circle.user_ids));

    if (usersError) throw usersError;

    const {data: circlePics, error: circlePicsError} = await supabaseClient
      .from('circle_pics')
      .select('circle_id, created_at')
      .in('circle_id', circles.map(circle => circle.id))
      .order('created_at', { ascending: false })

    if (circlePicsError) throw circlePicsError;
 
    const usersToNotify = new Set<string>();

    // Create a Map of the most recent pics by circle
    const mostRecentPicsByCircle = new Map<string, string>();
    for (const pic of circlePics) {
      const existingPic = mostRecentPicsByCircle.get(pic.circle_id);
      if (!existingPic || new Date(pic.created_at) > new Date(existingPic)) {
        mostRecentPicsByCircle.set(pic.circle_id, pic.created_at);
      }
    }

    for (const circle of circles) {
      // Verify if there is a most recent pic for this circle
      const mostRecentPicDate = mostRecentPicsByCircle.get(circle.id);
      if (mostRecentPicDate) {
        const circleUsers = users.filter(user => circle.user_ids.includes(user.id));
        
        for (const user of circleUsers) {
          // Verify if the user has not interacted since the circle was created
          if (new Date(user.last_interaction_at) < new Date(circle.created_at)) {
            usersToNotify.add(user.id);
          }
        }
      }
    }
    // Send notifications to inactive users
    if (usersToNotify.size > 0) {
      await sendNotification(Array.from(usersToNotify));
    }

    return new Response(
      JSON.stringify({ success: true, notified_users: usersToNotify.size }), 
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error sending notification" }), { status: 500 });
  }
}

Deno.serve(handler)

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/inactive-users-notifs' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
