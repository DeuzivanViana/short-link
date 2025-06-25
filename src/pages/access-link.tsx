import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const AccessLink = () => {
  const { id } = useParams()
  const [link, setLink] = useState<any>()
  const navigate = useNavigate()
  const hasCalledApi = useRef(false)

  useEffect(() => {
    if (hasCalledApi.current || !id) return

    const fetchLink = async () => {
      try {
        hasCalledApi.current = true
        
        const res = await fetch(`http://192.168.1.107:3333/api/v1/link/${id}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        if (!res.ok) {
          throw new Error('Failed to fetch link')
        }
        
        const body = await res.json()

        window.location.replace(body.redirect)
      } catch (error) {
        console.error('Error fetching link:', error)
        hasCalledApi.current = false
      }
    }

    fetchLink()
  }, [])

  return (
    <></>
  )
}