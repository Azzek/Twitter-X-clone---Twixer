import Navbar from '@/components/Navbar'
import { useNavigate } from 'react-router-dom';
import SearchInput from '@/components/SearchUsersInput';
import React, { useEffect } from 'react'
import { useAuth } from '@/components/AuthProvider';
interface PagesLayoutProps {
  children: React.ReactNode;
}


const PagesLayout: React.FC<PagesLayoutProps> = ({ children }) => {  

  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  useEffect(() => {
    if(!isAuthenticated) {
      navigate('/login')
    }
  },[])

  return (
    <div className='w-screen h-screen max-h-screen flex max-w-full'>
        <Navbar/>
          {children}
        <div className='flex justify-start flex-col w-1/4'>
          <SearchInput/>
        </div>
    </div>

  )
}

export default PagesLayout