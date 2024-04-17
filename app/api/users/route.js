import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";


export async function POST(req, res){

    const thePOSTReq = await req.json()

    const userName = thePOSTReq.theUsername
    const userPassword = thePOSTReq.theUserPassword
    try{
        const client = await clientPromise;
        const db = await client.db("users")
        const users = await db.collection("userdata").find({"username": userName}).toArray()
        if(users.length > 0){
            if(users[0].userpassword == userPassword){
                return NextResponse.json({
                    "res": "Correct Password"
                })
            }else{
                return NextResponse.json({
                    "res": "Incorrect Password"
                })
            }
        }else{
            return NextResponse.json({
                "res": "User not found"
            })
        }
        
        

    } catch (e){
        console.log(e)
        return NextResponse.json({
            "data": "NOT working"
        })
    }
}
