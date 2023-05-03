import { getServerSession } from "next-auth/next";
import { prisma } from "@/utils/db";
import { set } from "@/utils/redis";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { body } = req;

  await prisma.urlRedirects.create({
    data: {
      redirect: body.redirect,
      url: body.url,
      userEmail: session.user.email,
    },
  });

  await set(body.slug, body.url);

  res.status(200).json({ message: "success" });
}
