import {auth} from "@clerk/nextjs/server";
import {files} from "@/lib/db/schema";
import {db} from "@/lib/db";
import {eq,and,isNull}from "drizzle-orm";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request:NextRequest){
    try{
        const{userId} = await auth();
        if(!userId){
         return NextResponse.json({error:"Unauthorized"},{status:401});
        }

       const searchParams= request.nextUrl.searchParams;
       const queryUserId= searchParams.get("userId")
       const parentId= searchParams.get("parentId")





    }
    catch(error){

    }

}