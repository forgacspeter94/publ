import React from 'react'

function List({urls, onClick}) {
  return (
    <ul>
          {urls.map((url) => {return  <li key={url.redirect} onClick={() => {onClick(url.redirect)}}>{url.url}</li>})}
    </ul>
  )
}

export default List