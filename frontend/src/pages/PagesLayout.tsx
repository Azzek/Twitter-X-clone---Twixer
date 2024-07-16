import Navbar from '@/components/Navbar'
import { useNavigate } from 'react-router-dom';
import SearchInput from '@/components/SearchUsersInput';
import React, { useEffect } from 'react'
import { useAuth } from '@/components/AuthProvider';
import Trends from '@/components/Trends';
interface PagesLayoutProps {
  children: React.ReactNode;
}


const PagesLayout: React.FC<PagesLayoutProps> = ({ children }) => {  
  const { isAuthenticated } = useAuth()
  useEffect(()=> {
    
    console.log(isAuthenticated)
  },[])
  return (
    <div className='w-screen h-screen max-h-screen flex max-w-screen'>
        <Navbar/>
          {children}
        <div className='flex justify-start flex-col items-center w-1/4'>
          <SearchInput/>
          <Trends/>
        </div>
    </div>

  )
}

export default PagesLayout