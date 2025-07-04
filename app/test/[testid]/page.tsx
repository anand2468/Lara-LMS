import { MongoService } from "@/app/(others)/services/mongodbService";
import { ObjectId } from "mongodb";
import ConductTest, { TestData } from "./TestArea";
import Dashboard from "./Dashboard";


export async function metadata() {
    return {
        title: 'Test',
        description: 'Conduct a test on LARA-LMS',
    }
}

export default async function TestPage({
    params
}:{params:Promise<{testid:string}>}){


    const {testid} = await params;
    const mongo = new MongoService()
    mongo.collectionName = 'tests'
    let testdetails:TestData = {}as TestData;
    try{
        const client = await mongo.connect()
        const data = await client.findOne({"_id": new ObjectId(testid) })
        testdetails = data as TestData
    }catch(err){
        console.log("error fetching data")
    }finally{
        mongo.close()
    }


    testdetails = {...testdetails, _id: testdetails._id.toString()}

    if ( new Date() > new Date(testdetails.end)){
        return <Dashboard testid={testid} topics={testdetails.topics} title={testdetails.title} />
    }
    return <ConductTest testdata={testdetails} />
}