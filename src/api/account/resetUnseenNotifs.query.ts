import { supabase } from "@/utils/supabase";

export const resetUnseenNotifs = async (userId: string): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from("account")
      .update({ unseen_notifs: 0 })
      .eq("id", userId)
      .single();

    if (error) throw error;
    return { account: data, error: null };
  } catch (error) {
    console.error("Error resetting unseen notifications:", error);
    return { account: null, error: error as Error };
  }
}; 