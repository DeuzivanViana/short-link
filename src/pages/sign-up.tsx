import { Link, useNavigate } from 'react-router-dom'
import { validator } from '../models/validator'
import { auth } from '../services/auth'
import { useEffect } from 'react'

export const SignUp = () => {
  const { isPending, data } = auth.useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if(!isPending && data?.user) navigate('/')
  }, [isPending, data])

  const handleSignUp = (formData: FormData) => {
    (async () => {
      const data = validator.sign_in.parse({
        email: formData.get('email'),
        password: formData.get('password')
      })

      auth.signUp.email({
        ...data,
        name: 'Your name'
      })
    })()
  } 
  return <div>
    <form className='bg-neutral-900 text-neutral-50 p-6 rounded-lg m-auto w-[350px] flex flex-col gap-4 mt-[40%]' action={handleSignUp}>
      <input className='bg-neutral-800 p-4  outline-none rounded-lg' placeholder='Enter a email' type='email' name='email'/>
      <input className='bg-neutral-800 p-4  outline-none rounded-lg' placeholder='Type a password' type='password' name='password'/>
      <input className='bg-neutral-800 p-4  outline-none rounded-lg' placeholder='Confirm your password' type='password' name='password2'/>
      <button className='bg-blue-500 p-4 rounded-lg' type='submit'>Sign-Up</button>
      <Link className='text-blue-400 text-sm underline text-center' to={'/sign-in'}>Already have an account?</Link>
    </form>
  </div>
}