import { getServerSession } from "next-auth/next";
import superjson from "superjson";
import { authOptions } from "../../auth/[...nextauth]";
import { getUrlDetails } from "@/utils/urls";

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
  const redirectId = req.query.id;

  const urlDetails = await getUrlDetails(redirectId);

  res.status(200).json(superjson.stringify(urlDetails));
}
