import Link from "next/link";
import { MongoService } from "./(others)/services/mongodbService";

export default async function Home() {
  /*
  the home page of the LARA-LMS application
  contains 3 sections:
  1. welcome message 
  2. create test button along with upcomming tests
  3. already completed tests 
  */
  const mongo = new MongoService();
  mongo.collectionName = 'tests'
  const client = await mongo.connect()
  let previousTests:any[] = []
  let upcomingTests:any[] = []

  try{
    let data = await client.find({  end: { $lt: new Date()}}).toArray()
    previousTests = data
    data = await client.find({  end: { $gt: new Date()}}).toArray()
    upcomingTests = data 
  }catch(err:any){
    console.log('error fething data')
  }finally{
    mongo.close()
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <h1 className="text-3xl font-bold">Welcome to the LARA-LMS</h1>
        <p className="text-lg">Generate and manage your tests easily.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="/test/create" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create Test</a>
        </div>

        <div>
          <h1>
            upcoming and ongoing tests
          </h1>
            {upcomingTests && upcomingTests.map(item => <Link href={`/test/${item._id.toString()}`} key={item.title}> {item.title} </Link>)}
        </div>

        <div>
          <h1>previous tests</h1>
          {previousTests && previousTests.map(item => <Link href={`/test/${item._id.toString()}`} key={item.title}>{item.title}  </Link>)}
        </div>
      </main>
    </div>
  );
}
