'use server';
import Link from "next/link";
import { MongoService } from "../../(others)/services/mongodbService";
import { headers } from "next/headers";

export default async function Home() {
  /*
  the home page of the LARA-LMS application
  contains 3 sections:
  1. welcome message 
  2. create test button along with upcomming tests
  3. already completed tests 
  */
  const host = (await headers()).get('host')
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const res= await fetch(`${protocol}://${host}/api/gettests`, {
    cache: 'no-store',
  });
  const data:{previousTests:any[], upcomingTests:any[] }  = await res.json();
  const { previousTests, upcomingTests } = data


  return (
    <div className="p-[48px] w-full h-full">
  
        <h1 className="text-2xl font-semibold text-purple-900">current tests</h1>
        <div className="flex gap-4 mt-5 overflow-scroll pb-1">

          <Link href={`/test/create`} className="hover:text-purple-700 hover:text-2xl font-thin text-center">
            <section className="h-[200px] min-w-[250px] p-4 rounded-2xl shadow hover:shadow-md bg-white flex justify-center items-center">
              <div >
                <h1 className="">+</h1>
                <p className="">create test</p>
              </div>
            </section>
          </Link>

          {upcomingTests && upcomingTests.map(item => (
            <Link href={`/test/${item._id.toString()}`} key={item._id.toString()}>
              <section className="h-[200px] min-w-[250px] p-4 rounded-2xl shadow hover:shadow-md bg-white flex flex-col-reverse">
                <div>
                  <h1 className="font-medium text-xl">{item.title}</h1>
                </div>
              </section>
            </Link>
          ))}

        </div>
  
        <h1 className="text-2xl font-semibold text-purple-900 mt-[32px]">Previous tests</h1>
        <div className="bg-white p-5 shadow rounded-2xl mt-5">
          {previousTests && previousTests.map(item => (
            <Link href={`/test/${item._id.toString()}`} key={item._id.toString()}>
              <section className="mb-4">
                <h1 className="text-xl font-medium">{item.title}</h1>
                <p className="text-gray-400 font-medium">{new Date(item.end).toLocaleDateString()}</p>
              </section>
            </Link>
          ))}

        </div>
      </div>
  );
}