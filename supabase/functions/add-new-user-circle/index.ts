// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.44.2";

const handler = async (req: Request) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { global: { headers: { Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}` } } });
    
    const { data: user, error: userError } = await supabaseClient
      .from('account')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (userError) throw userError;
    
    if (!user) {
      throw new Error('No user found')
      return new Response(JSON.stringify({ error: 'No user found', userError: userError, user: user }), { status: 400 });
    };

    const user_id = user.id;

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    
    const { data: recentCircles, error: circlesError } = await supabaseClient
      .from('circles')
      .select('id, user_ids')
      .eq('school_id', user.school_id)
      .order('created_at', { ascending: false })
      .gte('created_at', twentyFourHoursAgo);

    if (circlesError) throw circlesError;

    if (!recentCircles || recentCircles.length === 0) {
      const { data: newCircle, error: createError } = await supabaseClient
        .from('circles')
        .insert([
          { 
            name: "Daily Circle",
            user_ids: [user_id],
            school_id: user.school_id,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (createError) throw createError;

      return new Response(JSON.stringify({ 
        message: `New circle created with user ${user_id} (no recent circles)`,
        circle_id: newCircle.id
      }), { status: 200 });
    }

    // verify if user is already in any circle
    const isUserInAnyCircle = recentCircles.some(circle => 
      circle.user_ids?.includes(user_id)
    );

    if (isUserInAnyCircle) {
      throw new Error('User is already in a circle');
    }

    // filter circles with less than 4 participants
    const availableCircles = recentCircles.filter(circle => 
      (circle.user_ids.length) < 4
    );


    if (availableCircles.length === 0) {
      // Create a new circle if all existing circles are full
      const { data: newCircle, error: createError } = await supabaseClient
        .from('circles')
        .insert([
          { 
            name: "Daily Circle",
            user_ids: [user_id],
            school_id: user.school_id,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (createError) throw createError;

      return new Response(JSON.stringify({ 
        message: `New circle created with user ${user_id}`,
        circle_id: newCircle.id
      }), { status: 200 });
    }

    // find the circle with the least participants
    const circleWithLeastUsers = availableCircles.reduce((min, circle) => {
      const currentLength = circle.user_ids?.length || 0;
      const minLength = min.user_ids?.length || 0;
      return currentLength < minLength ? circle : min;
    }, availableCircles[0]);

    // verify if user is already in the circle
    if (circleWithLeastUsers.user_ids?.includes(user_id)) {
      throw new Error('User already in circle');
    }

    // update the circle with the new user
    const updatedUserIds = [...(circleWithLeastUsers.user_ids || []), user_id];
    const { error: updateError } = await supabaseClient
      .from('circles')
      .update({ user_ids: updatedUserIds })
      .eq('id', circleWithLeastUsers.id);

    if (updateError) throw updateError;

    return new Response(JSON.stringify({ 
      message: `User ${user_id} added to circle ${circleWithLeastUsers.id}`,
      circle_id: circleWithLeastUsers.id
    }), { status: 200 });
    
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

Deno.serve(handler)

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/add-new-user-circle' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    
*/
