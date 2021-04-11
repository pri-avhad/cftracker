import React from "react";
import { Row, Col} from "reactstrap";
import BreadcrumbHistory from '../../components/BreadcrumbHistory/BreadcrumbHistory';
import Donut from '../../pages/components/charts/Donut';
import s from '../dashboard/Dashboard.module.scss'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {auth} from './../../firebase/firebase.utils';

import "./suggestions.scss";
class Suggestions extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      graph: null,
      result:0,
      checkedArr: [false, false, false],
    };
  }

  componentDidMount(){
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await (userAuth);
        console.log(userRef.uid);
        const currentId = userRef.uid;
        const ref = firebase.firestore().doc(`users/${currentId}`);
        const data = await ref.get();
        const date = new Date();
        const m = date.toLocaleString('default', {month:'long'});
        switch(m){
          case 'January':
            this.setState({
              result: data.data().c1
            });
            break;
          case 'February':
            this.setState({
              result: data.data().c2
            });
            break;
          case 'March':
            this.setState({
              result: data.data().c3
            });
            break;
          case 'April':
            this.setState({
              result: data.data().c4
            });
            break;
          case 'May':
            this.setState({
              result: data.data().c5
            });
            break;
          case 'June':
            this.setState({
              result: data.data().c6
            });
            break;
          case 'July':
            this.setState({
              result: data.data().c7
            });
            break;
          case 'August':
            this.setState({
              result: data.data().c8
            });
            break;
          case 'September':
            this.setState({
              result: data.data().c9
            });
            break;
          case 'October':
            this.setState({
              result: data.data().c10
            });
            break;
          case 'November':
            this.setState({
              result: data.data().c11
            });
          break;
          case 'December':
            this.setState({
              result: data.data().c12
            });
            break;
          default:
              console.log('error');
      }
        }
      });
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
                  <div></div>
                  <div className = "r" >
                    <p className = "text" >Your currrent Carbon footprint is <b><b>{this.state.result} kgs/month</b></b> whilst the average for an average Indian is 47 kgs/month. Follow the given suggestions to lower your footprint</p>
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
