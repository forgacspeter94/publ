import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import {PrismaClient} from '@prisma/client'

const inter = Inter({ subsets: ['latin'] })

export default function Home(props) {
  return (
    <>
     <main>
    <Link href={'/url-redirect'}>Create new</Link>
    <ul>
      {props.Urls.map((url) => {
        return (
          <li key={url.id}>
            {/* {url.url} */}
            <Link href={`/${url.redirect}`}>
            {url.redirect}
            {url._count.visits}
            </Link>
          </li>
        )
      } )}
    </ul>
    </main>
    </>
  )
}

export async function getServerSideProps () {
  const prisma = new PrismaClient()
  const Urls = await prisma.urlRedirects.findMany({
    select:{
      id:true,
      url:true, 
      redirect:true,
      _count:{
        select:{
          visits:true
        }
      }
    }
  })
  return {
    props:{Urls}
  }
}
