import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"

interface Product {
    name:string,
    imageURL:string,
    price:string,
    location:string
}
const Productcard = (props:Product) => {
  return (
    <Card className="col-span-1 p-0">
        <CardHeader className="p-0 ">
            <img className="w-full cursor-pointer h-[200px] rounded-lg mb-3 bg-cover bg-no-repeat size-fit p-0" src={props.imageURL} alt={props.name} />
            <div className="pl-7">
                <p className=" font-bold text-gray-700">
                    {props.name}
                </p>
                <p className="font-light">
                    {props.price}
                </p>
            </div>
            
        </CardHeader>

        <CardFooter className="p-0">
            
        <CardDescription className="p-0">
            <p className="pl-7">
                {props.location}
            </p>
        </CardDescription>
        
        </CardFooter>
    </Card>
  )
}

export default Productcard