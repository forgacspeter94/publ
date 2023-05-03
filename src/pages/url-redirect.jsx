import React, { useState } from "react";
import { getServerSession } from "next-auth";
import axios from "axios";
import { authOptions } from "./api/auth/[...nextauth]";

const UrlRedirect = () => {
  const [url, setUrl] = useState("");
  const [redirect, setRedirect] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/api/url/save", { url, redirect });

      if (res.status === 200) {
        setUrl("");
        setRedirect("");
      } else {
        const { message } = await res.json();
        setError(message);
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <h1>Add URL Redirect</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="url">URL</label>
          <input
            disabled={loading}
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="redirect">Redirect</label>
          <input
            disabled={loading}
            id="redirect"
            type="text"
            value={redirect}
            onChange={(e) => setRedirect(e.target.value)}
          />
        </div>
        <button disabled={loading} type="submit">
          Add
        </button>
        {error && <p>{error}</p>}
        {loading && <p>Loading...</p>}
      </form>
    </>
  );
};

export default UrlRedirect;

export const getServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
