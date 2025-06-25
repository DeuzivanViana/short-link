import { Link, Trash } from 'lucide-react'

type Props = {
  redirect: String,
  clicks: Number,
  created_at: String,
  id: String,
  onClick: any
}
export const LinkCard = (props : Props) => {
  const date = new Date(props.created_at.toString())


  return <div className='p-6 bg-neutral-800 text-neutral-50 flex flex-col gap-4 rounded-xl'>
    <div className='flex gap-2 items-center'>
      <Link size={20} className='text-blue-400'/>
      <h1 className='whitespace-nowrap overflow-hidden text-ellipsis max-w-[80%] text-sm'>{ props.redirect }</h1>
    </div>
    <footer className='text-xs'>http://192.168.1.107:3000/l/{ props.id }</footer>

    <footer className='flex justify-between text-neutral-400'>
      <span className='text-sm'>{ props.clicks.toString() } clicks</span>
      <span className='text-sm'>{ date.toDateString() }</span>
    </footer>

    <button onClick={props.onClick} className='flex gap-2 text-red-500 bg-red-800 border border-red-500 rounded-lg items-center p-2 max-w-[100px] justify-center text-sm'>
      <Trash size={20}/>
      <span>Delete</span>
    </button>
  </div>
}