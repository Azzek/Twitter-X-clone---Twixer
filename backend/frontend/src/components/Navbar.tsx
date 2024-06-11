import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Drawer,
  DrawerContent,

  DrawerTrigger,
} from "@/components/ui/drawer"
import { Link } from 'react-router-dom'
import { Button } from './ui/button';
import { FaUser } from "react-icons/fa"
import { BiSolidLogInCircle } from "react-icons/bi";
import { MdOutlinePostAdd } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from './Logo';


const Navbar = () => {

  useEffect(() => {
    getSession(),
    []
  })
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const getSession = () => {
    fetch('/api/session/', {
      credentials:'same-origin'
    })
    .then((res) => res.json())
    .then((data) => { 
      console.log(data)
      if (data.is_authenticated) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }})
      .catch((err:Error) => {
        console.log(err)
      })
  }

  function logout() {
    fetch("/api/logout/", { 
      credentials:"same-origin"
    })
    .then((res) => {
      console.log(res.json())
      console.log("xd")
      setIsAuthenticated(false)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return isMobile? 
  
      <NavigationMenu className="w-full px-2" orientation="horizontal">
      <div className="w-screen">
        <NavigationMenuList className="mt-1 flex w-full justify-between bg-slate-900 p-2 rounded-md">
          <NavigationMenuItem>
           <Logo/>
          </NavigationMenuItem>
          <NavigationMenuList>
            <NavigationMenuItem>
                <Drawer direction='top'> 
                  <DrawerTrigger><RxHamburgerMenu className='text-white w-7 h-7'/></DrawerTrigger>
                  <DrawerContent className='flex justify-center px-6 bg-slate-900 items-center mt-5'>
                        
                      <Logo/>

                      <Link to="/login">
                        <NavigationMenuItem>
                          <Button size="lg" className="hover:bg-slate-100 hover:text-black transition-1s w-full">
                            <BiSolidLogInCircle className="mr-2 h-7 w-7 "/>
                              Login
                          </Button>
                        </NavigationMenuItem>
                      </Link>

                      <Link to="/register">
                        <NavigationMenuItem>
                          <Button size="lg" className="hover:bg-slate-100 hover:text-black transition-1s w-full">
                            <FaUser className="mr-2 h-5 w-5 "/>
                              Register
                          </Button>
                        </NavigationMenuItem>
                      </Link>

                      <Link to="/new-post">
                        <NavigationMenuItem>
                          <Button size="lg" className="hover:bg-slate-100 hover:text-black transition-1s w-full ">
                            <MdOutlinePostAdd  className="mr-2 h-7 w-7 "/>
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

  
  :

    <NavigationMenu className="w-full px-2" orientation="horizontal">
      <div className="w-screen">
      <NavigationMenuList className="mt-1 flex w-full justify-between bg-slate-900 p-2 rounded-md">
        <NavigationMenuItem>
          <Logo/>
        </NavigationMenuItem>
        <NavigationMenuList>
          {
            isAuthenticated?
            <NavigationMenuItem className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <Button onClick={logout} className="hover:bg-slate-100 hover:text-black transition-1s"><FaUser className="mr-2 h-5 w-5 "/>Logout</Button>
            </NavigationMenuItem>

            :

            <>
              <Link to='/login'>
                <NavigationMenuItem className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                  <Button className="hover:bg-slate-100 hover:text-black transition-1s"><BiSolidLogInCircle className="mr-2 h-7 w-7 "/>Login</Button>
                </NavigationMenuItem>
              </Link>
              <Link to="/register">
                <NavigationMenuItem className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                  <Button className="hover:bg-slate-100 hover:text-black transition-1s"><FaUser className="mr-2 h-5 w-5 "/>Register</Button>
                </NavigationMenuItem>
              </Link>
            </>
          }
            
            <Link to="new-post">
              <NavigationMenuItem className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                <Button className="hover:bg-slate-100 hover:text-black transition-1s"><MdOutlinePostAdd  className="mr-2 h-7 w-7 "/>Add post</Button>
              </NavigationMenuItem>
            </Link>
          </NavigationMenuList>
          
        </NavigationMenuList>
        </div>
    </NavigationMenu>
}

export default Navbar