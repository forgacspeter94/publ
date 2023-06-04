import React, {useState} from "react";
import List from "./List";
import UrlDetails from "./UrlDetails";



function UrlList({urls}) {
    const [selected, setSelected] = useState(null)
    return (
      <div>
        <List urls={urls} onClick={setSelected}/>
       {selected ? 
       <UrlDetails url={urls.find((url) => url.redirect === selected)}/> : null}
      </div>
    )
}

export default UrlList
