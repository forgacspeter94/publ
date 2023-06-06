import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { getUrlVisits } from "@/utils/urls";

function validateRequest(query) {
  let { from, to, interval, id } = query;
  const result = {};

  if (!id) {
    throw new Error("Missing id");
  }

  if (!from) {
    result.from = new Date("2023-05-02");
  } else {
    result.from = new Date(from);
  }

  if (!to) {
    result.to = new Date("2023-06-05");
  } else {
    result.to = new Date(to);
  }

  if (result.from.getTime() > result.to.getTime()) {
    result = {
      ...result,
      from: result.to,
      to: result.from,
    };
  }

  if (!interval || ["day", "hour"].indexOf(interval) === -1) {
    result.interval = "day";
  } else {
    result.interval = interval;
  }

  return result;
}

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

  const { query } = req;

  try {
    const { id, from, to, interval } = validateRequest(query);

    const visitCounts = getUrlVisits(id, from, to, interval);

    return res.status(200).json(visitCounts);
  } catch (error) {
    res.status(400).json({ message: error.message });
    return;
  }
}
