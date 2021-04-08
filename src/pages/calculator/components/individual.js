import React from 'react'
import './individual.scss'

const Individual = ({housing,travel,food,product}) => (
    <>
    <center><img src={require("../calcImages/ima.png")} className = "images"/></center>
    <div className = "indi">
    <p><b>Housing:</b> {housing} kgs/month</p>
    <p><b>Travel:</b> {travel} kgs/month</p>
    <p><b>Food:</b> {food} kgs/month</p>
    <p><b>Product:</b> {product} kgs/month</p>
    </div>
    </>
);

export default Individual;

{/* <MDBContainer>
              <MDBNav pills color="#ffffff">
              {/* <MDBNav pills color="secondary"> */}
            //       <MDBNavItem>
            //         <MDBNavLink
            //           link
            //           to="#"
            //           active={this.state.items["default"] === "1"}
            //           onClick={this.togglePills("default", "1")}
            //         >
            //           Active
            //         </MDBNavLink>
            //       </MDBNavItem>
            //       <MDBNavItem>
            //         <MDBNavLink
            //           link
            //           to="#"
            //           active={this.state.items["default"] === "2"}
            //           onClick={this.togglePills("default", "2")}
            //         >
            //           Link
            //         </MDBNavLink>
            //       </MDBNavItem>
            //       <MDBNavItem>
            //         <MDBNavLink
            //           link
            //           to="#"
            //           active={this.state.items["default"] === "3"}
            //           onClick={this.togglePills("default", "3")}
            //         >
            //           Link
            //         </MDBNavLink>
            //       </MDBNavItem>
            //       <MDBNavItem>
            //         <MDBNavLink
            //           link
            //           to="#"
            //           active={this.state.items["default"] === "4"}
            //           onClick={this.togglePills("default", "4")}
            //         >
            //           Help
            //         </MDBNavLink>
            //       </MDBNavItem>
            //     </MDBNav>
            //     <MDBTabContent activeItem={this.state.items["default"]}>
            //       <MDBTabPane tabId="1">
            //         <p>
            //           Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            //           Nihil odit magnam minima, soluta doloribus reiciendis
            //           molestiae placeat unde eos molestias. Quisquam aperiam,
            //           pariatur. Tempora, placeat ratione porro voluptate odit
            //           minima.
            //         </p>
            //       </MDBTabPane>
            //       <MDBTabPane tabId="2">
            //         <p>
            //           Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            //           Nihil odit magnam minima, soluta doloribus reiciendis
            //           molestiae placeat unde eos molestias. Quisquam aperiam,
            //           pariatur. Tempora, placeat ratione porro voluptate odit
            //           minima.
            //         </p>
            //       </MDBTabPane>
            //       <MDBTabPane tabId="3">
            //         <p>
            //           Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            //           Nihil odit magnam minima, soluta doloribus reiciendis
            //           molestiae placeat unde eos molestias. Quisquam aperiam,
            //           pariatur. Tempora, placeat ratione porro voluptate odit
            //           minima.
            //         </p>
            //         <p>
            //           Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            //           Nihil odit magnam minima, soluta doloribus reiciendis
            //           molestiae placeat unde eos molestias. Quisquam aperiam,
            //           pariatur. Tempora, placeat ratione porro voluptate odit
            //           minima.
            //         </p>
            //       </MDBTabPane>
            //       <MDBTabPane tabId="4">
            //         <p>
            //           Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            //           Nihil odit magnam minima, soluta doloribus reiciendis
            //           molestiae placeat unde eos molestias. Quisquam aperiam,
            //           pariatur. Tempora, placeat ratione porro voluptate odit
            //           minima.
            //         </p>
            //       </MDBTabPane>
            //     </MDBTabContent>
            //   </MDBContainer> */}