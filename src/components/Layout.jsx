import React from 'react'
import Navbar from './Navbar'
import Menu from './Menu'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className='h-full w-full flex flex-col justify-between'>
        <Navbar/>
        <div className='flex-grow  flex gap-x-[20px] w-full'>
            <Menu className="w-[70%] bg-[yellow]"/>
            <Outlet/>
        </div>
        <Footer/>

    </div>
  )
}

export default Layout