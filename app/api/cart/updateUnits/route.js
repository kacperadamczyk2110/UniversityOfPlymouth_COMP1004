import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res){
    try{
        const myCookies = cookies()
        const myPOSTReq = await req.json()
        if(myCookies.has(myPOSTReq.id)){
            const theObject = JSON.parse(myCookies.get(myPOSTReq.id).value)
            theObject.quantity = myPOSTReq.q
            myCookies.set(myPOSTReq.id, JSON.stringify(theObject))
        }else{
            return NextResponse.json({
                "res": "Refresh"
            })   
        }
    }catch(e){
        console.log(e)
        return NextResponse.json({
            "res": "Failed"
        })        
    }
    return NextResponse.json({
        "res": "Done"
    })
}