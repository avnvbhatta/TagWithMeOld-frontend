import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import MapGL,  { Popup, Marker }  from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
import axios from "axios";
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
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const TICKETMASTER_TOKEN = process.env.REACT_APP_TICKETMASTER_API_KEY;

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minZoom: 11,
      viewport: {
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 11,
      },
      events: {
        event1: {
          id: 'k7vGF4SEuohYL',
          name: 'Event 1',
          latitude: 37.7567,
          longitude: -122.4456
        }, 
        event2: {
          id: '1ApZA_3GkdAvSg0',
          name: 'Event 2',
          latitude: 37.7577,
          longitude: -122.4446
        }, 
        event3: {
          id: 'vvG1YZ4Ef8DM63',
          name: 'Event 3',
          latitude: 37.7652,
          longitude: -122.4356
        }, 
        event4: {
          id: 'G5ezZ4EQXF3ZT',
          name: 'Event 4',
          latitude: 37.7557,
          longitude: -122.4256
        }
      },
      searchResultLayer: null,
      showPopup: true,
      showDetail: false,
      eventDetails: <div className="group"> </div>
    };
  }
  
  mapRef = React.createRef();

  showDetails = (eventID) => {
    axios.get('https://app.ticketmaster.com/discovery/v2/events/' + eventID + '?apikey='+ TICKETMASTER_TOKEN + '&locale=*')
    .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
        this.setState({
          showDetail: true
        });
        // data._embedded.venues[0].name
        // data.name
        // data.images[1].url
        this.state.eventDetails = <div className="group">
          <ul className="events">
          <li> <strong> Event </strong></li>
           <li> <span>{res.data.name}</span> </li>
          <li> <span>{res.data._embedded.venues[0].name}</span> </li>
          <li> <img src = {res.data.images[1].url}></img> </li>
          </ul>
        </div> 
    })
    .catch((err) => {
        console.log("AXIOS ERROR: ", err);
    })
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

  createEvents = () => {
    const items = []
    let event_list = this.state.events
    for (let x in event_list) {
      items.push(<Popup 
        key = {event_list[x].id}
        latitude={event_list[x].latitude}
        longitude={event_list[x].longitude}   
        anchor = "top"
        style = {popupStyle}>
        <div id={event_list[x].id} onMouseOver={() => this.showDetails(event_list[x].id)} onMouseLeave={this.markerLeft}> H </div></Popup>)
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
