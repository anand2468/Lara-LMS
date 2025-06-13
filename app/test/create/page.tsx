"use client";
import { useEffect, useState } from "react";

interface FormData{
  title:string,
  topics: {id:number, topic:string, no_of_questions:number}[]
  k:number,
  start:string,
  end:string,
}
interface topicData{
  _id:string,
  topic:string
}

export default function CreateTest() {
  const [formdata, setformdata] = useState<FormData>({k:0, topics:[{id:0, topic:"", no_of_questions:0}], title:"",start:Date(), end: Date() } as FormData)
  const [topicList, setTopicList] = useState<topicData[]>([{"_id":"0", "topic":"--select--"}])

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
    const res = await fetch('http://localhost:3000/api/createtest', 
      {method:"POST", 
        body:JSON.stringify(formdata)
      })
      const data = await res.json()
    console.log(data)
  }

  const addtopic =()=>{
    setformdata(prev=>({...prev, k:prev.k+1}))
    setformdata(prev =>{
      return {...prev, topics:[...prev.topics, {id:prev.k,  topic:"", no_of_questions:0}] }
    })
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
      <form onSubmit={handlesubmit} method="post">

        <label htmlFor="title">title:</label>
        <input type="text" value={formdata.title}required onChange={handlechange} name="title" id="title" />

        <br />
        <label htmlFor="starttime">start time</label>
        <input type="datetime-local" name="start" value={formdata.start} onChange={handlechange} id="startdate" />

        <br />
        <label htmlFor="endtime">end time</label>
        <input type="datetime-local" name="end" value={formdata.end} onChange={handlechange} id="enddate" />

        <br />
        {formdata.topics.map(topic => <div key={topic.id}>
            select topic 
            <select name={`topic${topic.id}`} id={`topic${topic.id}`} onChange={ (e)=> {

                setformdata(prev => ({...prev, topics: prev.topics.map(t => (t.id === topic.id)? {...t, topic:e.target.value }: t)}))
              } }>
              {topicList && topicList.map(t => <option key={t._id} value={t._id}>{ t.topic }</option>)}
            </select>
            {/* <input type="text" name={`topicname${topic.id}`} required placeholder="topic name.."  value={topic.topic} id={`topicname${topic.id}`}
              onChange={ (e)=> setformdata(prev => ({...prev, topics: prev.topics.map(t => (t.id === topic.id)? {...t, topic:e.target.value }: t)})) }/>
             */}
            <input type="number" name={`topicquestions${topic.id}`} max={51} min={1} value={topic.no_of_questions} 
              onChange={ (e)=> setformdata(prev => ({...prev, topics: prev.topics.map(t => (t.id === topic.id)? {...t, no_of_questions:parseInt(e.target.value) }: t)})) }  id={`topicquestions${topic.id}`}/> 
            <input type="button" value="X"  onClick={(e)=> setformdata(prev => ({...prev, topics: prev.topics.filter(t => (t.id !== topic.id))})) }/>
            <br />
        </div >)}

        <br />
        <input type="button" value="add topic" onClick={addtopic}/>
        <br />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}