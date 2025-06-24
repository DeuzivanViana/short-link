import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../services/auth'
import { LinkCard } from '../components/LinkCard'

type Link = {
  redirect: String,
  clicks: Number,
  createdAt: String,
  id: String
}

export const Home = () => {
  const { isPending, data } = auth.useSession()
  const [ links, setLinks ] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if(!isPending && !data?.user) navigate('/sign-in')
  }, [isPending, data])
  
  useEffect(() => {
    (async () => {
      const res = await fetch('http://192.168.1.107:3333/api/v1/link', {
        method: 'GET',
        credentials: 'include'
      })

      setLinks(await res.json())
    })()
  }, [])

  return <div>
    { links.map((link: Link, index) => {
      return <LinkCard key={index} redirect={link.redirect} clicks={link.clicks} created_at={link.createdAt} id={link.id}/>
    }) }
    
  </div>
}