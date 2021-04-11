import React, {useState,useEffect} from "react";
import ApexChart from "react-apexcharts";
import s from "./Charts.module.scss";
import config from "./config";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/themeRiver";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {auth} from './../../../firebase/firebase.utils';

const colors = config.chartColors;
let columnColors = [
  colors.blue,
  colors.green,
  colors.orange,
  colors.purple,
  colors.dark,
  colors.red,
  colors.teal,
];
class Co2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        c1: 0,
        c2: 0,
        c3: 0,
        c4: 0,
        c5:0,
        c6: 0,
        c7: 0,
        c8: 0,
        c9:0,
        c10:0,
        c11:0,
        c12:0
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
          c1: data.data().c1,
          c2:  data.data().c2,
          c3: data.data().c3,
          c4: data.data().c4,
          c5: data.data().c5,
          c6: data.data().c6,
          c7: data.data().c7,
          c8: data.data().c8,
          c9: data.data().c9,
          c10: data.data().c10,
          c11: data.data().c11,
          c12: data.data().c12
        })
        }
      });
    }

  
  render(){
    var apex ={
      column: {
        series: [
          {
            data: [this.state.c1,this.state.c2,this.state.c3,this.state.c4,this.state.c5,this.state.c6,this.state.c7,this.state.c8,this.state.c9,this.state.c10,this.state.c11,this.state.c12], //update from DB
          },
        ],
        options: {
          chart: {
            height: 350,
            type: "bar",
          },
          legend: {
            show: true,
            labels: {
              colors: colors.textColor,
            },
            itemMargin: {
              horizontal: 10,
              vertical: 5
            },
          },
          colors: columnColors,
          plotOptions: {
            bar: {
              columnWidth: "45%",
              distributed: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "June",
              "July",
              "Aug",
              "Sept",
              "Oct",
              "Nov",
              "Dec",
            ],
            labels: {
              style: {
                colors: columnColors,
                fontSize: "14px",
              },
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            labels: {
              style: {
                color: colors.textColor,
              },
            },
          },
          tooltip: {
            theme: "dark",
          },
          grid: {
            borderColor: colors.gridLineColor,
          },
        },
      },
      
    };
 return(
  <div className = {s.bar}>
                  <ApexChart
                  className="sparkline-chart"
                  height={280}
                  series={apex.column.series}
                  options={apex.column.options}
                  type={"bar"}
                />
   </div>
 );


 }

  
}
export default Co2;