import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function PokemonPage({data}) {

// const [data, setData] = useState({id:'', name:'', weight:''})

 const router = useRouter()
 const {name} = router.query
/* useEffect(() => {
    if(!! name){
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => response.json().then((data) => {
        setData({id:data.id, name:data.name, weight:data.weight})
        console.log(data)}))}
}, [name]) */
 return ( <div>
    {router.query.name}
    <p>id:{data.id}</p>
    <p>name:{data.name}</p>
    <p>weight:{data.weight}</p>
  </div>
  )
}

export default PokemonPage
export async function getServerSideProps(context){
    console.log(context)
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${context.params.name}`)
    const data = await response.json()
    return({props:{data}})
}