import { createAccount, getAccountById } from "@queries/account.query";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@utils/supabase";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  user: User | null;
  isAdmin: boolean;
  session: Session | null;
  loading: boolean;
  sendSMS: (phone: string) => Promise<{ data: any; error: any }>;
  checkCode: (
    phone: string,
    token: string,
  ) => Promise<{ hasAccount: boolean; error: any }>;
  signUp: (onboardingUser: User) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!mounted) return;
      if (error)
        console.error("Error fetching initial session:", error.message);
      if (session) {
        setSession(session);
        await getAccountById(session.user.id)
          .then(({ account }) => {
            setUser(account);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }

    getInitialSession();

    const { data } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (mounted) {
          setSession(session);
          if (session)
            getAccountById(session.user.id)
              .then(({ account }) => {
                setUser(account);
              })
              .finally(() => {
                setLoading(false);
              });
          else setLoading(false);
        }
      },
    );

    return () => {
      mounted = false;
      data?.subscription.unsubscribe();
    };
  }, []);

  const sendSMS = async (phone: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
    });

    return { data, error };
  };

  // The goal of checkCode is to signIn if the user has account
  // If not, continue the onboarding process to signUp at the end
  const checkCode = async (phone: string, token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: "sms",
    });

    if (error) throw error;

    const userId = data?.session?.user?.id;
    setSession(data?.session);
    if (!userId) throw new Error("No user id");

    const { account: accountResult } = await getAccountById(userId);

    return { hasAccount: !!accountResult, error };
  };

  const signUp = async (onboardingUser: User) => {
    await createAccount({
      ...onboardingUser,
      id: session?.user?.id,
      school_id: "94638a44-0395-4ce5-95a0-a74a58dac0d5",
    })
      .then((result) => {
        setUser(result.account);
      })
      .catch((error) => {
        console.warn("Error creating account:", error);
      });
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setSession(null);
  };

  const value: AuthContextType = {
    user,
    isAdmin: user?.role === "admin",
    session,
    loading,
    sendSMS,
    checkCode,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
