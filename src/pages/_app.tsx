import { GlobalStyles } from "../styles/globalStyles";
import type { AppProps } from "next/app";
import "./globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
