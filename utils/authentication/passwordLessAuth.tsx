import { supabase } from '../supabaseClient';

/*
signInWithEmail function
The signInWithEmail function assumes that the user will always be redirected to a fixed URL ("redirect url").
It might be more flexible to make this URL a parameter that can be passed to the function when it's called.
This would allow for greater customization and flexibility in how the user is redirected after signing in.
*/

export async function signInWithEmail(email: string, redirectTo?: string) {
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo || window.location.href,
      },
    });
    if (error instanceof Error) {
      throw error;
    }
    return "Check your email for a magic link";
  } catch (error) {
    console.error("Error signing in:", error);
    return error instanceof Error ? error.message : "Unknown error";
  }
}

// signOut function

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error instanceof Error) {
      throw error;
    }
    return "Signed out successfully";
  } catch (error) {
    console.error("Error signing out:", error);
    return error instanceof Error ? error.message : "Unknown error";
  }
}