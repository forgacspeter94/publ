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
