"use client";
import { useEffect, useState } from "react";

interface FormData{
  title:string,
  start:string,
  end:string,
}
interface topicData{
  _id:string,
  topic:string
  no_of_questions?:number
}

export default function CreateTest() {
  const [formdata, setformdata] = useState<FormData>({ title:"", start:"2025-06-13T20:50", end:"2025-06-13T20:50"} as FormData)
  const [topicList, setTopicList] = useState<topicData[]>([])
  const [selectedTopics, setSelectedTopics] = useState<topicData[]>([])

  useEffect(()=>{
    async function  gettopics() {
      const res = await fetch('/api/fetchtopics')
      const data = await res.json()
      setTopicList(prev => ([...prev , ...data.data]))
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
    const res = await fetch('http://localhost:3000/api/createtest', 
      {method:"POST", 
        body:JSON.stringify({...formdata, topics:selectedTopics})
      })
      const data = await res.json()
    console.log(data)

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
    <div >
      <h1> create test </h1>
      <form onSubmit={handlesubmit} method="post">

        <label htmlFor="title">title:</label>
        <input type="text" value={formdata.title}required onChange={handlechange} name="title" id="title" />

        <br />
        <label htmlFor="starttime">start time </label>
        <input type="datetime-local" name="start" value={formdata.start} onChange={handlechange} id="startdate" />

        <br />
        <label htmlFor="endtime">end time</label>
        <input type="datetime-local" name="end" value={formdata.end} onChange={handlechange} id="enddate" />

        <br />
        <h1> select topics: </h1>
        {
          topicList.map(topic => <div key={topic._id}>
            <input type="checkbox" name={`${topic.topic}`} id={topic.topic} 
              onChange={(e)=> e.target.checked? setSelectedTopics(prev => ([...prev, topic])): setSelectedTopics(prev => prev.filter(curr => (curr._id !== topic._id)))}/>
            <label htmlFor={topic.topic} className="mr-5">{topic.topic}</label>


            <label htmlFor={`${topic.topic}noq`}>enter no. questions </label>
            <input type="number" name={`${topic.topic}noq`} max={50} min={0} value={topic.no_of_questions || 0} 
            onChange={(e)=> {setTopicList(prev => prev.map(cur => (cur._id == topic._id)? {...cur, no_of_questions:Number(e.target.value)}:cur)  )
            setSelectedTopics(prev => prev.map(cur => (cur._id == topic._id)? {...cur, no_of_questions:Number(e.target.value)}:cur)  )}}  id={`${topic.topic}noq`} /> 
          </div>)
        }
        <br />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}