import "@/styles/globals.css";
import { ThemeProvider } from "../../components/ThemeContext";

function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default App;
