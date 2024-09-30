import { supabase } from "@src/utils/supabase";

const deleteAuthUser = async (): Promise<any> => {
  const { data, error } = await supabase.functions.invoke("delete_auth_user");

  if (error) throw error;

  return data;
};

export default deleteAuthUser;
