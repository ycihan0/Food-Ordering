import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/globals.css";
import Layout from "/layout/layout";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";
import NProgress from "nprogress"; 
import Router from "next/router";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <ToastContainer />
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}
