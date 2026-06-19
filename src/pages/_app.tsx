import "@/styles/globals.css";
import "@/lib/i18n"; // 👈 esto inicializa i18n
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import SEO from "@/components/layout/SEO";

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <SEO />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default App;