import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import ImageKit from "imagekit";


const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY|| "",
    urlEndpoint:process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",

});

export async function GET() {
    const {userId}= await auth()
    if(!userId){
        return NextResponse.json({error:"Unauthorized"}, {status:401})

    }
    
};
