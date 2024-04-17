import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req, res){
    try{
        const client = await clientPromise;
    const thePostReq = await req.json()
    const reqUsername = thePostReq.username;
    const reqPassword = thePostReq.userpass

    console.log(thePostReq.username)
    const db = await client.db("users");
    const coll = await db.collection("userata").find({"username": reqUsername}).toArray()


    if(coll.length > 0){
        if(coll[0].userpassword == reqPassword){
        return NextResponse.json({
            "res": "Done",
            "username": reqUsername
        })
        }else{
            return NextResponse.json({
                "res": "Wrong Password"
            })
        }  
    } else{
        return NextResponse.json({
            "res": "User not FOUND"
        })

    } 
    }catch(e){
        return NextResponse.json({
            "res": "Unable to handle the request"
        })
    }
}