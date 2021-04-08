import React from "react";
import s from "./Charts.module.scss";
import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/themeRiver";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import config from "./config";
const colors = config.chartColors;

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
          { id:0, value: 0.8, name: "Housing" },
          { id:1, value: 0.4, name: "Travel" },
          { id:2, value: 0.5, name: "Food" },
          { id:3, value: 0.3, name: "Product" },
        ],
      },
    ],
  };
  
const Donut = ()  =>(
    <div className = {s.donut}>
                  <ReactEchartsCore
                      echarts={echarts}
                      option={donut}
                      style={{ height: "180px" }}
                    />
                    <img src={require("./Housing.png")} className = {s.images}/>
                </div>
  )

export default Donut;
