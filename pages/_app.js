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
        </Head>
        <Component {...pageProps} />
      </RootLayout>
    </AuthProvider>
  );
}

export default MyApp;
