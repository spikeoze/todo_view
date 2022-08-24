import "../styles/globals.css";
import Router from "next/router";
import Layout from "../components/Layout";
import NProgress from "nprogress";
import { AuthenticationProvider } from "../context/authenticationContext";
function MyApp({ Component, pageProps }) {
  NProgress.configure({ showSpinner: false });

  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });
  return (
    <AuthenticationProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthenticationProvider>
  );
}

export default MyApp;
