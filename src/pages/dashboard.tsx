import { useEffect, useState } from "react"
import { NavigationBar } from "../components/NavigationBar"
import { Edit, Hammer, User } from "lucide-react"



export const Dashboard = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    (async () => {
      const res = await fetch('http://192.168.1.107:3333/api/v1/user/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const data = await res.json()

      setUsers(data)
    })()
  }, [])
  return <div>
    <NavigationBar/>
    
    <ul>
      {
        users?.map((user: any, index) => {
          return <li key={index} className='text-neutral-50 bg-neutral-800 p-4 flex flex-col gap-4'>
            <div className='flex justify-between'>
              <h1 className='flex gap-2 items-center'>
                <User size={20}/>
                <span>
                  { user.name }
                </span>
              </h1>
              <footer className='text-neutral-500'>{ user.id }</footer>
            </div>
            <div className='flex gap-2 justify-end'>
              <button className='cursor-pointer flex gap-2 text-blue-500 bg-blue-800 border border-blue-500 rounded-lg items-center p-2 max-w-[100px] justify-center text-sm'>
                <Edit size={20}/>
                <span>Edit</span>
              </button>
              <button className='cursor-pointer flex gap-2 text-red-500 bg-red-800 border border-red-500 rounded-lg items-center p-2 max-w-[100px] justify-center text-sm'>
                <Hammer size={20}/>
                <span>Ban</span>
              </button>
            </div>
          </li>
        })
      }
    </ul>

  </div>
}