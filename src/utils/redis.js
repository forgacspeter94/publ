import { Redis } from "ioredis";

const client = new Redis(process.env.redis_url);

export async function set(key, value) {
  const result = await client.set(key, value);
  if (result !== "OK") {
    return null;
  }
  const expire = await client.expire(key, 60 * 60 * 24);
  if (expire !== 1) {
    return null;
  }
  return true;
}

export async function get(key) {
  const result = await client.get(key);
  if (!result) {
    return null;
  }
  await client.expire(key, 60 * 60 * 24);
  return result;
}

export async function ttl(key) {
  const result = await client.ttl(key);
  return result;
}
