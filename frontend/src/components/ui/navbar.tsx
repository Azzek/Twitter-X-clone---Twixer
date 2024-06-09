import { useMediaQuery } from 'react-responsive';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { FaUser } from "react-icons/fa"
import { BiSolidLogInCircle } from "react-icons/bi";
import { MdOutlinePostAdd } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from './Logo';

const Navbar = () => {
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

                      <NavigationMenuItem className="">
                        <Button size="lg" className="hover:bg-slate-100 hover:text-black transition-1s w-full">
                          <BiSolidLogInCircle className="mr-2 h-7 w-7 "/>Login</Button>
                      </NavigationMenuItem>

                      <NavigationMenuItem className="">
                        <Button size="lg" className="hover:bg-slate-100 hover:text-black transition-1s w-full">
                          <FaUser className="mr-2 h-5 w-5 "/>Register</Button>
                      </NavigationMenuItem>

                      <NavigationMenuItem className="">
                        <Button size="lg" className="hover:bg-slate-100 hover:text-black transition-1s w-full ">
                          <MdOutlinePostAdd  className="mr-2 h-7 w-7 "/>Add post</Button>
                      </NavigationMenuItem>

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
          <NavigationMenuItem>
            <NavigationMenuTrigger>Trigger</NavigationMenuTrigger>
            <NavigationMenuContent className="w-full">
              <ul className="flex gap-3 flex-col w-[92px]">
                <li className="flex h-full w-full select-none flex-col justify-end rounded-md hover:bg-gradient-to-b from-muted/50 to-muted no-underline outline-none focus:shadow-md">
                  <NavigationMenuLink>XD</NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <Button className="hover:bg-slate-100 hover:text-black transition-1s"><BiSolidLogInCircle className="mr-2 h-7 w-7 "/>Login</Button>
            </NavigationMenuItem>
            <NavigationMenuItem className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <Button className="hover:bg-slate-100 hover:text-black transition-1s"><FaUser className="mr-2 h-5 w-5 "/>Register</Button>
            </NavigationMenuItem>
            <NavigationMenuItem className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <Button className="hover:bg-slate-100 hover:text-black transition-1s"><MdOutlinePostAdd  className="mr-2 h-7 w-7 "/>Add post</Button>
            </NavigationMenuItem>
          </NavigationMenuList>
          
        </NavigationMenuList>
        </div>
    </NavigationMenu>
}

export default Navbar