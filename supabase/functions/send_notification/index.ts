// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.44.2";

const fetchPushTokensFromUserIds = async (supabaseClient: SupabaseClient, userIds: string[]) => {
  try {
    const { data, error } = await supabaseClient
      .from('account')
      .select('id, push_token, unseen_notifs')
      .in('id', userIds)
      .neq('push_token', null);

    if (error) {
      console.error('Error fetching push tokens:', error);
      return [];
    }

    return data.map((record: { id: string, push_token: string, unseen_notifs: number }) => ({
      id: record.id,
      token: `ExponentPushToken[${record.push_token}]`,
      unseenNotifications: record.unseen_notifs || 0
    }));
  } catch (error) {
    console.error('Error fetching push tokens:', error);
    return [];
  }
};

const incrementUnseenNotifications = async (supabaseClient: SupabaseClient, userIds: string[]) => {
  try {
    // Retrieve current unseen notifications
    const { data: currentData, error: selectError } = await supabaseClient
      .from('account')
      .select('id, unseen_notifs')
      .in('id', userIds);

    if (selectError) {
      console.error('Error fetching current unseen notifications:', selectError);
      return;
    }

    // Update each user with their new value
    const updatePromises = currentData.map(user => {
      const newValue = (user.unseen_notifs || 0) + 1;
      return supabaseClient
        .from('account')
        .update({ unseen_notifs: newValue })
        .eq('id', user.id);
    });

    await Promise.all(updatePromises);
  } catch (error) {
    console.error('Error incrementing unseen notifications:', error);
  }
};

const handler = async (req: Request) => {
  try {
    const { userIds, title, body } = await req.json();

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return new Response(
        JSON.stringify({ error: "userIds must be a non-empty array" }), 
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!title || !body) {
      return new Response(
        JSON.stringify({ error: "title and body are required" }), 
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { global: 
        { headers:
          { Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}` } 
        }
       }
    );

    const userTokens = await fetchPushTokensFromUserIds(supabaseClient, userIds);
    
    console.log("userTokens", userTokens);
    if (userTokens.length === 0) {
      return new Response(
        JSON.stringify({ error: "No tokens found" }), 
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Increment unseen notifications counter for each user
    await incrementUnseenNotifications(supabaseClient, userIds);

    // send notifications in parallel
    const notificationPromises = userTokens.map((userToken) => 
      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: userToken.token,
          sound: 'default',
          title: title,
          body: body,
          badge: userToken.unseenNotifications + 1,
          data: {
            url: "Home"
          },
        }),
      })
    );

    // wait for all notifications to be sent
    const results = await Promise.all(notificationPromises);
    
    // check results
    const failedNotifications = [];
    for (let i = 0; i < results.length; i++) {
      if (!results[i].ok) {
        const errorText = await results[i].text();
        console.error('Failed to send notification:', errorText);
        failedNotifications.push({ token: userTokens[i].token, error: errorText });
      }
    }

    return new Response(
      JSON.stringify({ 
        message: "success", 
        notificationsSent: results.length - failedNotifications.length,
        failedNotifications 
      }), 
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("send_notification", error);
    return new Response(
      JSON.stringify({ error: "Failed to send notifications" }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

Deno.serve(handler);

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/send_notification' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{
      "userIds": ["ExponentPushToken[xxxx]"],
      "title": "Notification de test",
      "body": "Ceci est une description."
    }'

*/
