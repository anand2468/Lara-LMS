import { NextResponse } from 'next/server';
import { MongoService } from "../../(others)/services/mongodbService";
import type { NextRequest } from 'next/server';

export async function GET( req : NextRequest) {

    const mongo = new MongoService();
    mongo.collectionName = 'tests';
    const client = await mongo.connect();
    let previousTests: any[] = [];
    let upcomingTests: any[] = [];
    
    try {
        let data = await client.find({ end: { $lt: new Date() } }).toArray();
        previousTests = data;
        data = await client.find({ end: { $gt: new Date() } }).toArray();
        upcomingTests = data;
    } catch (err: any) {
        console.log('error fetching data', err);
    } finally {
        mongo.close();
    }
    
    return NextResponse.json({
        previousTests:previousTests,
        upcomingTests:upcomingTests
    });
}
