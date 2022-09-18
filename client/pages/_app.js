import "../styles/globals.css";
import Router from "next/router";
import Layout from "../components/Layout";
import NProgress from "nprogress";
import { AuthenticationProvider } from "../context/authenticationContext";
import { PostingProvider } from "../context/postingContext";
import { CommentProvider } from "../context/commentContext";
import { FollowerProvider } from "../context/followerContext";
import { LikesProvider } from "../context/likesContext";

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
          <LikesProvider>
            <FollowerProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </FollowerProvider>
          </LikesProvider>
        </CommentProvider>
      </PostingProvider>
    </AuthenticationProvider>
  );
}

export default MyApp;
