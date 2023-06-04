import React, { useState } from "react";
import { getServerSession } from "next-auth";
import axios from "axios";
import { authOptions } from "./api/auth/[...nextauth]";
import Form from "../components/Form"


const UrlRedirect = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async ({url, redirect}) => {
    console.log("submit");
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/api/url/save", { url, redirect });

      if (res.status !== 200) {
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
      <Form onSubmit={handleSubmit} error={error} loading={loading} />
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
