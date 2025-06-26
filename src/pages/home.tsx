import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../services/auth'
import { LinkCard } from '../components/LinkCard'
import { Layout } from '../components/Layout'

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

  const handleDelete = async (id: String) => {
    const res = await fetch(`http://192.168.1.107:3333/api/v1/link/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    if(!res.ok) {
      alert('Error on delete link')
    }

    window.location.reload()
  }

  useEffect(() => {
    if(!isPending && !data?.user) navigate('/sign-in')
  }, [isPending, data])
  
  useEffect(() => {
    (async () => {
      const res = await fetch('http://192.168.1.107:3333/api/v1/link', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-cache'
      })

      setLinks(await res.json())
    })()
  }, [])

  return <Layout>
    <div className='p-4 flex flex-col gap-2 max-w-[500px] m-auto'>
    <Link to={'/create'} className='bg-blue-500 p-4 w-full block text-center rounded-xl text-blue-50'>Create Link</Link>
      { links.map((link: Link, index) => {
        return <LinkCard onClick={() => handleDelete(link.id)} key={index} redirect={link.redirect} clicks={link.clicks} created_at={link.createdAt} id={link.id}/>
      }) }
    </div>
  </Layout>
}