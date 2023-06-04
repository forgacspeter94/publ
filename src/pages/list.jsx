import { getServerSession } from 'next-auth'
import React, { useState } from 'react'
import { authOptions } from './api/auth/[...nextauth]'
import {listUserUrls, getUrlDetails} from '@/utils/urls'
import SuperJSON from 'superjson'
import UrlList from '@/components/UrlList/UrlList'


function List(props) {
    console.log(SuperJSON.parse(props.urls))
    const urls = SuperJSON.parse(props.urls)
    return (
      <>
      <h1>UrlList</h1>
      <UrlList urls={urls}></UrlList>
      </>
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
    const urlsWithDetails = []
    for(const url of urls){
      const detail = await getUrlDetails(url.id)
      urlsWithDetails.push(detail)
    }
    /* urls.map( async (url) => {
                const detail = await getUrlDetails(url.id)
                return detail
              }) */
              console.log(urlsWithDetails)
    return{props:{urls:SuperJSON.stringify(urlsWithDetails)}}
}
export default List