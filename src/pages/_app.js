import "@/styles/globals.css";
import Script from "next/script";
import { ThemeProvider } from "../../components/ThemeContext";

function App({ Component, pageProps }) {
  return (
    <>
      <Script
        async
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        id="google-analytics-script"
        defer
      />

      <Script strategy="lazyOnload" id="google-analytics-inline-script">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
      </Script>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
export default App;
