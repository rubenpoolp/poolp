import { User } from "@supabase/supabase-js";
import { supabase } from "@utils/supabase";

// Read an account by ID
export const getAccountById = async (userId: string): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from("account")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return { account: data, error: null };
  } catch (error) {
    console.error("Error fetching account:", error); // Si c'est après un Sign Up c'est normal, l'account n'existe pas encore mais est entrain d'être créé
    return { account: null, error: error as Error };
  }
};

// Create an account
export const createAccount = async (data: any): Promise<any> => {
  try {
    console.log("data", data);
    const { data: account, error } = await supabase
      .from("account")
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return { account, error: null };
  } catch (error) {
    console.error("Error creating account:", error);
    return { account: null, error: error as Error };
  }
};

// Update an account
export const updateAccount = async (
  userId: string,
  updates: Partial<User>,
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
