import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'
import { SignUp } from './pages/sign-up'
import { SignIn } from './pages/sign-in'
import { CreateLink } from './pages/create'
import { AccessLink } from './pages/access-link'
import { Dashboard } from './pages/dashboard'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/sign-up' element={ <SignUp/> }/>
        <Route path='/sign-in' element={ <SignIn/> }/>
        <Route path='/create' element={ <CreateLink/> }/>
        <Route path='/l/:id' element={ <AccessLink/> }/>
        <Route path='/dashboard' element={ <Dashboard/> }/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
