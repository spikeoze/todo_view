import "../styles/globals.css";
import Router from "next/router";
import Layout from "../components/Layout";
import NProgress from "nprogress";
import { AuthenticationProvider } from "../context/authenticationContext";
import { PostingProvider } from "../context/postingContext";
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
      <PostingProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PostingProvider>
    </AuthenticationProvider>
  );
}

export default MyApp;
