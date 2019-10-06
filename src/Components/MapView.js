import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import MapGL,  { Popup, Marker }  from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";

const mapStyle = {
  height: '100vh',
  paddingBottom:'10%',
  paddingTop: '2%',
  marginLeft: '10%',
  marginRight: '10%'
}

const popupStyle = {
  background: '#'
}
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 11,
      },
      events: {
        event1: {
          id: 1,
          name: 'Event 1',
          latitude: 37.7567,
          longitude: -122.4456
        }, 
        event2: {
          id: 2,
          name: 'Event 2',
          latitude: 37.7577,
          longitude: -122.4446
        }, 
        event3: {
          id: 3,
          name: 'Event 3',
          latitude: 37.7652,
          longitude: -122.4356
        }, 
        event4: {
          id: 4,
          name: 'Event 4',
          latitude: 37.7557,
          longitude: -122.4256
        }
      },
      searchResultLayer: null,
      showPopup: true,
      event: "My Event"
    };
  }
  
  mapRef = React.createRef();

  showDetails = (eventID) => {
    console.log(eventID)
  }

  markerClicked = () => {
    this.setState({
      event: "EVENT!!"
    });
  }

  markerLeft = () => {
    this.setState({
      event: "My Event"
    });
  }

  createEvents = () => {
    const items = []
    let event_list = this.state.events
    for (let x in event_list) {
      items.push(<Popup 
        latitude={event_list[x].latitude}
        longitude={event_list[x].longitude}   
        anchor = "top"
        style = {popupStyle}>
        <div onMouseOver={this.markerClicked} onMouseLeave={this.markerLeft} onClick={() => this.showDetails(event_list[x].name)}> H </div></Popup>)
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
          minZoom = "8"
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
        </MapGL>
      </div>
    );
  }
}

export default MapView;
