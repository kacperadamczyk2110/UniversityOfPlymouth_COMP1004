import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req, res){

    const myPostReqVal = await req.json()
    const theuid = myPostReqVal.theuid
    const theusername = myPostReqVal.theusername
    const thereview = myPostReqVal.thereview
    const theratings = myPostReqVal.theratings


    const client = await clientPromise
    const db = await client.db("products")
    const theAddRewRes = await db.collection("reviews").insertOne({
        uid:theuid,
        username:theusername,
        review: thereview,
        ratings: theratings
    })

    return NextResponse.json({
        theAddRewRes
    })
}