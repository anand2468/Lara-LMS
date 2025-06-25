import { MongoService } from "@/app/(others)/services/mongodbService";
import { ObjectId } from "mongodb";
import { NextResponse, type NextRequest } from "next/server";


export async function GET(req:NextRequest) {
    const qid = new URL(req.url).searchParams.get('qid');
    if(!qid) return;
    const mongo = new MongoService();
    mongo.collectionName = "questions"

    try{
        const client = await mongo.connect()
        const data = await client.findOne({_id: new ObjectId(qid)},{projection:{_id:0, question:1, options:1}})
        return data? new NextResponse(JSON.stringify({"status":"success", ...data})) : new NextResponse(JSON.stringify({"status":"fail"}))
    }catch{
        return new NextResponse(JSON.stringify({"status":"fail"}))
    }finally{
        mongo.close()
    }
}