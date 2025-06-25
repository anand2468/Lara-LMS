import { MongoService } from "@/app/(others)/services/mongodbService";
import { ObjectId } from "mongodb";
import ConductTest, { TestData } from "./TestArea";

// export interface topicData{
//     _id:string,
//     topic:string
//     no_of_questions?:number
// }
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


    return <>
        {/* <h1>welcome to test 1 {testid} </h1> */}
        {(new Date(testdetails.end) < new Date())? <TestEnded/> : <ConductTest testdata={testdetails} />}
    </>
}



const TestEnded =()=> <h1> test ended</h1>
const TestNotEnded = ()=> <h1>test not ended</h1>