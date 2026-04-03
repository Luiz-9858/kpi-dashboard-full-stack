// pages/_app.js
// Layout principal da aplicação Next.js

import '../styles/globals.css';
import Head from 'next/head';
import { SpeedInsights } from '@vercel/speed-insights/react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <Component {...pageProps} />
      </div>
      <SpeedInsights />
    </>
  );
}

export default MyApp;
