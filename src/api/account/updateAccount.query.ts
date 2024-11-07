import { supabase } from "@/utils/supabase";
import { Account } from "@/supabase_types";


export const updateAccount = async (
    userId: string,
    updates: Partial<Account>,
  ): Promise<any> => {
    try {
      const { data, error } = await supabase
        .from("account")
        .update(updates)
        .eq("id", userId)
        .single();
  
      if (error) throw error;
      return { account: data, error: null };
    } catch (error) {
      console.error("Error updating account:", error);
      return { account: null, error: error as Error };
    }
  };
