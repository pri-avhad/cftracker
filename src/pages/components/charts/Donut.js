import React, {useState,useEffect} from "react";
import s from "./Charts.module.scss";
import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/themeRiver";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import config from "./config";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {auth} from './../../../firebase/firebase.utils';
const colors = config.chartColors;
class Donut extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        h: 0.8,
        t: 0.4,
        f: 0.5,
        p: 0.3,
    }
  }

  componentDidMount(){
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await (userAuth);
        console.log(userRef.uid);
        const currentId = userRef.uid;
        const ref = firebase.firestore().doc(`users/${currentId}`);
        const data = await ref.get();
        
        console.log(data.data().housing);
        this.setState({
          h: data.data().housing,
          p: data.data().product,
          t: data.data().travel,
          f: data.data().food,
        })
        }
      });
    }

  
  render(){
    var donut= {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        show: false,
      },
      color: [
        colors.blue,
        colors.green,
        colors.orange,
        colors.red,
        colors.purple,
      ],
      series: [
        {
          name: "Access source",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center",
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "20",
              },
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            //update from DB
            { id:0, value: this.state.h, name: "Housing" },
            { id:1, value: this.state.t, name: "Travel" },
            { id:2, value: this.state.f, name: "Food" },
            { id:3, value: this.state.p, name: "Product" },
          ],
        },
      ],
    };
 return(
  <div className = {s.donut}>
  <ReactEchartsCore
      echarts={echarts}
      option={donut}
      style={{ height: "180px" }}
    />
    <img src={require("./Housing.png")} className = {s.images}/>  
</div>
 );


 }

  
}



export default Donut;