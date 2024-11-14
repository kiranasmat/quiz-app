import {QuestionType, Quiz } from "../types/quiz-types";
const shuffleArray=(array:any[])=>
[...array].sort(()=>Math.random()-0.5)
export const getQuizDetails=async(totalQuestions:number,level:string):Promise<QuestionType[]>=>{
const resp=await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${level}&type=multiple`)
let {results}=await resp.json()
const quiz:QuestionType[]=results.map((questionObj:Quiz,ind:number)=>{
    return {
    question:questionObj.question,
    answer:questionObj.correct_answer,
    correct_answer:questionObj.correct_answer,
    option:shuffleArray(
questionObj.incorrect_answers.concat(questionObj.correct_answer)
),
    }
})
return quiz;
}