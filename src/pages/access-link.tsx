import { error } from 'better-auth/api'
import { useEffect, useState } from 'react'
import { redirect, useNavigate, useParams } from 'react-router-dom'

export const AccessLink = () => {
  const { id } = useParams()
  const [ link, setLink ] = useState<any>()
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const res = await fetch('http://192.168.1.107:3333/api/v1/link/' + id, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const body = await res.json()

      setLink(body)
    })()
  }, [])

  useEffect(() => {
    if(link) {
      window.location.replace(link.redirect)
    }
  }, [link])

  return <div>
    { link ? <></> : <h1>Redirecting...</h1>}
  </div>
}