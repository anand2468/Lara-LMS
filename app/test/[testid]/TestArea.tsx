"use client";
import { useEffect, useState } from "react"


interface Qdata{
    _id:string,
    question:string,
    options:string[],
    answer:string,
    topic:string
}
interface Tdata{
    _id:string,
    topic:string,
    no_of_questions:number
}

export interface TestData{
    _id:any,
    start:string,
    end:string,
    duration:string,
    title:string,
    topics:Tdata[],
    questions:Qdata[]
}



export default function ConductTest({testdata}:{testdata:TestData}) {
    const [questions, setquestions] = useState<Qdata[]>(testdata.questions)
    const [currtopic, setcurrtopic] = useState<string>(testdata.topics[0].topic)
    const [sidequestions, setsidequestions] = useState<Qdata[]>(questions.filter(q => (q.topic == currtopic)))
    const [currquestion, setcurrquestion] = useState<Qdata>(sidequestions[0])

    useEffect(()=>{
        setcurrquestion(sidequestions[0])
    }, [sidequestions])
    useEffect(()=>{
        console.log("topic changed")
        setsidequestions(questions.filter(q => (q.topic == currtopic)))
    }, [currtopic])

    const handlechangetopic =(topic:string)=>{
        if (topic == currtopic) return;
        setcurrtopic(topic);
    }

    const handleSelectQuestion = (id:string)=>{
        if(id == currquestion._id) return ;
        setcurrquestion(sidequestions.filter(q=> q._id == id)[0])
    }
    // console.log(JSON.stringify({"curt":currtopic, "curq": currquestion, "curside":sidequestions}))

    return <div className="p-4">
      <h1>welcome to {testdata.title} </h1>
      <div className="flex w-full">
        {/* display current question */}
        <div className="w-[60%]">
            <CurrentQuestion question={currquestion}/>
        </div>

        {/* display side nav */}
        <div>
            <TopicBar topics={testdata.topics} changeTopic={handlechangetopic} currtopic={currtopic}/>
            <QuestionList questions={sidequestions} changeQuestion={handleSelectQuestion} currquestion={currquestion}/>
        </div>
      </div>
    </div>



    
}

function TopicBar({topics, changeTopic, currtopic}:{topics:Tdata[], changeTopic:any, currtopic:string}){
    return  <div>
    {topics.map(t => <button key={t._id} className={(currtopic == t.topic) ? `m-2 p-2 border rounded-2xl`:'m-2 p-2'}  onClick={()=> changeTopic(t.topic)}>{t.topic}</button>)}</ div> 
}

function QuestionList({questions, changeQuestion, currquestion}:{questions:Qdata[]; changeQuestion:any, currquestion:Qdata}){
    return <div className="flex flex-wrap">
        {questions.map((q,ind)=> <div key={ind} className={(currquestion._id == q._id)?"bg-sky-500 border p-2 m-2 rounded-full" :"border p-2 m-2 rounded-full"} onClick={()=>changeQuestion(q._id)}> {ind +1} </div> )}
    </div>
}

function CurrentQuestion({question}:{question:Qdata}){
    return <>
        <h1> {question.question} {question._id} {question.topic}</h1>
        <ol>
            {question.options.map((o, ind) => <li key={ind}>{o}</li>)}
        </ol>
    </>
}
