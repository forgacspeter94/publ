import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <>
      <Head>
        <title>URL Shortener</title>
      </Head>
      <main>
        <h1>URL Shortener</h1>
        <div>
          {!session && (
            <>
              Not signed in <br />
              <button onClick={() => signIn()}>Sign in</button>
            </>
          )}
          {session && (
            <>
              Signed in as {session.user.email} <br />
              <button onClick={() => signOut()}>Sign out</button>
            </>
          )}
        </div>
      </main>
    </>
  );
}
