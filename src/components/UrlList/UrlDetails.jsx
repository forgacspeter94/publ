import React from 'react'

function UrlDetails({url}) {
  return (
    <div>
        <p>{url.redirect}</p>
        <p>{url.url}</p>
        <p>{url.visitCount}</p>
    </div>
  )
}

export default UrlDetails