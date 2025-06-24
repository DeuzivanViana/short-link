type Props = {
  redirect: String,
  clicks: Number,
  created_at: String,
  id: String
}

export const LinkCard = (props : Props) => {
  return <div className='p-4 bg-neutral-800 text-neutral-50'>
    <h1>{ props.redirect }</h1>
    <footer className='flex justify-between text-neutral-400'>
      <span>{ props.clicks.toString() } clicks</span>
      <span>created at { props.created_at }</span>
    </footer>
  </div>
}