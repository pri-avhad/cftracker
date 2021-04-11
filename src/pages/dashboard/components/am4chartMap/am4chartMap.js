import React, { Component } from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import cities from './mock';
import am4geodata_worldIndiaHigh from "@amcharts/amcharts4-geodata/indiaHigh";

import AnimateNumber from 'react-animated-number';
import s from './am4chartMap.module.scss';
  
  class Am4chartMap extends Component {
  
    componentDidMount() {
      let map = am4core.create("map", am4maps.MapChart);
      map.geodata = am4geodata_worldIndiaHigh;
      map.percentHeight = 100;
      map.percentWidth = 100;
      map.projection = new am4maps.projections.Miller();
      let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;
      map.homeZoomLevel = 0.2;
      let polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}";
      polygonTemplate.fill = am4core.color("#2F3461");
      polygonTemplate.stroke = am4core.color("#474C84")
      let hs = polygonTemplate.states.create("hover");
      hs.properties.fill = am4core.color("#2F3461");
      let citySeries = map.series.push(new am4maps.MapImageSeries());
      citySeries.data = cities;
      citySeries.dataFields.value = "size";
      let city = citySeries.mapImages.template;
      city.nonScaling = true;
      city.propertyFields.latitude = "latitude";
      city.propertyFields.longitude = "longitude";
      let circle = city.createChild(am4core.Circle);
      circle.fill = am4core.color("#e3f6f0");
      circle.strokeWidth = 0;
      let circleHoverState = circle.states.create("hover");
      circleHoverState.properties.strokeWidth = 1;
      circle.tooltipText = '{tooltip}';
      circle.propertyFields.radius = 'size';
      this.map = map;
    }

  componentWillUnmount() {
    if(this.map) {
      this.map.dispose();
    }
  }

  render() {
    return (
      <div className={s.mapChart}>
        <div className={s.stats}>
          <h6 className="mt-1">Average monthly footprint</h6>
          <p className="h3 m-0">
            <span className="mr-xs fw-normal">
              <AnimateNumber
                value={46.667}
                initialValue={0}
                duration={1000} 
                stepPrecision={0}
                formatValue={n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              /></span>
            kg <i className="fa fa-fire" />
          </p>
        </div>
        <div className={s.map} id="map">
          <span>Alternative content for the map</span>
        </div>
      </div>
    );
  }
}

export default Am4chartMap;