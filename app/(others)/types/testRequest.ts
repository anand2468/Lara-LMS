export interface generateQuestionsRequest{
    _id:string
    topic:string,
    no_of_questions:number
}
export interface generateQuestionsResponse{
    topic:string,
    questions:any[],
    answers:any[]
}

/**
 *  { "topic": "old", "no_of_questions": 5 },
    { "topic": "new", "no_of_questions": 5 }
 */

/**
 { 
    testd: _id
    title: 'p-test-1',
    start: 'dd/mm/yyyy/hh:mm:ss',
    end : 'dd/mm/yyyy/hh:mm:ss',
    Topics:[t1, t2,.....],
    Questions:{ t1:[ q1, q2, q3...], 
                        t2:[q1,...]...},
    records : [ entry1, entry2, entry3.....]
}
 */