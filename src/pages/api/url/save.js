import fs from 'fs'
import { set } from '@/utils/redis'
import {PrismaClient} from '@prisma/client'

export default async function handler(req, res) {
  const body = JSON.parse(req.body)
  /* try {
    const file = fs.readFileSync('./redirect.json')
    const data = JSON.parse(file)
    fs.writeFileSync('./redirect.json', JSON.stringify([body, ...data]))
  } catch (error) {
    fs.writeFileSync('./redirect.json', JSON.stringify([body]))
  } finally {
    res.status(200).json({body})
  } */

  const prisma = new PrismaClient()
  await prisma.urlRedirects.create({
    data:{
      url:body.url,
      redirect:body.redirect
    }
  })

  await set(body.redirect, body.url)
  res.status(200).json({body})
  }



  