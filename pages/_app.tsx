import { useState } from 'react';
import type { AppProps } from 'next/app';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import '../styles/globals.css';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

const HiringApp = ({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) => {
  // Create a new supabase client for each page load
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    // Provide the supabase client and initial session to the session context
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </SessionContextProvider>
  );
};
export default HiringApp;
