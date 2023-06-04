import React from 'react'
import {signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import styles from './Nav.module.css'



function Nav() {
  const {data:session} = useSession()
  return (
    <nav className={styles.nav}>
          <Link href="/">Home</Link>
          {!!session ? (
            <div className={styles.navList}> 
              <Link href="/url-redirect">New Redirect</Link>
              <Link href="/list">List</Link>
              <button className={[styles.button, styles.buttonSignOut].join(' ')} onClick={() => signOut()}>Sign out</button>
            </div>
          ) : (
            <>
              <button className={[styles.button, styles.buttonSignIn].join(' ')} onClick={() => signIn()}>Sign in</button>
            </>
          )}
        </nav>
  )
}

export default Nav