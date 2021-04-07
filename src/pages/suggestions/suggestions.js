import React from "react";
import { Row, Col} from "reactstrap";
import BreadcrumbHistory from '../../components/BreadcrumbHistory/BreadcrumbHistory';

import Donut from '../../pages/components/charts/Donut';
import s from '../dashboard/Dashboard.module.scss'

import "./suggestions.scss";
class Suggestions extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      graph: null,
      checkedArr: [false, false, false],
    };
  }

  

  render() {
    return (
      <div className={s.root}>
        <Row>
          <Col sm>
            <BreadcrumbHistory url={this.props.location.pathname} />
            <h3 className="page-title" style = {{marginTop: "0px"}}>
              Suggestions &nbsp;
              <small>
                <small style={{color: "black"}}>to reduce Carbon-footprint</small>
              </small>
            </h3>
            <Row style = {{paddingTop: "0px"}}> 
              <Col sm={6} className ={s.pad} style = {{paddingLeft: "5px"}}>
              <img className = "main" style = {{height: "95%"}} src= {require("./images/main.gif")} />
              </Col>
              <Col sm={6} className ={s.pad}>
              <Row>
              <img className = "img"  src= {require("./images/s1.png")} />
              <img className = "img"  src= {require("./images/s2.png")} />
              </Row>
              </Col>
            </Row>
            <Row>
              <Col sm ={6} className ={s.pad}>
              <Row>
              <img className = "img"  src= {require("./images/s3.png")} />
              <img className = "img"  src= {require("./images/s4.png")} />
              </Row>
              </Col>
              <Col sm = {6} className ={s.pad}>
              <Row>
              <img className = "img"  src= {require("./images/s5.png")} />
              <img className = "img"  src= {require("./images/s6.png")} />
              </Row>
              </Col>
              <Col sm lg = {4} className ={s.pad}>
              
              </Col>
            </Row>
          </Col>
          <Col xs lg="3" className ={s.padSide}>
          <div className = {s.containerBox2Side}>
              <Row>
                  <h4>Your Carbon-footprint</h4>
                  <div className = {s.innerContainer}>
                  <div className = "r">
                    <h3>100 kgs/month</h3>
                    </div>
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

export default Suggestions;
