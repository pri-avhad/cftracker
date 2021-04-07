import React from "react";
import ApexChart from "react-apexcharts";
import s from "./Charts.module.scss";
import config from "./config";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/themeRiver";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";


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

var apex ={
  column: {
    series: [
      {
        data: [39.4, 47, 31.5, 2, 0, 0, 0, 0, 0, 0, 0, 0], //update from DB
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

const Co2 = ()  =>(
  <div className = {s.bar}>
                  <ApexChart
                  className="sparkline-chart"
                  height={280}
                  series={apex.column.series}
                  options={apex.column.options}
                  type={"bar"}
                />
                </div>
)

export default Co2;