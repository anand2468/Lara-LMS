import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {MongoService} from '../../(others)/services/mongodbService'
import { success } from "zod/v4";


export async function GET(req:NextRequest){
    const mongo = new MongoService();
    mongo.collectionName = "topics";
    const client = await mongo.connect()
    
    try{
        const data =await client.find({}).toArray();
        return new NextResponse(JSON.stringify(data? {"success":true, data}: {success:false, msg: "no data found"}))
    }catch(error:any){
        return new NextResponse(JSON.stringify({success:false, msg: `error occured ${error}`}))
    }finally{
        mongo.close()
    }
}