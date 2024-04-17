import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req,res){

    const myPostReq = await req.json()

    console.log(myPostReq)

    const myUsername = myPostReq.username
    const myUserMail = myPostReq.usermail
    const myUserPass = myPostReq.userpass

    try{
        const client = await clientPromise;
        const db = await client.db("users")
        const theColl = await db.collection("userata")

        const checkTheUser = await theColl.find({"username":myUsername}).toArray()

        if(checkTheUser.length > 0){
            return NextResponse.json({
                "res": "User already Exist"
            })
        }else{
            const theDBRes = await theColl.insertOne({
                "username": myUsername,
                "usermail": myUserMail,
                "userpassword": myUserPass
            })

            if(theDBRes.acknowledged == true){
                return NextResponse.json({
                    "res": "User Added"
                })
            }else{
                return NextResponse.json({
                    "res": "Somehing Went Wrong"
                })
            }
            
        } 
    } catch(e){
        return NextResponse.json({
            "res": "Somehing Went Wrong"
        })
    }

    
    
}

