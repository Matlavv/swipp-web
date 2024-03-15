import Head from "next/head";
import "../app/globals.css";
import RootLayout from "../app/layout";

function MyApp({ Component, pageProps }) {
  return (
    <RootLayout>
      <Head>
        <title>Swipp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
