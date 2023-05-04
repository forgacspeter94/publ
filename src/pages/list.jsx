import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from './api/auth/[...nextauth]'
import {listUserUrls, getUrlDetails} from '@/utils/urls'
import SuperJSON from 'superjson'


function List(props) {
    console.log(props)
  return (
    <div>list</div>
  )
}

export async function getServerSideProps(context){
    const request = context.req
    const response = context.res
    const session =  await getServerSession(request, response, authOptions)
    if (!session){
        console.log("Not logged in")
        return {redirect:{destination:"/", permanent:false}}
    }
    const userEmail = session.user.email
    const urls = await listUserUrls(userEmail, 0)
    if (urls.length === 0){return {props:{urls:[]}}}
    const urlsWithDetails = urls.map( async (url) => {
                const detail = await getUrlDetails(url.id)
                console.log(detail)
                return detail
    })
    return{props:{urls:SuperJSON.stringify(urlsWithDetails)}}
}
export default List