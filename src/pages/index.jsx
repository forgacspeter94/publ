import Head from "next/head";
import { useSession} from "next-auth/react";
import Nav from "@/components/Nav";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>URL Shortener</title>
      </Head>
      <main>
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
