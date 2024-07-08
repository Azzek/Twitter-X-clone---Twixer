import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUserCircle } from "react-icons/fa";
import api from "@/api";
import { useContext, useEffect, useState } from "react";
import { formatDistanceToNow } from 'date-fns';
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineUserAdd } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";
import { useAuth } from "./AuthProvider";


interface PostPropsTypes {
  id: number;
  body: string;
  image: string;
  authorId: number;
  date:string,
  remove: (id:number) => void;
}

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

const Post = (props: PostPropsTypes) => {

  const { userData, deletePost, follow } = useAuth()

  const [authorData, setAuthorData] = useState<UserDataTypes | null>(null);

  const formattedDate = formatDistanceToNow (new Date(props.date), { addSuffix: true })

  

  useEffect(() => {
      getUserData();
  }, [props.authorId]);

  const getUserData = async () => {
    
    try {
      const res = await api.get(`/api/accounts/id/${props.authorId}`);
      setAuthorData(res.data);
    } catch (err) {
      console.error(err);
    }
    
  };

  return (
      
          <Card className="m-0 rounded-none w-full bg-black flex thin-border pb-2 border-t-0">
                  <div className="h-full mr-2">
                    <Link className="h-full" to={`/${authorData?.username}/`}>
                        <Avatar className="w-12 h-12 ml-2 mt-2">
                            <AvatarImage src={authorData?.avatar || ''} />
                            <AvatarFallback>
                                <FaUserCircle />
                            </AvatarFallback>
                        </Avatar>
                    </Link>
                  </div>
                  
                  <div className="w-full mt-1 relative">
                    <span className="text-white ml-2 font-semibold text-lg self-start m-0">{authorData?.username}</span>
                    <span className="text-gray-100 opacity-70 pl-3 font-semibold text-sm m-0">{formattedDate}</span>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="border-0">
                        <Button variant="outline" className="text-white absolute top-[10px] right-[10px] rounded-full hover:bg-gray-800 p-2">                      
                          <BsThreeDots/>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 bg-black text-white">
                        <DropdownMenuGroup>
                          { userData?.user != props.authorId && 
                          <DropdownMenuItem onClick={() => follow(props.authorId)}>
                            <HiOutlineUserAdd className="w-6 h-6"/> <span className="font-bold ml-2">Follow</span>
                          </DropdownMenuItem>
                          }
                          <DropdownMenuItem>
                            Block {authorData?.username}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Report Post
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Save post
                          </DropdownMenuItem>
                          { 
                          userData?.user == props.authorId &&
                          <DropdownMenuItem 
                          onClick={() => {deletePost(props.id); props.remove(props.id)}}
                          >
                            Delete post
                          </DropdownMenuItem>}
                        </DropdownMenuGroup>
                       
                      </DropdownMenuContent>
                    </DropdownMenu> 
                    
                    <CardDescription className="w-8/12 self-end ml-2 mt-1 text-gray-400 font-semibold">{props.body}</CardDescription> 
                    <div className="w-full flex justify-center">
                    {props.image && (
                    <img className="w-full h-4/6 rounded-xl self-center mt-3 mb-2 mr-2" src={props.image} alt="Post image"/>
                    )}     
                  </div>
                  </div>     
          </Card>
      
  );
};

export default Post;
