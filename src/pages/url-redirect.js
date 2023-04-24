import React, { useState } from 'react'

function urlredirect() {
  
  const [url, setUrl] = useState('')
  const [redirect, setRedirect] = useState('')
  const [showUrl, setShowUrl] = useState(false)
  
  return (
    <form>
      <div> 
        <input id='url-input' onChange={(event) => {setUrl(event.target.value)}}/>
        <label htmlFor='url-input'>url</label>
      </div>
      <div> 
        <input id='redirect-input' onChange={(event) => {setRedirect(event.target.value)}}/>
        <label htmlFor='redirect-input'>redirect</label>
      </div>
      <button onClick={(event) => {
        event.preventDefault()
        setShowUrl(true)
        fetch('api/url/save', {
          method: 'POST',
          body: JSON.stringify({url, redirect})})
          .then(response => (response.json()))
          .then((data) => console.log(data))
        }}>Save</button>
     {showUrl ? <div>
      {url}
    </div> : null}
    </form>
  )
}

export default urlredirect