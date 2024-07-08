import { useContext, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BsThreeDots } from "react-icons/bs";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { GrHomeRounded } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { BiSolidLogInCircle } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlinePostAdd } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoBookmarksOutline } from "react-icons/io5";
import Logo from './Logo';

import { useAuth } from './AuthProvider';

import PostInput from './PostInput';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const Navbar = () => {
  const {isAuthenticated, userData, logout} = useAuth()
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

 

  return isMobile ? (
    <NavigationMenu className="w-full px-2" orientation="horizontal">
      <div className="w-screen">
        <NavigationMenuList className="mt-1 flex w-full justify-between bg-slate-900 p-2 rounded-md">
          <NavigationMenuItem>
            <Logo />
          </NavigationMenuItem>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Drawer direction="top">
                <DrawerTrigger>
                  <RxHamburgerMenu className="text-white w-7 h-7" />
                </DrawerTrigger>
                <DrawerContent className="flex justify-center px-6 bg-slate-900 items-center mt-5">
                  <Logo />
                  {isAuthenticated ? (
                    <>
                      <Button size="lg" className="hover:bg-slate-100 hover:text-black transition-1s w-full" onClick={logout}>
                        <BiSolidLogInCircle className="mr-2 h-7 w-7" />
                        Logout
                      </Button>
                      {userData && (
                        <div className="mt-4 text-white">
                          <p>{userData.username}</p>
                          <p>{userData.email}</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <NavigationMenuItem>
                          <Button size="lg" className="hover:bg-slate-100 hover:text-black transition-1s w-full">
                            <BiSolidLogInCircle className="mr-2 h-7 w-7" />
                            Login
                          </Button>
                        </NavigationMenuItem>
                      </Link>
                      <Link to="/register">
                        <NavigationMenuItem>
                          <Button size="lg" className="hover:bg-slate-100 hover:text-black transition-1s w-full">
                            <FaUser className="mr-2 h-5 w-5" />
                            Register
                          </Button>
                        </NavigationMenuItem>
                      </Link>
                    </>
                  )}
                  <Link to="/new-post">
                    <NavigationMenuItem>
                      <Button size="lg" className="hover:bg-slate-100 hover:text-black transition-1s w-full">
                        <MdOutlinePostAdd className="mr-2 h-7 w-7" />
                        Add post
                      </Button>
                    </NavigationMenuItem>
                  </Link>
                </DrawerContent>
              </Drawer>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  ) : (
    <div className="h-screen w-1/4 bg-black flex flex-col items-center gap-3 pt-3 max-h-screen fixed top-0 left-0">
      <Logo/>
      <div className="w-3/4 h-full self-end flex flex-col items-start gap-3 mt-3 ">
      <Link to={`/`} className='w-full'>
          <NavigationMenuItem className="w-full flex flex-1 items-center justify-between space-x-2">
            <Button className="w-2/3 border-gray-700  bg-black text-2xl flex justify-start">
              <GrHomeRounded className="mr-1 h-8 w-8 " />
              <span className="ml-4 p-0 font-normal">Home</span>
            </Button>
          </NavigationMenuItem>
        </Link>
        <Link to={`/${userData?.username}`} className='w-full'>
          <NavigationMenuItem className="w-full flex flex-1 items-center justify-between space-x-2">
            <Button className="w-2/3 border-gray-700  bg-black text-2xl flex justify-start">
              <FaRegUser className="mr-1 h-8 w-8 " />
              <span className="ml-4 p-0 font-normal">Profile</span>
            </Button>
          </NavigationMenuItem>
        </Link>
        <Link to="/bookmarks"> 
          <NavigationMenuItem className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <Button className="hover:bg-gray-700 bg-black text-2xl flex justify-between relative">
              <IoBookmarksOutline className="h-8 w-8 self-end transform -translate-y-[-5px]"/>
              <span className="ml-4 p-0 font-normal">Bookmarks</span>
            </Button>
          </NavigationMenuItem>
        </Link>
        
      </div>
      
      <Dialog>
        <DialogTrigger className='bg-blue-400 px-12 py-3 rounded-3xl'>Post</DialogTrigger>
        <DialogContent>
          <PostInput/>
        </DialogContent>
      </Dialog>
      <div className="flex justify-center w-full">
          <Avatar className='h-14 w-14 self-end m-3'>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>
              <FaUser />
            </AvatarFallback>
          </Avatar>
          {userData && (
            <div className="text-white mt-2 px-2 self-start ">
              <div className='flex justify-between '>
              <p className='font-semibold self-end'>{userData.username}</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className='bg-transparent '><BsThreeDots /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup>
                    <DropdownMenuRadioItem value="top" onClick={logout}>Log out</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="bottom">Author</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              </div>
              
              <p className=''>{"@" + userData.email}</p>
            </div>
          )}
        </div>
    </div>
  );
};

export default Navbar;
