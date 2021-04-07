import React from "react";
import { Row, Col, Progress, Table, Label, Input } from "reactstrap";
import BreadcrumbHistory from '../../components/BreadcrumbHistory/BreadcrumbHistory';
import { Carousel } from 'react-responsive-carousel';
import Donut from '../../pages/components/charts/Donut';

import Widget from "../../components/Widget";

import Calendar from "./components/calendar/Calendar";
import Map from "./components/am4chartMap/am4chartMap";
import Rickshaw from "./components/rickshaw/Rickshaw";

import AnimateNumber from "react-animated-number";
import Co2 from '../../pages/components/charts/co2';

import s from "./Dashboard.module.scss";
var randomImages = [
  require('./neededImages/1.png'),
  require('./neededImages/2.png'),
  require('./neededImages/3.png'),
  require('./neededImages/4.png'),
  require('./neededImages/5.png'),
  require('./neededImages/6.png'),
  require('./neededImages/7.png'),
  require('./neededImages/8.png'),
];
class Dashboard extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      graph: null,
      checkedArr: [false, false, false],
    };
    this.checkTable = this.checkTable.bind(this);
  }

  checkTable(id) {
    let arr = [];
    if (id === 0) {
      const val = !this.state.checkedArr[0];
      for (let i = 0; i < this.state.checkedArr.length; i += 1) {
        arr[i] = val;
      }
    } else {
      arr = this.state.checkedArr;
      arr[id] = !arr[id];
    }
    if (arr[0]) {
      let count = 1;
      for (let i = 1; i < arr.length; i += 1) {
        if (arr[i]) {
          count += 1;
        }
      }
      if (count !== arr.length) {
        arr[0] = !arr[0];
      }
    }
    this.setState({
      checkedArr: arr,
    });
  }
  

  render() {
    return (
      <div className={s.root}>
        <Row>
          <Col sm>
            <BreadcrumbHistory url={this.props.location.pathname} />
            <h3 className="page-title" style = {{marginTop: "0px"}}>
              Home &nbsp;
              <small>
                <small style={{color: "black"}}>Carbon-footprint statistics</small>
              </small>
            </h3>
            <Row> 
              <Col sm={6} className ={s.pad}>
              <div className = {s.containerBox}>
                  <Map />
                </div>
              </Col>
              <Col sm={6} className ={s.pad}>
              <div className = {s.containerBox}>
              <Co2 />
                </div>
              </Col>
            </Row>
            <h4 className = {s.noMargin}>Carbon offsetting options </h4>
            <Row>
              <Col sm lg = {4} className ={s.pad}>
              <div className = {s.don}>
              <a href = {"https://carbonfund.org/carbon-offsets/"} target = {"_blank"}><img className = {s.img} src= {require("./neededImages/9.png")}  /></a>
                </div>
              </Col>
              <Col sm lg = {4} className ={s.pad}>
              <div className = {s.don}>
                <a href = {"https://www.terrapass.com/product/balanced-living-plan"} target = {"_blank"}><img className = {s.img}  src= {require("./neededImages/10.png")} /></a>
                </div>
              </Col>
              <Col sm lg = {4} className ={s.pad}>
              <div className = {s.don}>
              <a href = {"https://marketplace.goldstandard.org/collections/projects"} target = {"_blank"}><img className = {s.img}  src= {require("./neededImages/11.png")} /></a>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs lg="3" className ={s.padSide}>
          <div className = {s.containerBox2Side}>
              <Row>
                  <h4>Suggestions</h4>
                  <div className = {s.innerContainer}>
                  <img className = {s.img} src={randomImages[Math.floor(Math.random()*randomImages.length)]}/>
                    
                  </div>
                  <h4>Individual footprint</h4>
                  <div className = {s.containerBoxSide}><Donut/></div>
                </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
