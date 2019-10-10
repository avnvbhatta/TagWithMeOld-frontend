import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import ReactMapGL, { Popup, Marker } from "react-map-gl";
import Event from "../Helpers/Event";
import "./Styles/styles.mapview.css";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: "100%",
        height: "85vh",
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 11
      },
      userLocation: {},
      events: [],
      selectedEvent: null,
      searchResultLayer: null
    };

    this.setUserLocation = this.setUserLocation.bind(this);
  }

  async componentDidMount() {
    await this.setUserLocation();
    await this.getEvents();
  }

  async getEvents() {
    let event = new Event();
    let event_list = await event.getEvent(this.state.userLocation);
    this.setState({
      events: event_list,
      dataLoaded: true
    });
  }

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  };

  getPosition() {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  }

  async setUserLocation() {
    var position = await this.getPosition(); // wait for getPosition to complete
    let setUserLocation = {
      lat: position.coords.latitude,
      long: position.coords.longitude
    };
    let newViewport = {
      width: "100%",
      height: "85vh",
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      zoom: 10
    };
    this.setState({
      viewport: newViewport,
      userLocation: setUserLocation
    });
  }

  setHoveredEvent = object => {
    this.setState({
      selectedEvent: object
    });
  };

  closePopup = () => {
    this.setState({
      selectedEvent: null
    });
  };

  mapRef = React.createRef();

  loadEventMarkers = () => {
    return this.state.events.map(event => {
      return (
        <Marker
          key={event.id}
          latitude={parseFloat(event._embedded.venues[0].location.latitude)}
          longitude={parseFloat(event._embedded.venues[0].location.longitude)}
        >
          <img
            className="icon"
            onMouseOver={() => {
              this.setHoveredEvent(event);
            }}
            onMouseLeave={this.closePopup}
            src="/Images/icon-sport.svg"
            alt=""
          />
        </Marker>
      );
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
    return (
      <div className="mapStyle">
        <img className="icon" onClick={this.setUserLocation} src="/Images/icon-locate.svg"></img>
        <ReactMapGL
          ref={this.mapRef}
          {...this.state.viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={this.handleViewportChange}
        >
          <Geocoder
            mapRef={this.mapRef}
            onResult={this.handleOnResult}
            onViewportChange={this.handleGeocoderViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            position="top-left"
          />
          <DeckGL {...this.state.viewport} layers={[this.state.searchResultLayer]} />
          {Object.keys(this.state.userLocation).length !== 0 ? (
            <Marker
              latitude={this.state.userLocation.lat}
              longitude={this.state.userLocation.long}
            >
              <img className="icon" src="/Images/user-location.svg"></img>
            </Marker>
          ) : (
            <div>Empty</div>
          )}
          {this.loadEventMarkers()}
          {this.state.selectedEvent !== null ? (
            <Popup
              latitude={parseFloat(this.state.selectedEvent._embedded.venues[0].location.latitude)}
              longitude={parseFloat(this.state.selectedEvent._embedded.venues[0].location.longitude)}
            >
              <div
                style={{ width: "200px", height: "125px", textAlign: "center" }}
              >
                <img
                  className="eventImage"
                  src={this.state.selectedEvent.images[3].url}
                  alt=""
                />
                <p>{this.state.selectedEvent.name}</p>
              </div>
            </Popup>
          ) : null}
        </ReactMapGL>
      </div>
    );
  }
}

export default MapView;
