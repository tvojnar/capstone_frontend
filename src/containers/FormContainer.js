import React, {Component} from 'react';
import $ from 'jquery';
import Form from '../components/Form';
import { MapAddHike } from '../components/MapAddHike';
import SetPinForm from '../components/SetPinForm';
import LatLngSetPinForm from '../components/LatLngSetPinForm';


// FormContainer is rendered by AddHikeModal and HikeDetailsModal
// FormContainer renders all of the components that make up the form to add or edit a hike
class FormContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      lat: 47.6062,
      lng: -122,
      nameEntered: false,
      hikeName: '',
    };


    this.setName = this.setName.bind(this);
    this.setLatLng = this.setLatLng.bind(this);
    this.setManualEnter = this.setManualEnter.bind(this);
  }

  // this function is called by SetPinForm when it is submitted
  setName(name) {
    console.log('in setName and name is:');
    console.log(name);
    // this will update this.state.name is Form since hikeName is passed to Form via props
    this.setState({hikeName: name})
    this.getCoordinates(name);
  }

  setLatLng(name, lat, lng) {
    this.setState({
      name: name,
      lat: lat,
      lng: lng,
      nameEntered: true,
    })
  }

  setManualEnter() {
    this.setState({
      manualEnter: true,
    })
  } // setManualEnter


  getCoordinates(hikeName) {
    const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    const apiKey = 'AIzaSyD6xT_duuOpLAzZEE-yHY1l7do810TIL_8';
    console.log(apiKey);
    const url = baseUrl + hikeName + '&key' + apiKey;
    const encodedUrl = encodeURI(url);

    //
    // console.log('encoded url: ');
    // console.log(encodedUrl);


    $.ajax({
      url: encodedUrl,
      dataType: 'json',
      cache: false,
      success: function(data){
        console.log('successful api call to geocode!');
        console.log(data);
        if (data) {
          console.log('in if in geocode ajax call');
          console.log(data.results[0].geometry.location.lat);
          console.log(data.results[0].geometry.location.lng);

          let geoLat = data.results[0].geometry.location.lat
          let geoLng = data.results[0].geometry.location.lng
          this.setState({
              lat: geoLat,
              lng: geoLng,
              nameEntered: true,
            })
        // TODO: handle when there are no results
        }
  }.bind(this), // success
      error: function(xhr, status, err) {
        console.log('in error');
        console.log(err);
        // TODO: handle when the API call did not work
      } // error
    }); // get request
  } // getCoordinates
// pass the Form a method to close the AddFormModal via props (hideFormModal)
// pass Form fetchHikes so that it can call the Map components fetchHikesFromApi function when the form is submitted
render() {
  let manualButton;
  let pinForm;
  if (this.state.manualEnter) {
    pinForm = <LatLngSetPinForm setLatLng={this.setLatLng}/>
  } else {
    manualButton= <button onClick={this.setManualEnter}>Set lat and lng manually</button>
    pinForm= <SetPinForm setName={this.setName}/>
  }


  return (
    <div>
    {pinForm}
    {manualButton}
    <MapAddHike
      lat={this.state.lat}
      lng={this.state.lng}
      nameEntered={this.state.nameEntered}/>
    <Form
    hideFormModal={this.props.hideModalFromAddHike}
    fetchHikes={this.props.fetchHikes}
    hikeName={this.state.hikeName}
    hikeLat={this.state.lat}
    hikeLng={this.state.lng}
    nameEntered={this.state.nameEntered}
    />
    </div>
  );
}
}

export default FormContainer
