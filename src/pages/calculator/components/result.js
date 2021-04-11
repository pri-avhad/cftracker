import React from 'react'
import './result.scss'

const Result = ({result}) => (
    <div className = "innerContainer">
        <p className = "text" style = {{fontSize: "1.4rem"}}>Your result is </p>
        <p className = "text" style = {{fontSize: "1.7rem"}}><b><b>{result}</b></b></p>
        <p className = "text" style = {{fontSize: "1.4rem"}}>kgs/month</p>
    </div>
    //add button to update DB
);

export default Result;