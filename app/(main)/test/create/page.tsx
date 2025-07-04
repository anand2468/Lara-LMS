"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface FormData{
  title:string,
  start:string,
  end:string,
  duration:number
}
interface topicData{
  _id:string,
  topic:string
  no_of_questions?:number
}


export default function CreateTest() {
  const [formdata, setformdata] = useState<FormData>({ title:"", start:new Date().toISOString().slice(0,16), end:new Date().toISOString().slice(0,16), duration:30} as FormData)
  const [topicList, setTopicList] = useState<topicData[]>([])
  const [selectedTopics, setSelectedTopics] = useState<topicData[]>([])

  useEffect(()=>{
    async function  gettopics() {
      const res = await fetch(`${window.location.origin}/api/fetchtopics`, {
        cache: 'no-store',
      })
      const data = await res.json()
      setTopicList(data.data)
    }

    gettopics()
  }, [])

  const handlesubmit = async (e:any)=>{
    e.preventDefault()
    if (selectedTopics.length ===0){
      alert("select atleast one topic")
      return
    }
    let empty = selectedTopics.filter(t => (t.no_of_questions))
    if (selectedTopics.length != empty.length) {alert("selected questions must not be zero"); return}
    const res = await fetch(`${window.location.origin}/api/createtest`, 
      {method:"POST", 
        body:JSON.stringify({...formdata, topics:selectedTopics})
      })
      const data = await res.json()
    if(data.status == "success"){
      alert("test created successfully")
      return redirect('/')
    }else{
      alert('error occurred creating test try again')
    }

    // console.log({...formdata, topics:selectedTopics})
  }

  const handlechange = (e:any)=>{
    const { name, value} = e.target;
    setformdata(prev =>( {
      ...prev, 
      [name]:value
    }))
  }
  return (
  <div className="flex h-[100vh] justify-center items-center">
    <div className="w-[80%] rounded-md border-t-4 border-t-purple-400 shadow-xl p-[24px] m-auto lg:w-[600px] bg-gray-50 mt-[100px]" >
      <div className="border-b p-3">
        <h1 className="text-4xl">Create Test</h1>
      </div>

      <form onSubmit={handlesubmit} className="mt-9" method="post">
        <div className="flex flex-col my-2">
          <label htmlFor="title">title:</label>
          <input type="text" value={formdata.title} required onChange={handlechange} name="title" id="title" 
           className="border p-2 rounded-sm border-purple-950"/>
        </div>

        <div className="sm:flex gap-2">
          <div className="flex flex-col grow-1">
            <label htmlFor="starttime">From </label>
            <input className="border  p-2 rounded-md" id="startdate" type="datetime-local" name="start" 
            value={formdata.start} onChange={handlechange}/>
          </div>
          <div className="flex flex-col grow-1">
            <label htmlFor="endtime">To</label>
            <input className="border p-2 rounded-md" id="enddate" type="datetime-local" name="end"
            value={formdata.end} onChange={handlechange}  /><br />
          </div>
        </div>

        <div className="my-2">
          <label htmlFor="duration">Exam Duration (mins):</label>
          <input className="border rounded-md p-1 w-full" id="duration" type="number" name="duration" 
          value={formdata.duration} onChange={(e)=> setformdata(prev=> ({...prev, duration:Number(e.target.value)}))}/><br />
        </div>

        <div className="mt-2">
    
          <h1> select topics: </h1>
          <ul>
          {
            topicList.map(topic => 
            <li key={topic._id} className="flex gap-3 items-center my-2">

              <div className="flex-1/2">
                <input type="checkbox"  name={`${topic.topic}`} id={topic.topic} 
                onChange={(e)=> e.target.checked? setSelectedTopics(prev => ([...prev, topic])): setSelectedTopics(prev => prev.filter(curr => (curr._id !== topic._id)))} />
                <label htmlFor={topic.topic}>{topic.topic}</label>
              </div>


              <label htmlFor={`${topic.topic}noq`}>No.Ques </label>
              <input type="number" name={`${topic.topic}noq`} max={50} min={0} value={topic.no_of_questions || 0} 
              onChange={(e)=> {setTopicList(prev => prev.map(cur => (cur._id == topic._id)? {...cur, no_of_questions:Number(e.target.value)}:cur)  )
              setSelectedTopics(prev => prev.map(cur => (cur._id == topic._id)? {...cur, no_of_questions:Number(e.target.value)}:cur)  )}}  id={`${topic.topic}noq`} placeholder="no. of questions" 
              className="border rounded-md flex-1/2 p-1"/> 
            </li>)
          }
          </ul>
        </div>

        <br />
        <input className="w-full bg-purple-600 p-2 rounded-md text-xl  mb-5 text-white" type="submit" value="submit" />
      </form>
    </div>
  </div>
  );
}
let res = <div className="w-[80%] rounded-md shadow-xl p-[24px] m-auto lg:w-[600px]">
  <div className="border-b p-3">
    <h1 className="text-4xl">Create Test</h1>
  </div>

  <form method="post" className="mt-9" >
    <div className="flex flex-col my-2">
      <label htmlFor="title" >Title:</label>
      <input className="border p-2 rounded-sm border-purple-950" required  placeholder="title" id="title" type="text" value="" name="title" />
    </div>


    <div className="sm:flex gap-2">

      <div className="flex flex-col grow-1">
        <label htmlFor="starttime">From </label>
        <input className="border  p-2 rounded-md" id="startdate" type="datetime-local" value="2025-06-23T05:01" name="start" />
      </div>
      <div className="flex flex-col grow-1">
        <label htmlFor="endtime">To</label>
        <input className="border p-2 rounded-md" id="enddate" type="datetime-local" value="2025-06-23T05:01" name="end" /><br />
      </div>
    </div>

    <div className="my-2">
      <label htmlFor="duration">Exam Duration (mins):</label>
      <input className="border rounded-md p-1 w-full" id="duration" type="number" value="30" name="duration" /><br />
    </div>

    <div className="mt-2">

          <h1>Select Topics & Number of Questions:</h1>

          <ul>
            <li className="flex gap-3 items-center my-2">
              <div className="flex-1/2">
                <input id="old" type="checkbox" name="old" />
                <label htmlFor="old" >old</label>
              </div>

              <label htmlFor="oldnoq">no.ques</label>
              <input className="border rounded-md flex-1/2 p-1" max="50" min="0" id="oldnoq" placeholder="no. of questions" type="number" name="oldnoq" />
            </li>

          </ul>
    </div>

    <br />
    <input className="w-full bg-purple-600 p-2 rounded-md text-xl  mb-5 text-white" type="submit" value="submit" />
  </form>
</div>
