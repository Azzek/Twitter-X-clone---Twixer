import { CiSearch } from "react-icons/ci";
import React, { ChangeEvent, useState } from 'react'
import { Input } from "./ui/input";
import api from "@/api";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

interface UserDataTypes {
  username: string,
  email:string,
  user: number,
  avatar:string,
  baner:string,
  date_joined:string,
  followership:number[],
  followers:number[],
  description: string
}

const SearchInput = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<UserDataTypes[]>([]);
  const [inputFocus, setInputFocus] = useState<boolean>(false)

  const handleSearch = async () => {
      try {
          const response = await api.get(`/api/accounts/search/?search=${query}`);
          setResults(response.data);
          console.log(response.data)
      } catch (error) {
          console.error("There was an error fetching the search results!", error);
      }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value)
      handleSearch()
  };
  return (
    <div>
      <div className={`${inputFocus ? 'border-2 border-blue-500' : 'border-0'} flex px-6 bg-gray-900 rounded-2xl py-1 self-center mt-2`}>
        <CiSearch className={`${inputFocus ? 'text-blue-500' : 'border-0'} h-9 w-9 `} />
        <Input onFocus={() => setInputFocus(true)}  onBlur={() => setInputFocus(false)} onChange={handleChange} className="focus:outline-none border-transparent"/>
    </div>
      {
        query.length > 0?
        results.map((user) => (
          <Link to={`/${user.username}`} key={user.user}>
            <div className="flex items-start">
            <Avatar>
              <AvatarImage src={user.avatar} alt="user avatar" className="flex w-12 h-12 rounded-full bg-muted self-end mt-3"/>
              <AvatarFallback><FaUserCircle/></AvatarFallback>
            </Avatar>

              <div className="pt-1">
                <span className='ml-4 mt-1 text-lg font-bold'>{user.username}</span>
                <p className="ml-4 font-thin text-gray-400">{ user.description }</p>
              </div>
            </div>
          </Link>
        ))
        :
        null
      }
    </div>
    
  )
}

export default SearchInput