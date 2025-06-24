import { validator } from '../models/validator'

export const SendLink = () => {
  const handleSubmit = (formData: FormData) => {
    (async () => {
      const date = validator.link.parse({
        redirect: formData.get('redirect')
      })
      const res = await fetch('http://192.168.1.107:3333/api/v1/link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(date),
        credentials: 'include'
      })
    })()
  }

  return <div>
    <form action={handleSubmit} className='bg-neutral-900 text-neutral-50 p-6 rounded-lg m-auto w-[350px] flex flex-col gap-4 mt-[40%]'>
      <input className='bg-neutral-800 p-4  outline-none rounded-lg' placeholder='Enter your link' type='url' name='redirect'/>
      <button className='bg-blue-500 p-4 rounded-lg' type='submit'>Create Link</button>
    </form>
  </div>
}