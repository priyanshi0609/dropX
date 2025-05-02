"use client"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import {useForm} from "react-hook-form"
import { useSignUp } from "@clerk/nextjs"
import {set, z} from "zod"
//zod custom schema
import { signupSchema } from "@/schemas/signupSchema"
import { zodResolver } from "@hookform/resolvers/zod"


export default function SignupForm() {
    const router=useRouter()
    const [verifying,setVerifying] = useState(false)
    const[isSubmitting,setIsSubmitting] = useState(false)
    const[verificationCode,setVerificationCode] = useState("")
    const[autherror,setAuthError] = useState<string | null>(null)
    const { signUp,isLoaded,setActive} = useSignUp()
    const[verificationError,setVerificationError] = useState<string | null>(null)
    
    const{
        register,
        handleSubmit,
        formState:{errors}
    } =useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues:{
            email:"",
            password:"",
            passwordConfirmation:"",
        },

    });
        
    
    const onSubmit= async(data:z.infer<typeof signupSchema>) => {
        if(!isLoaded) return
        setIsSubmitting(true)
        setAuthError(null)

        try{
            await signUp.create({
                emailAddress:data.email,
                password:data.password,
            })
            await signUp.prepareEmailAddressVerification({
                strategy:"email_code",
            })
            setVerifying(true)

        }catch(error:any){
            console.error("Signup error",error)
            setAuthError(
                error.errors?.[0]?.message || "An error occurred during signup"
            )
            
         } finally{
            setIsSubmitting(false)
        }

    };
    const handleVerifcationSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!isLoaded || !signUp) return
        setIsSubmitting(true);
        setAuthError(null);
        try{
            const result= await signUp.
            attemptEmailAddressVerification({
                code:verificationCode,
            })
            console.log("Verification result",result)
            if(result.status==="complete"){
                await setActive({session: result.createdSessionId})
                router.push("/dashbaord")
            }
            else{
                console.error("verification error",result)
                setVerificationError(
                   "Verification failed"
                );
            }
                
        }
    catch(error:any){
        console.error("Verification error",error)
        setVerificationError(
            error.errors?.[0]?.message || "An error occurred during verification"
        );
    } finally{
        setIsSubmitting(false);
    }


    };

  
    if(verifying){
        return(
            <h1>This is OTP enetering field</h1>
        )
    }

    return(
        <h1>Signup Form with email and other fields</h1>
    )


}

