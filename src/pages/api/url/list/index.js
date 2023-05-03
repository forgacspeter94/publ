import { getServerSession } from "next-auth/next";
import superjson from "superjson";
import { authOptions } from "../auth/[...nextauth]";
import { listUserUrls } from "@/utils/urls";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const skip = req.query.skip ? parseInt(req.query.skip) : 0;

  const urls = await listUserUrls(session.user.email, skip);

  res.status(200).json(superjson.stringify(urls));
}
