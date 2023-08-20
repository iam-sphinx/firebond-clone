import React, { useState } from 'react';
// Magic Link uses passwordless authentication 
import { signInWithEmail, signOut } from './passwordLessAuth'

function SignInButton() {
  const [email, setEmail] = useState('');
  const [signInStatus, setSignInStatus] = useState('');

  async function handleSignIn() {
    const redirectTo = 'http://localhost:3000//WelcomeScreen1'; 
    const status = await signInWithEmail(email, redirectTo);
    setSignInStatus(status);
  }

  async function handleSignOut() {
    const status = await signOut();
    setSignInStatus(status);
  }

  return (
    <>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSignIn}>Sign in with email</button>
      <button onClick={handleSignOut}>Sign out</button>
      <p>{signInStatus}</p>
    </>
  );
}

export default SignInButton;
