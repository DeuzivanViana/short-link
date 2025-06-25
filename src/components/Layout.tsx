import React from 'react'
import { NavigationBar } from './NavigationBar'

type Props = {
  children: React.ReactNode
}

export const Layout = (props: Props) => {
  return <>
    <NavigationBar/>
    <div>
      { props.children }
    </div>
  </>
}