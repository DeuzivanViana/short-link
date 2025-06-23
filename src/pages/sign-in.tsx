import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../services/auth'
import { validator } from '../models/validator'
import { useEffect } from 'react'

export const SignIn = () => {
  const { isPending, data } = auth.useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if(!isPending && data?.user) navigate('/')
  }, [isPending, data])

  const handleSignIn = (formData: FormData) => {
    (async () => {
      const data = validator.sign_in_form.parse({
        email: formData.get('email'),
        password: formData.get('password')
      })

      auth.signIn.email(data)
    })()
  } 

  return <div>
    <form action={handleSignIn} className='bg-neutral-900 text-neutral-50 p-6 rounded-lg m-auto w-[350px] flex flex-col gap-4 mt-[40%]'>
      <input className='bg-neutral-800 p-4  outline-none rounded-lg' placeholder='Enter your email' type='email' name='email'/>
      <input className='bg-neutral-800 p-4  outline-none rounded-lg' placeholder='Type your password' type='password' name='password'/>
      <button className='bg-blue-500 p-4 rounded-lg' type='submit'>Sign-In</button>
      <Link className='text-blue-400 text-sm underline text-center' to={'/sign-up'}>Don't have an account?</Link>
    </form>
  </div>
}