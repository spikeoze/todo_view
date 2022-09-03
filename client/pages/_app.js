import "../styles/globals.css";
import Router from "next/router";
import Layout from "../components/Layout";
import NProgress from "nprogress";
import { AuthenticationProvider } from "../context/authenticationContext";
import { UserPostProvider } from "../context/userPostContext";
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
      <UserPostProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserPostProvider>
    </AuthenticationProvider>
  );
}

export default MyApp;
