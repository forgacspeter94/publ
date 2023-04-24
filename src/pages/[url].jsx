import React from 'react'
// import fs from 'fs'
import {get} from '../utils/redis'
import { PrismaClient } from '@prisma/client'

function Url() {
  return (
   <div>Url</div>
  )
}

export default Url
export async function getServerSideProps(context){
    /* const file = fs.readFileSync('./redirect.json')
    const data = JSON.parse(file) */
    // console.log(data)
    console.log(context.query)
    const url = context.query.url
    // const redirect = data.find((redirect) => {return redirect.redirect === url})
    const redirect = await get(url)
    console.log(redirect)
    const prisma = new PrismaClient()
    const saveRedirect= await prisma.urlRedirects.findUnique({
            where:{redirect:url}
    })
    console.log(saveRedirect)
    if (redirect&&saveRedirect){
        // return {redirect:{destination:redirect.url, permanent:false}}
        await prisma.visit.create({data:{urlId:saveRedirect.id}})
        return {redirect:{destination:redirect, permanent:false}}
    } else {
        return {notFound: true}
    }
}