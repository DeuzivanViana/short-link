import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../services/auth'

export const Home = () => {
  const { isPending, data } = auth.useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if(!isPending && !data?.user) navigate('/sign-in')
  }, [isPending, data])
  
  return <div>
    <h1>Hello, World!</h1>
  </div>
}