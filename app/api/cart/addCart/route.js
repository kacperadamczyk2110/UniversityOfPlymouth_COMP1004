import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req, res){
    const myCookies = cookies()
    const myPostReq = await req.json()

    const currentObjectId = myPostReq.id;
    const productUnitPrice = myPostReq.price;
    const productName = myPostReq.pname;
    const productImage = myPostReq.image;

    if(myCookies.has(currentObjectId)){
        const theObject = JSON.parse(myCookies.get(currentObjectId).value)
        theObject.quantity = Number(theObject.quantity) + 1
        if(theObject.quantity>5){
            return NextResponse.json({
                "res": "Limit"
            })
        }
        myCookies.set(currentObjectId, JSON.stringify(theObject))
    }else{
        myCookies.set(currentObjectId, JSON.stringify({
            id: currentObjectId,
            price: productUnitPrice,
            pname: productName,
            image: productImage,
            quantity: 1,
            })  
        )
    }

    return NextResponse.json({
        "res": "Done"
    })
}   