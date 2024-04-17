import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
    const client  = await clientPromise
    const db = await client.db("products")
    const theReview = await db.collection("reviews").find({'uid':params.id}).toArray()

    return NextResponse.json({
        theReview
    })
}