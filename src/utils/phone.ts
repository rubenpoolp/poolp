import { supabase } from "./supabase";

export const sendSMS = async () => {
  console.log("sendSMS");
  const { data, error } = await supabase.auth.signInWithOtp({
    phone: "+33601214180",
    // phone: "+33685342981",
  });
  console.log("Result signInWithOtp", data, error);
};

export const checkCode = async () => {
  console.log("checkCode");
  const { data, error } = await supabase.auth.verifyOtp({
    phone: "+33685342981",
    token: "123456",
    type: "sms",
  });
  console.log("Result checkCode", data, error);
};
