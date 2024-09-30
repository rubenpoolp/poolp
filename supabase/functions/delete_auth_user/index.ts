import { createClient } from "https://esm.sh/@supabase/supabase-js@2.44.2";
import { corsHeaders } from "../_shared/cors.ts";
import { supabaseClient as supabaseServiceClient } from "../_shared/supabase_client.ts";

const handler = async (request: Request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  } else if (request.method !== "POST") throw new Error("Only POST");

  // Create a Supabase client with the Auth context of the logged in user.
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    // Create client with Auth context of the user that called the function.
    // This way your row-level-security (RLS) policies are applied.
    {
      global: {
        headers: { Authorization: request.headers.get("Authorization")! },
      },
      auth: { persistSession: false },
    },
  );

  const {
    data: { user },
    error: userError,
  } = await supabaseClient.auth.getUser();
  if (userError) throw userError;

  const isAdmin = user!.app_metadata.isAdmin;
  if (isAdmin) throw new Error("Admin user can not be deleted");

  // Finally delete user from Supabase Authentication
  const { data, error } = await supabaseServiceClient.auth.admin.deleteUser(
    user!.id,
  );
  if (error) throw error;

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
};

Deno.serve(handler);
