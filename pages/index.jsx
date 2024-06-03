import Head from "next/head";
import Home from "./home";
import Header from "@/components/layout/Header";

export default function Index() {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </Head>
      <Header />
      <Home />
      <div className="p-20 container mx-auto">
        <input type="email" placeholder="Email"/>
      </div>
    </div>
  );
}
