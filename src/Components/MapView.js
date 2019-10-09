import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import MapGL,  { Popup, Marker }  from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
import axios from "axios";
import Event from "../Helpers/Event"
import "./Styles/styles.mapview.css"

const mapStyle = {
  height: '100vh',
  paddingBottom:'10%',
  paddingTop: '2%',
  marginLeft: '10%',
  marginRight: '10%'
}

const eventDetailStyle = {
  height: '10%',
  display: 'block',
  width: '10%',
  marginLeft: '35%',
  marginRight: '35%'
}

const popupStyle = {
  background: '#'
}
const MAPBOX_TOKEN = "pk.eyJ1IjoiYXZudmJoYXR0YSIsImEiOiJjazE2cHkza3MwMTlmM2hvY2k0dGZoaXgzIn0.T_Vdh6BWjH_Ie3HUrTI8sQ";
const TICKETMASTER_TOKEN = process.env.REACT_APP_TICKETMASTER_API_KEY;

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLatLong: "",
      minZoom: 11,
      viewport: {
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 11,
      },
      events: [],
      searchResultLayer: null,
      showPopup: true,
      showDetail: false,
      eventDetails: <div className="group"> </div>
    };
    this.getLocation =  this.getLocation.bind(this)
    this.getEvents = this.getEvents.bind(this)
  }
  
  mapRef = React.createRef();

  componentDidMount(){
    this.getLocation();
    this.getEvents();
    

  }

  getLocation(){
    navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
            userLatLong: position.coords.latitude+","+position.coords.longitude
        })
    });
  }

  async getEvents(){
    let event = new Event();
    let eventList = []
    let res = await event.getEvent(this.state.userLatLong)
    this.setState({
      events: res
    })
  }



  
  showDetails = (event) => {
    this.state.eventDetails = <div className="group">
          <ul className="events">
          <li> <strong> Event </strong></li>
           <li> <span>{event.name}</span> </li>
          <li> <span>{event._embedded.venues[0].name}</span> </li>
          <li> <img src = {event.images[1].url}></img> </li>
          </ul>
        </div> 
  }

  markerHover = () => {
    this.setState({
      showDetail: true
    });
  }

  markerLeft = () => {
    this.setState({
      showDetail: false
    });
  }

  handleClick = (e) => {
    console.log()
  }

  createEvents(){
    console.log('here')
    const items = []
    let event_list = this.state.events
    console.log(event_list)
    for (let x in event_list) {
      console.log(x)
      
      items.push(<Popup 
        key = {event_list[x].id}
        latitude={parseInt(event_list[x]._embedded.venues[0].location.latitude)}
        longitude={parseInt(event_list[x]._embedded.venues[0].location.longitude)}   
        anchor = "top"
        style = {popupStyle}>
        <div id={event_list[x].id} onMouseOver={() => this.showDetails(event_list[x])} onMouseLeave={this.markerLeft}> H </div></Popup>)
        
    } 
      return items
  }

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  };

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

  handleOnResult = event => {
    this.setState({
      searchResultLayer: new GeoJsonLayer({
        id: "search-result",
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10
      })
    });
  };

  render() {
    const { viewport, searchResultLayer } = this.state;

    return (
      <div style={mapStyle}>
        <MapGL
          ref={this.mapRef}
          {...viewport}
          width="100%"
          height="100%"
          minZoom = {this.state.minZoom}
          onViewportChange={this.handleViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          <Geocoder
            mapRef={this.mapRef}
            onResult={this.handleOnResult}
            onViewportChange={this.handleGeocoderViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            position="top-left"
          />
          <DeckGL {...viewport} layers={[searchResultLayer]} />
         {this.createEvents()}
         {this.state.showDetail && this.state.eventDetails}
        </MapGL>
      </div>
    );
  }
}

export default MapView;
