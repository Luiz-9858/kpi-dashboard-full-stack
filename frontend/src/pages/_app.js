// pages/_app.js
// Layout principal da aplicação Next.js

import "../styles/globals.css";
import Head from "next/head";
import { NotificationProvider } from "@/hooks/useNotifications";

function MyApp({ Component, pageProps }) {
  // Pegar dados do dashboard se existirem (para gerar notificações globais)
  const dashboardData = pageProps.dashboardData || null;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NotificationProvider dashboardData={dashboardData}>
        <Component {...pageProps} />
      </NotificationProvider>
    </>
  );
}

export default MyApp;
