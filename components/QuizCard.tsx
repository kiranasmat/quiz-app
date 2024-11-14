import React, { useState } from "react"
import { questionPropsType } from "@/app/types/quiz-types"
const QuizeCard:React.FC<questionPropsType>=({question,options,callback})=>{
    let[selectedAns,setSelectedAns]=useState("");
    const handleSubmit=(evt:any)=>{
setSelectedAns(evt.target.value)
    }
return(
    <div className="quize-card">
<div className="question">
<h4>
{question}
</h4>
</div>
<form onSubmit={(e:React.FormEvent<EventTarget>)=>callback(e,selectedAns)}
    className="question-form"
    >
    {
        options.map((opt:string,ind:number)=>{
            return <div key={ind}>
            <label className={"radio"}>
                <input 
                type="radio" name="option" required checked={selectedAns===opt}  value={opt}  onChange={handleSubmit}/>
                {opt}
            </label>
            </div>
        })
      
    }

    <input type="submit"  className="submit"/>
    </form>
    </div>
)
}
export default QuizeCard