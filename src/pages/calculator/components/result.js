import React from 'react'
import './result.scss'

const Result = ({result}) => (
    <div className = "innerContainer">
        <p className = "text">Your calculated Carbon footprint is <b><b>{result} kgs/month</b></b>. You can choose to log this information into your account for this month.</p>
    </div>
    //add button to update DB
);

export default Result;