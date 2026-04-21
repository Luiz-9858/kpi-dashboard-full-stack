// pages/_document.js
// Configuração do documento HTML base + PWA

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Preload fontes para performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Meta tags básicas */}
        <meta
          name="description"
          content="Dashboard de KPIs para desenvolvedores Full Stack integrado com Notion e GitHub"
        />
        <meta name="author" content="KPI Dashboard" />

        {/* PWA Meta Tags */}
        <meta name="application-name" content="KPI Dashboard" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="KPI Dashboard" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#3b82f6" />

        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Ícones */}
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/icon-512x512.png"
        />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Splash Screens iOS (opcional) */}
        <link
          rel="apple-touch-startup-image"
          href="/icon-512x512.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
        />

        {/* Previne flash de tema (FOUC) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
