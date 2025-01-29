import { supabase } from "@/utils/supabase";

export const decrementUnseenNotifs = async (userId: string): Promise<any> => {
  try {
    // D'abord on récupère la valeur actuelle
    const { data: currentData, error: selectError } = await supabase
      .from("account")
      .select("unseen_notifs")
      .eq("id", userId)
      .single();

    if (selectError) throw selectError;

    // Calculate the new value (minimum 0)
    const newValue = Math.max(0, (currentData?.unseen_notifs || 0) - 1);

    // Update with the new value
    const { data, error } = await supabase
      .from("account")
      .update({ unseen_notifs: newValue })
      .eq("id", userId)
      .single();

    if (error) throw error;
    return { account: data, error: null };
  } catch (error) {
    console.error("Error decrementing unseen notifications:", error);
    return { account: null, error: error as Error };
  }
}; 