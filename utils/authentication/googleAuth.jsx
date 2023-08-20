import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../supabaseClient';
import * as React from 'react'
const clientID = process.env.GOOGLE_CLIENT_ID || "640369537337-0gnn37hbv8lukchvmbgte9u3631rjsqh.apps.googleusercontent.com";
function GoogleSignInButton() {
  const router = useRouter()

  useEffect(() => {
    // Initialize the Google Sign-In API
    gapi.load('auth2', function () {
      gapi.auth2.init({
        client_id: clientID,
      })
    })
  }, [])

  async function handleSignIn() {
    try {
      // Authenticate with Supabase using the Google provider
      const { data , error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: 'http://localhost:3000/WelcomeScreen1'
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  async function handleSignOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error(error)
      } else {
        router.push('/WelcomeScreen1') // Redirect the user to the sign-in page on successful sign-out
      }
    } catch (error) {
      console.error(error)
    }
  }

  return handleSignIn;
}

export default GoogleSignInButton;
