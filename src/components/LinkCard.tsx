import { Link, Trash } from 'lucide-react'
import { useState } from 'react';

type Props = {
  redirect: String,
  clicks: Number,
  created_at: String,
  id: String
}

export const LinkCard = (props : Props) => {
  return <div className='p-4 bg-neutral-800 text-neutral-50 flex flex-col gap-4 rounded-xl'>
    <div className='flex gap-2 items-center'>
      <Link size={20} className='text-blue-400'/>
      <h1 className='whitespace-nowrap overflow-hidden text-ellipsis max-w-[80%] text-sm'>{ props.redirect }</h1>
    </div>

    <footer className='flex justify-between text-neutral-400'>
      <span className='text-sm'>{ props.clicks.toString() } clicks</span>
      <span className='text-sm'>created at { props.created_at }</span>
    </footer>

    <button className='flex gap-2 text-red-500 bg-red-800 border border-red-500 rounded-lg items-center p-2 max-w-[100px] justify-center text-sm'>
      <Trash size={20}/>
      <span>Delete</span>
    </button>
  </div>
}