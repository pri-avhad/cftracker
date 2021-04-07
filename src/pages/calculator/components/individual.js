import React from 'react'
import './individual.scss'

const Individual = ({housing,travel,food,product}) => (
    <>
    <center><img src={require("./ima.png")} className = "images"/></center>
    <div className = "indi">
    <p><b>Housing:</b> {housing} kgs/month</p>
    <p><b>Travel:</b> {travel} kgs/month</p>
    <p><b>Food:</b> {food} kgs/month</p>
    <p><b>Product:</b> {product} kgs/month</p>
    </div>
    </>
);

export default Individual;