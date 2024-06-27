import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { Link } from "react-router-dom"

interface Product {
    id:number,
    name:string,
    imageURL:string,
    price:string,
    location:string,
    category:string
}
const Productcard = (props:Product) => {
  return (
    <Link to={`/post/${props.id}/`}> 
        <Card className="m-0 rounded-3xl hover:scale-105 transition-transform duration-300">
            <CardHeader className="p-0 ">
                <img className="w-full cursor-pointer h-[200px] rounded-lg bg-cover bg-no-repeat size-fit p-0" src={props.imageURL} alt={props.name} />
                <div className="pl-2">
                    <span className=" text-gray-700 text-left font-medium">
                        {props.name}
                    </span>
                    <span className="font-light">
                        {props.price}
                    </span>
                </div>
                
            </CardHeader>

            <CardFooter className="p-0  ">
                
            <CardDescription className="p-0 w-full flex justify-between">
                <span className="pl-2">
                    {props.location}
                </span>
                <span className="pr-4 font-bold text-base">
                    {props.category}
                </span>
            </CardDescription>
            
            </CardFooter>
        </Card>
    </Link>
    
  )
}

export default Productcard