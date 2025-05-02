"use client"
import React, { useState } from "react"
import {useForm} from "react-hook-form"
import { useSignUp } from "@clerk/nextjs"
import {z} from "zod"
//zod custom schema
import { signupSchema } from "@/schemas/signupSchema"
import { zodResolver } from "@hookform/resolvers/zod"


export default function SignupForm() {
    const [verifying,setVerifying] = useState(false)
    const { signUp,isLoaded,setActive} = useSignUp()
    const{
        register,
        handleSubmit,
        formState:{errors}
    } =useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues:{
            email:"",
            password:"",
            passwordConfirmation:""
        },

    });
        
    
    const onSubmit= async() => {}
    const handleVerifcationSubmit = async () =>{}
    if(verifying){
        return(
            <h1>This is OTP enetering field</h1>
        )
    }

    return(
        <h1>Signup Form with email and other fields</h1>
    )


}

