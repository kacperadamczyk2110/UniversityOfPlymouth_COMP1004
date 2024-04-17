import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res){
    try{
        const myCookies = cookies()
        const myPOSTReq = await req.json()
        myCookies.delete(myPOSTReq.id)
    }catch(e){
        return NextResponse.json({
            "res": "Failed"
        })        
    }
    return NextResponse.json({
        "res": "Done"
    })
}