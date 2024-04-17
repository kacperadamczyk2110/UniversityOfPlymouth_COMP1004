import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    const myCookies = cookies()

    const myAllCookies = myCookies.getAll()

    console.log(myCookies.getAll())

    return NextResponse.json({
        myAllCookies
    })
    
}