import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>URL Shortener</title>
      </Head>
      <main>
        <nav>
          <Link href="/">Home</Link>
          {session ? (
            <>
              <Link href="/url-redirect">New Redirect</Link>
              <Link href="/list">List</Link>
              <button onClick={() => signOut()}>Sign out</button>
            </>
          ) : (
            <>
              <button onClick={() => signIn()}>Sign in</button>
            </>
          )}
        </nav>
        <h1>URL Shortener</h1>
        <div>
          {session && (
            <>
              Signed in as {session.user.email} <br />
            </>
          )}
        </div>
      </main>
    </>
  );
}
