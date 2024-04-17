import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function GET(){
    const myCookies = cookies()
    const theProductPrice = 100

    const theCokdkkdkd = myCookies.get("product1")
    console.log(await theCokdkkdkd)

    
    // console.log(myCookies.get("product1").value[0].price)
    // myCookies.set("product2", JSON.stringify({
    //     id: 'product1',
    //     price: 100,
    //     quantity: 1,
    //     httpOnly: true,
    //     path: '/',
    //   })        
    // )

    const currentObjectId = "product8"
    // const productUnitPrice = 100
    // if(myCookies.has(currentObjectId)){
    //     const theObject = JSON.parse(myCookies.get(currentObjectId).value)
    //     const newQ = theObject.quantity += 1
    //     myCookies.set(currentObjectId, JSON.stringify(theObject))
    // }else{
    //     myCookies.set(currentObjectId, JSON.stringify({
    //         id: currentObjectId,
    //         price: productUnitPrice,
    //         quantity: 1,
    //         })  
    //     )

    // }


    // myCookies.delete(currentObjectId)

    console.log(myCookies.getAll())

    return NextResponse.json({
        "res":"Working"
    })
}