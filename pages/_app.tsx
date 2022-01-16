import "../styles/globals.css";
import { AppProps } from "next/app";
import AppWrapper from "../context/AppWrapper";
import App from "next/app";

function MyApp({ Component, pageProps }) {
  // const productRequests = feedback["productRequests"];
  // console.log(appProps);
  return (
    // <AppWrapper value={appProps}>
    <Component {...pageProps} />
    // {/* </AppWrapper> */}
  );
}

export default MyApp;

// MyApp.getInitialProps = async () => {
//   const res = await fetch("http://localhost:3000/api");
//   const feedback = await res.json();

//   return {
//     appProps: {
//       feedback,
//     },
//   };
// };
