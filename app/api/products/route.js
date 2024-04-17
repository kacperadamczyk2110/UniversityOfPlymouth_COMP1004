import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(){
    const client = await clientPromise;
    const db = await client.db("products")
    const theProducts = await db.collection("productinfo").find({}).toArray()

    return NextResponse.json({
        theProducts
    })
}