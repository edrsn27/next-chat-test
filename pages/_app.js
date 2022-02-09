// pages/_app.js
import "../assets/css/styles.css";
import "../assets/css/chat.styles.css";
import { ApolloProvider } from "@apollo/client";

export default function MyApp({ Component, pageProps }) {
  return (
 
      <Component {...pageProps} />
 
  );
}
