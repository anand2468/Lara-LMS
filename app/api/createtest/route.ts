import { MongoService } from "@/app/(others)/services/mongodbService";
import { generateQuestionsRequest } from "@/app/(others)/types/testRequest";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";


export async function POST(req:NextRequest){
    const mongo = new MongoService();
    const body =await req.json()
    const {topics} = body
    const ques =await mongo.fetchRandomQuestions(topics)

    mongo.collectionName = 'tests'
    try{
        const client = await mongo.connect();
        const res = await client.insertOne({
            ...body,
            "start":new Date(body.start),
            "end": new Date(body.end),
            questions:ques
        })
        console.log(res.insertedId, mongo.collectionName, mongo.dbName)
        return res? new NextResponse(JSON.stringify({"status":"success"})): new NextResponse(JSON.stringify({"status":"fail"}))
    }catch(error:any){
        return new NextResponse(JSON.stringify({'status':"error"}));
    }finally{
        mongo.close()
    }
}