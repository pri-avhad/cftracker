import React from 'react';
import {Row,Col} from "reactstrap";
import s from '../dashboard/Dashboard.module.scss'
import BreadcrumbHistory from '../../components/BreadcrumbHistory/BreadcrumbHistory';
import './calculator.scss'
import Result from './components/result';
import { connect } from 'react-redux';
import {setCurrentUser} from '../../reducers/user/user.actions';
import {auth, updateData} from  '../../firebase/firebase.utils';
import Donut from '../../pages/components/charts/calcDonut';



class Calculator extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            result: 0,
            housing: 0,
            travel: 0,
            product: 0,
            food: 0,
            electricity : 0.0,
            naturalgas :0.0,
            fueloil :0,
            lpg :0,
            waste:0,
            water:0,
            redmeat:0,
            whitemeat:0,
            dairy:0,
            cereals:0,
            vegetables:0,
            fruits :0,
            oils :0,
            drinks : 0,
            snacks :0,
            vehicle : 0,
            bus:0,
            metro:0,
            taxi:0,
            rail:0,
            flying:0,
            elect:0,
            household :0,
            clothes :0,
            medical :0,
            recreational :0,
            other :0
        }
    }
    
  handleSubmit=(e)=>{
    e.preventDefault();
    const {result,housing,food,travel,product} =this.state;
    auth.onAuthStateChanged(async userAuth => {
        if (userAuth) {
            const userRef = await updateData(userAuth, result , housing, food,travel,product);
            console.log(userRef);
        }
      
      })
  }

    render() {
      const food_result = parseFloat(this.state.redmeat) * 30 * 36 +
          parseFloat(this.state.whitemeat) * 30 * 25.5 +
          parseFloat(this.state.dairy) * 30 * 1.3 +
          parseFloat(this.state.cereals) * 30 * 0.9 +
          parseFloat(this.state.vegetables) * 30 * 2 +
          parseFloat(this.state.fruits) * 30 * 1.1 +
          parseFloat(this.state.oils) * 30 * 10.21 +
          parseFloat(this.state.snacks) * 30 * 1.3 +
          parseFloat(this.state.drinks) * 30 * 2.5;
      const vehicle_result = parseFloat(this.state.vehicle)  * 2.32 +
      parseFloat(this.state.bus)  * 0.015 +
      parseFloat(this.state.metro)  * 0.003 +
          parseFloat(this.state.taxi)  * 4.2+
          parseFloat(this.state.rail)  * 2.6950+
          parseFloat(this.state.flying)  * 0.281 ;
      const product_result= parseFloat(this.state.elect)  * 0.104 +
      parseFloat(this.state.household)  * 17.1+
      parseFloat(this.state.clothes)  * 7.82+
      parseFloat(this.state.medical)  * 10.2 +
      parseFloat(this.state.recreational)  * 24 +
      parseFloat(this.state.other)  * 8.2  ;
      const housing_result = parseFloat(this.state.electricity) * 0.35 +
      parseFloat(this.state.naturalgas) * 6.6 +
      parseFloat(this.state.fueloil)  * 3.1 +
      parseFloat(this.state.lpg)  * 1.8 +
      parseFloat(this.state.waste) * 4 *0.715 +
      parseFloat(this.state.water) * 30 * 0.376 ;

    const carbon_footprint = parseFloat(housing_result + food_result +vehicle_result +product_result).toFixed(2);   
    console.log(carbon_footprint);
    this.state.result = carbon_footprint;
    this.state.housing = housing_result.toFixed(2);
    this.state.food = food_result.toFixed(2);
    this.state.travel = vehicle_result.toFixed(2);
    this.state.product = product_result.toFixed(2);

    

    return (
      
      <Row>
        <Col sm>
          <BreadcrumbHistory url={this.props.location.pathname} />   
          <Row style ={{paddingBottom: "10px",paddingTop: "25px"}}> 
              <Col sm={6} className ={s.pad}>
              <h4 className = {s.noMargin}><b><b>Calculating Carbon footprint... </b></b></h4>
              <p style = {{fontSize: "0.999rem"}}>
              Carbon emissions come mainly from our food, transportation, and homes. So, how do you compare? Our carbon footprint calculator helps you estimate your carbon emissions and the number of trees you need to offset your carbon footprint.
Why trees? Because trees have been quietly offsetting these carbon emissions for centuries. We all produce carbon dioxide (CO2), directly or indirectly, when we use products produced using fossil fuels. We also indirectly produce carbon dioxide when we eat food that has been produced with artificial fertilizers and pesticides (which are made from oil). In total, the amount of carbon dioxide you produce is your ???carbon footprint.??? While it seems like a lot of work to figure out your carbon footprint, it is actually easier than you think. In only a few minutes using our carbon footprint calculator, you can estimate your carbon emissions and how many trees it take to offset them.
              </p>
              </Col>
              <Col sm={6} className ={s.pad}>
              <div className = "form">
              <form className="input-div">
              <h4 className ="title">Housing</h4>
              <div className = "max">
              <label >Electricity <small>in kWh/month</small></label><input className="input-field" type="text" name="electricity" onChange={e=> this.setState({naturalgas:e.target.value, result:carbon_footprint},()=>console.log(this.state))}></input>
              </div>
              <div className = "max">
              <label>Natural Gas <small>in therms/month</small></label><input className="input-field" type="text" name="naturalgas"  onChange={e=> this.setState({naturalgas:e.target.value, result:carbon_footprint},()=>console.log(this.state))}></input>
              </div>
              <div className = "max">
              <label>Fuel Oil <small>in litres/month</small></label><input className="input-field" type="text" name="fueloil"  onChange={e=> this.setState({fueloil :e.target.value, result : carbon_footprint},()=>console.log(this.state))}></input>
              </div>
              <div className = "max">
              <label>LPG <small>in litres/month</small></label><input className="input-field" type="text" name="lpg"  onChange={e=> this.setState({lpg:e.target.value, result : carbon_footprint},()=>console.log(this.state))}></input>
              </div>
              <div className = "max">
              <label>Waste <small>in kg/week</small></label><input className="input-field" type="text" name="waste"  onChange={e=> this.setState({waste:e.target.value, result : carbon_footprint},()=>console.log(this.state))}></input>
              </div>
              <div className = "max">
              <label>Water <small>in litres/day</small></label><input className="input-field" type="text" name="water"  onChange={e=> this.setState({water:e.target.value, result : carbon_footprint},()=>console.log(this.state))}></input>            
              </div>

              
            <h4 className ="title" style={{marginTop: "5%"}}>Travel</h4>
            <div className = "max">
            <label>Vehicle <small>in km/month</small></label><input className="input-field" type="text" name="vehicle"  onChange={e=> this.setState({vehicle:e.target.value, result : carbon_footprint},()=>console.log(this.state))}></input>
            </div>
            <div className = "max">
            <label>Bus <small>in km/month</small></label><input className="input-field" type="text" name="bus"  onChange={e=> this.setState({bus:e.target.value, result : carbon_footprint},()=>console.log(this.state))}></input>
            </div>
            <div className = "max">
            <label>Metro <small>in km/month</small></label><input className="input-field" type="text" name="metro"  onChange={e=> this.setState({metro:e.target.value, result : carbon_footprint},()=>console.log(this.state))}></input>
            </div>
            <div className = "max">
            <label>Taxi <small>in km/month</small></label><input className="input-field" type="text" name="taxi"  onChange={e=> this.setState({taxi:e.target.value, result : carbon_footprint},()=>console.log(this.state))}></input>
            </div>
            <div className = "max">
            <label>Rail <small>in km/month</small></label><input className="input-field" type="text" name="rail"  onChange={e=> this.setState({rail:e.target.value, result : carbon_footprint},()=>console.log(this.state))}></input>
            </div>
            <div className = "max">
            <label>Flying <small>in km/month</small></label><input className="input-field" type="text" name="flying"  onChange={e=> this.setState({flying:e.target.value, result : carbon_footprint},()=>console.log(this.state))}></input>          
            </div>

            <h4 className ="title" style={{marginTop: "5%"}}>Food</h4>
              <div className = "max">
            <label>White Meat <small>in kCal/day</small></label><input className="input-field" type="text" name="whitemeat"  onChange={e=> this.setState({whitemeat:e.target.value, result : carbon_footprint},()=>console.log(this.state))}></input>
            </div>
            <div className = "max">
            <label>Dairy <small>in kCal/day</small></label><input className="input-field" type="text" name="dairy"  onChange={e=> this.setState({dairy:e.target.value, result : carbon_footprint},()=>console.log(this.state))}></input>
            </div>
            <div className = "max">
            <label>Cereals <small>in kCal/day</small></label><input className="input-field" type="text" name="cereals"  onChange={e=> this.setState({cereals:e.target.value, result : carbon_footprint},()=>console.log(this.state))}></input>
            </div>
            <div className = "max">
            <label>Vegetables <small>in kCal/day</small></label><input className="input-field" type="text" name="vegetables"  onChange={e=> this.setState({vegetables:e.target.value, result : carbon_footprint},()=>console.log(this.state))}></input>
            </div>
            <div className = "max">
            <label>Fruits <small>in kCal/day</small></label><input className="input-field" type="text" name="fruits"  onChange={e=> this.setState({fruits:e.target.value, result : carbon_footprint},()=>console.log(this.state))}></input>
            </div>
            <div className = "max">
            <label>Oils <small>in kCal/day</small></label><input className="input-field" type="text" name="oils"  onChange={e=> this.setState({oils:e.target.value, result : carbon_footprint},()=>console.log(this.state))}></input>
            </div>
            <div className = "max">
            <label>Drinks <small>in kCal/day</small></label><input className="input-field" type="text" name="drinks"  onChange={e=> this.setState({drinks:e.target.value, result : carbon_footprint},()=>console.log(this.state))}></input>
            </div>
            <div className = "max">
            <label>Snacks <small>in kCal/day</small></label><input className="input-field" type="text" name="snacks"  onChange={e=> this.setState({snacks:e.target.value, result : carbon_footprint},()=>console.log(this.state))}></input>         
            </div>


            <h4 className ="title" style={{marginTop: "5%"}}>Products</h4>
            <div className = "max">
            <label>Electrical <small>in Rs/month</small></label><input className="input-field" type="text" name="elect"  onChange={e=> this.setState({elect:e.target.value},()=>console.log(this.state))}></input>
            </div>
            <div className = "max">
            <label>Household <small>in Rs/month</small></label><input className="input-field" type="text" name="household"  onChange={e=> this.setState({household:e.target.value},()=>console.log(this.state))}></input>
            </div>
            <div className = "max">
            <label>Clothes <small>in Rs/month</small></label><input className="input-field" type="text" name="clothes"  onChange={e=> this.setState({clothes:e.target.value},()=>console.log(this.state))}></input>
            </div>
            <div className = "max">
            <label>Medical <small>in Rs/month</small></label><input className="input-field" type="text" name="medical"  onChange={e=> this.setState({medical:e.target.value},()=>console.log(this.state))}></input>
            </div>
            <div className = "max">
            <label>Rereational <small>in Rs/month</small></label><input className="input-field" type="text" name="recreational"  onChange={e=> this.setState({recreational:e.target.value},()=>console.log(this.state))}></input>
            </div>
            <div className = "max">
            <label>Other <small>in Rs/month</small></label><input className="input-field" type="text" name="other"  onChange={e=> this.setState({other:e.target.value},()=>console.log(this.state))}></input>         
            </div>

              </form>
              </div>
              </Col>
            </Row>
            <h4 className = "title2">Benefits of calculating </h4>
            <Row>
              <Col sm lg = {4} className ={s.pad}>
              <div className = "benefits">
                <img className = {s.img} src= {require("./calcImages/13.png")} width="100%" />
              </div>
              </Col>
              <Col sm lg = {4} className ={s.pad}>
              <div className = "benefits">
                <img className = {s.img}  src= {require("./calcImages/14.png")} width="100%" />
              </div>
              </Col>
              <Col sm lg = {4} className ={s.pad}>
              <div className = "benefits">
                <img className = {s.img}  src= {require("./calcImages/15.png")} width="100%"  />
              </div>
              </Col>
            </Row>
        </Col>
        <Col sm xs lg="3" className ={s.padSide}>
          <div className = {s.containerBox2Side}>
            <Row>
              <h4>Carbon Footprint</h4>
              <div className = {s.innerContainer}>
                <Result result={this.state.result}/>
                <div >
                  <button onClick={this.handleSubmit} className = "buttonn">Log</button>                              
                </div>
              </div>
              <h4>Logging information</h4>
              <div className = {s.containerBoxSide}><Donut h={this.state.housing} f={this.state.food} t={this.state.travel} p={this.state.product}/></div>
            </Row>
          </div>
        </Col>   
      </Row>
    );
  }
}
const mapStateToProps = (state, user) => ({
  
  isAuthenticated: state.isAuthenticated,
  currentUser: user.currentUser
});


export default connect(null,mapStateToProps)(Calculator);

