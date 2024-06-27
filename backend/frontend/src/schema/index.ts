 
import * as z from "zod"


const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );

export const registerSchema = z.object({
    email: z.string().email({
        message:"Please enter a valid email"
    }),
    username: z.string().min(4, {
        message:"Username must have at least 4 characters"
    }).max(20, {
        message:"Username can have maximum 20 characters"
    }),
    password: z.string().min(6, {
        message:"Password must have at least 6 characters"
    }),
    confirmPassword: z.string().min(6, {
        message:"Password must have at least 6 characters"
    })
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const loginSchema =  z.object({
    username: z.string().min(4, {
        message:"Username must have at least 4 characters"
    }).max(20, {
        message:"Username can have maximum 20 characters"
    }),
    password: z.string().min(6, {
        message:"Password must have at least 6 characters"
    })
})

export const postSchema = z.object({
    title: z.string().min(14,{
        message:"Title must have at least 14 characters"
    }).max(50, {
        message:"Title can have maximum 50 characters"
    }),
    category: z.string().min(4),
    description: z.string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must not be longer than 30 characters.",
    }),
    town: z.string().min(3,{
        message:"Too short town name"
    }).max(20,{
        message:"Too long town name"
    }),
    telNumber: z.string().regex(phoneRegex, 'invalid Number!'),
    email: z.string().email({
        message:"please provide valid email"
    }),
    price: z.string().max(10000, {
        message:"max price is 10000"
    })

})