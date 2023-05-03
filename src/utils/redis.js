import { Redis } from "ioredis";

const client = new Redis(process.env.redis_url)


export async function set(key, value){
   return await client.set(key, value)
}

export async function get(key){
    return await client.get(key)
}