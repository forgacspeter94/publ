import { prisma } from "@/utils/db";
import { get, ttl } from "./redis";

export async function listUserUrls(email, skip) {
  const urls = await prisma.urlRedirects.findMany({
    where: {
      userEmail: email,
    },
    select: {
      id: true,
      url: true,
      redirect: true,
    },
    take: 10,
    skip: skip,
  });

  return urls;
}

export async function getUrlDetails(redirectId) {
  const url = await prisma.urlRedirects.findUnique({
    where: {
      id: redirectId,
    },
    select: {
      url: true,
      redirect: true,
      Visit: {
        select: {
          id: true,
          createdAt: true,
        },
      },
      _count: {
        select: {
          Visit: true,
        },
      },
    },
  });

  const { _count, ...urlData } = url;

  const data = {
    ...urlData,
    visitCount: _count.Visit,
  };

  const inCache = await get(urlData.redirect);

  if (inCache) {
    const inCachettl = await ttl(urlData.redirect);

    data.cache = {
      inCache: true,
      ttl: inCachettl,
    };
  } else {
    data.cache = {
      inCache: false,
    };
  }

  return data;
}

export async function getUrlVisits(redirectId, from, to, interval) {
  if (interval === "day") {
    return await getDailyUrlVisits(redirectId, from, to);
  } else if (interval === "hour") {
    return await getHourlyUrlVisits(redirectId, from, to);
  }
}

async function getDailyUrlVisits(redirectId, from, to) {
  const visits =
    await prisma.$queryRaw`SELECT COUNT(id) as count, "urlId", DATE_TRUNC('day', "createdAt") as day FROM "Visit" WHERE "urlId" = ${redirectId} AND "createdAt" BETWEEN ${from} AND ${to} GROUP BY "urlId", day ORDER BY day ASC `;

  const visitCounts = visits.map((visit) => {
    return {
      time: visit.day.toISOString().split("T")[0],
      count: Number(visit.count),
    };
  });

  return visitCounts;
}

async function getHourlyUrlVisits(redirectId, from, to) {
  const visits =
    await prisma.$queryRaw`SELECT COUNT(id) as count, "urlId", DATE_TRUNC('hour', "createdAt") as hour FROM "Visit" WHERE "urlId" = ${redirectId} AND "createdAt" BETWEEN ${from} AND ${to} GROUP BY "urlId", hour ORDER BY hour ASC `;

  const visitCounts = visits.map((visit) => {
    return {
      time: visit.hour.toISOString(),
      count: Number(visit.count),
    };
  });
  return visitCounts;
}
