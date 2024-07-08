import React, { useState } from 'react'
import PagesLayout from './PagesLayout'
import api from '@/api'
import { Link, useParams } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RxAvatar } from "react-icons/rx";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { format } from 'date-fns';
import { da, enUS } from 'date-fns/locale';
import Post from '@/components/Post';
import { useAuth } from '@/components/AuthProvider';

interface UserDataTypes {
  username: string,
  email:string,
  id: number,
  avatar:string,
  baner:string,
  date_joined:string,
  followership:number[],
  followers:number[]
}

interface PostTypes {
  id: number;
  body: string;
  image: string;
  author: number;
  date:string
}

const ProfilePage = () => {
  const [posts, setPosts] = useState<PostTypes[]>()
  const [userData, setUserData] = React.useState<UserDataTypes>()
  const { username } = useParams()
  const { follow } = useAuth()

  React.useEffect(() => {
    getUserData().then(getUserPosts)
    
  },[])

  const getUserData = async () => {
    try {
      const res = await api.get(`/api/accounts/user-profile/${username}/`)

      const data = res.data
      console.log(data)
      setUserData(data)


    } catch(err) {
      console.log(err)
    }
  } 
  const getUserPosts = async () => {

    try {
      const res = await api.get(`/api/posts/posts/${username}/`)
      const data = res.data
      setPosts(data)

    } catch(err) {
      console.log(err)
    }
  }
  const date = userData?.date_joined ? new Date(userData?.date_joined) : null;

  const formattedDate = date ? format(date, 'MMMM yyyy', { locale: enUS }) : 'Invalid date';
  return (
    <PagesLayout>
      <div className='h-screen w-1/2 ml-[25%] thin-border'>
        <div className='w-full h-8 flex justify-start items-center pt-4 mb-5 '>
          <Link to='/'>
            <IoMdArrowRoundBack className='h-12 w-12 opacity-85 mr-10'/>
          </Link>
          <h1 className='text-xl font-bold'>{userData?.username}</h1>
        </div>
        <div className='w-full relative'>
          { userData?.baner? (
            <img src={userData?.baner} alt="Profile baner" className='w-full h-10 '/>
          ) 
          :
          <div className='w-full bg-gray-500 min-h-56 rounded-xl '>

          </div>
          }
          <div className='w-full flex justify-between min-h-11'>
          <div className='absolute top-1/2 transform -translate-y-[70px] -translate-x-[-30px]'>
            <Avatar className='h-44 w-44 border-4 border-black rounded-full'>
              <AvatarImage src={userData?.avatar} />
              <AvatarFallback><RxAvatar /></AvatarFallback>
            </Avatar>
          </div>
          <div></div>
            <div className='w-1/3 text-center'>
            {username == userData?.username? 
              <Button className='text-lg font-bold mt-5 bg rounded-2xl bg-gray-200 text-black' >Follow</Button>
              : 
              <Button className='text-lg font-bold mt-5 bg rounded-2xl' variant='outline' >Set up profile</Button>
            }
              
            </div>
          </div>
          { userData?
            <div className='pl-7'>
            <h1 className='font-extrabold text-2xl pt-9 ml-1 mb-2'>{ userData?.username }</h1>
            <p className='flex'><MdOutlineCalendarMonth className='h-5 w-5' /> Joined { formattedDate }</p>
            <div > 
              <span className='mr-4 font-bold'>{userData?.followers? userData.followers.length : "0"} Followers </span>
              <span className='font-bold'>{userData?.followership? userData?.followership.length : "0"} Following</span>
            </div>
          </div>
          :
          <h1>{username}</h1>
          }
        </div>
        <div>
        { posts? (posts.map(post => (
            <Post
              id={post.id}
              key={post.id}
              body={post.body}
              image={post.image} 
              authorId={post.author}
              date={post.date}
              remove={(id:number) => setPosts(posts.filter((p) => p.id != id))}
            />
          )))
          :
          <></>}
        </div>
      </div>

    </PagesLayout>
  )
}

export default ProfilePage