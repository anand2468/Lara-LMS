"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react"
import { MdOutlineLightMode } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";

import styles from './TestArea.module.css';


interface Qdata{
    _id:string,
    question:string,
    options:string[],
    answer:string,
    topic:string,
    selected?:string
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
    const [answers, setanswers] = useState<{[key:string]:string}>({})
    const [curTheme, setcurTheme] = useState<string>("dark")

    useEffect(()=>{
        setcurrquestion(sidequestions[0])
    }, [sidequestions])
    useEffect(()=>{
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

    const handleSelectOption = (qid:string,option:string)=>{
        setanswers(prev=>({...prev, [qid]:option}))
        // setquestions(prev => prev.map(q=> q._id == currquestion._id ? {...q, "selected":value}: q ))
        // console.log(value)
    }

    const handleSubmit = (e:any)=>{
        e.preventDefault()

        if (Object.keys(answers).length === questions.length || confirm("didnt attempted all questions..")){
            let result = 0;
            questions.map(q => {
                if (answers[q._id] == q.answer){
                    result += 1;
                }
            })
            alert(`test completed you scored ${result} marks` )
            redirect('/')
        }
    }


    const updateTheme = ():void =>{
        (curTheme=="dark")?setcurTheme("light"):setcurTheme("dark")
    }

    return <div className={`${styles.bg} ${(curTheme=="light")?styles.themeWhiteBg:""}`}>
                <div className={`${styles.ellipse1} ${(curTheme=="light")?styles.lightThemeEllipse1:""}`}></div>
                <div className={`${styles.ellipse3} ${(curTheme=="light")?styles.lightThemeEllipse3:""}`}></div>
                <div className={styles.content}>
                    <div className={(curTheme=="light")?`${styles.navi} ${styles.themeWhiteCard}`:`${styles.navi}`}>
                        <h1 className={(curTheme=="light")?`${styles.h1} ${styles.themeBlackText}`:`${styles.h1}`}>welcome to {testdata.title} </h1>
                        {
                            (curTheme=="dark")?<MdOutlineLightMode  className={styles.lightThemeIcon} onClick={()=>updateTheme()} />:<IoMoonOutline   className={styles.darkThemeIcon}  onClick={()=>updateTheme()} />
                        }
                        
                    </div>
                    
                    
                    <div className={` ${styles.view}`}>
                        {/* display current question */}
                        
                        <div className="w-[70%]">
                            <div className={`${styles.progress}`}>
                                
                                <p className={(curTheme=="light")?`${styles.questionsCount}  ${styles.themeBlackText}`:`${styles.questionsCount}`}>Question 2 of 10</p>
                                <p className={(curTheme=="light")?`${styles.completedPercentage}  ${styles.themeBlackText}`:`${styles.completedPercentage}`}>20% Completed</p>
                            </div>
                            <div className={(curTheme=="light")?`${styles.completedCountBar} ${styles.themeBlackBg}`:`${styles.completedCountBar}`}></div>
                            <CurrentQuestion question={currquestion} changeOption={handleSelectOption} answers={answers} curTheme={curTheme}/>
                        </div>

                        {/* display side nav */}
                        <div className={(curTheme=="light")?`${styles.sideQuestionNav} ${styles.themeWhiteBg}`:`${styles.sideQuestionNav}`} >
                            <TopicBar topics={testdata.topics} changeTopic={handlechangetopic} currtopic={currtopic}/>
                            <QuestionList questions={sidequestions} changeQuestion={handleSelectQuestion} currquestion={currquestion}/>
                        </div>
                    </div>
                    <div>
                        <button className={styles.nextButton} type="submit" onClick={handleSubmit}>submit</button>
                    </div>
                </div>
            </div>



    
}

function TopicBar({topics, changeTopic, currtopic}:{topics:Tdata[], changeTopic:any, currtopic:string}){
    return  <div>
    {topics.map(t => <button key={t._id} className={(currtopic == t.topic) ? `${styles.sideDivTopic} m-2 p-2  border rounded-2xl`:'m-2 p-2'}  onClick={()=> changeTopic(t.topic)}>{t.topic}</button>)}</ div> 
}

function QuestionList({questions, changeQuestion, currquestion}:{questions:Qdata[]; changeQuestion:any, currquestion:Qdata}){
    return <div className="flex flex-wrap">
        {questions.map((q,ind)=> <div key={ind} className={(currquestion._id == q._id)?`${styles.sideDivQuesNo}   border p-2 m-2 rounded-full` :`${styles.sideDivQuesNo} !bg-white border p-2 m-2 rounded-full`} onClick={()=>changeQuestion(q._id)}> {ind +1} </div> )}
    </div>
}

function CurrentQuestion({question, changeOption, answers, curTheme}:{question:Qdata, changeOption:any, answers:any, curTheme:string}){
    const [selected, setselected] = useState<string|null>(null)
    const [presentoption, setpresentoption] = useState<number>()
    // useEffect(()=>{
    //     function addOption(){
    //         changeOption(selected)
    //     }
    //     return addOption()
    // })
    // const handlechange = (value:string)=>{
    //     setselected(value)
    //     // changeOption(value)
    // }

    const optionChosen = (ind:number):void =>{
        setpresentoption(ind)
    }


    return <>
        <div className={`${styles.questionDiv} ${(curTheme=="light")?styles.themeWhiteBg:""}`}>
            <div className={styles.timerDiv}>
                {/*<p className={styles.pointsDiv}>1 point</p>*/}
                <div className={styles.imgTimeDiv}>
                    <img className={styles.timerImg} src="https://iili.io/Fny4bLX.png"/>
                    <p className={styles.timer} >00:00</p>
                </div>
                {/*<p className={`${styles.difficultyText} ${styles.themeWhiteText}`}>Medium</p>*/}
            </div>
            <h1 className={styles.questionText}> {question.question} {question._id} {question.topic}</h1>
        </div>
        <div >
            {question.options.map((o, ind) => <section key={ind}>
                <div className={curTheme=="light"?(presentoption==ind)?`${styles.optionDiv} ${styles.themeUnimportantWhite} ${styles.ThemedselectedQuestionTheme}`:`${styles.optionDiv} ${styles.themeWhiteBg}`:(presentoption==ind)?`${styles.optionDiv} ${styles.selectedQuestionTheme}`:`${styles.optionDiv}`}  onClick={() => optionChosen(ind)}>
                    
                    <input className={styles.radioButton}  type="radio" checked={answers[question._id] == o?true:false} name={`option${question._id}`} id={`option${question._id}${ind}`} value={o} onChange={()=>changeOption(question._id, o)}/> 
                    <label htmlFor={`option${ind}`}>{o}</label>
                </div></section> )}
        </div>
    </>
}
