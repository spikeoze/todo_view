import "../styles/globals.css";
import Router from "next/router";
import Layout from "../components/Layout";
import NProgress from "nprogress";
import { AuthenticationProvider } from "../context/authenticationContext";
import { PostingProvider } from "../context/postingContext";
import { CommentProvider } from "../context/commentContext";
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
        <CommentProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CommentProvider>
      </PostingProvider>
    </AuthenticationProvider>
  );
}

export default MyApp;
