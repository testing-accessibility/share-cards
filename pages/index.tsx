import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Share Cards Generator</title>
        <meta
          name="description"
          content="Social share cards for TestingAccessibility.com"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Link
          passHref
          href="/api/resource?title=Foundations%20of%20Accessibility&image=https://res.cloudinary.com/testing-accessibility/image/upload/v1652688645/00-foundations-of-accessibility/01-setting-the-stage-for-testing-accessibility/illustration-setting-the-stage-for-testing-accessibility_2x_o36van.png"
        >
          <a download="card@2x">Download Example</a>
        </Link>
      </main>
    </div>
  );
};

export default Home;
