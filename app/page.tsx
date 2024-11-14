"use client";
import { useEffect, useState } from "react";
import { getQuizDetails } from "./services/quize-service";
import { QuestionType, Quiz } from "./types/quiz-types";
import QuizeCard from "@/components/QuizCard";

export default function Quize() {
  let [quiz, setQuiz] = useState<QuestionType[]>([]);
  let [currentStep, setCurrentStep] = useState(0);
  let [score, setScore] = useState(0);
  let [isQuizComplete, setIsQuizComplete] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const questions: QuestionType[] = await getQuizDetails(5, "easy");
        console.log(questions);
        setQuiz(questions);
      } catch (error) {
        console.log("some error");
      }
}
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();
    const currentQuestion: QuestionType = quiz[currentStep];

    console.log(
      "Correct answer is: " +
        currentQuestion.correct_answer +
        " -- User selection: " +
        userAns
    );
    if (userAns === currentQuestion.correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
    if (currentStep < quiz.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setScore(0);
    setIsQuizComplete(false);
  };

  return (
    <div className="quize">
      <h1>Quiz App</h1>
      {quiz.length > 0 && currentStep < quiz.length && !isQuizComplete ? (
        <QuizeCard
          options={quiz[currentStep].option}
          question={quiz[currentStep].question}
          callback={handleSubmit}
        />
      ) : isQuizComplete ? (
        <div className="quize-card">
        <h3>Result</h3>
          <p>Quiz Complete! Your score:<b>{score}</b> out of: <b>{quiz.length}</b></p>
          <button className="restart-quiz" onClick={handleRestart}>Restart Quiz</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
