import { NextRequest, NextResponse } from 'next/server';
import { MongoService } from "@/app/(others)/services/mongodbService";


export async function POST(req: NextRequest) {
    const mongo = new MongoService();
    const body = await req.json();

    mongo.collectionName = 'results';
    try {
        const client = await mongo.connect();
        const insertedId = await client.insertOne({ ...body, submittedAt: new Date() });

        if (!insertedId) {
            return new NextResponse(JSON.stringify({ status: "fail", message: "Test not found" }), { status: 404 });
        }

        // Here you can add logic to save the user's answers if needed
        // For example, you might want to save the user's answers in a separate collection

        return new NextResponse(JSON.stringify({ status: "success", message: "Test submitted successfully" }), { status: 200 });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ status: "error", message: error.message }), { status: 500 });
    } finally {
        mongo.close();
    }
}