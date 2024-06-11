import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaRegUser } from "react-icons/fa";

interface option {
    imgURL:string
    name: string
}

const CategoryOption = (props:option) => {
  return (
    <div className="flex flex-col justify-center items-center cursor-pointer">
        <Avatar className="w-12 h-12">
            <AvatarImage className="bg-cover" src={props.imgURL} alt={props.name}/>
            <AvatarFallback>
                <FaRegUser />
            </AvatarFallback>
        </Avatar>
        <span className="mt-3 font-bold ">{props.name}</span>
    </div>
    
  )
}

export default CategoryOption