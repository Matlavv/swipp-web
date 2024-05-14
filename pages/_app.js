import { AuthProvider } from "@/utils/AuthContext";
import Head from "next/head";
import "../app/globals.css";
import RootLayout from "../app/layout";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <RootLayout>
        <Head>
          <title>Swipp</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <Component {...pageProps} />
      </RootLayout>
    </AuthProvider>
  );
}

export default MyApp;
