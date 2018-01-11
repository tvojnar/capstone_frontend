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

    // Set an inital lat and lng so that the map can be rendered around the Seattle Area
    // nameEntered is changed to true when the user sets a pin manually or via geocoding
    // nameEntered is used to tell the map if it should render a pin
    // nameEntered is also used in BaseForm (superclass of Form) to determine if the name, lat, and lng in the form should be set via state passed from the FormContainer. In other words only once a user sets a pin will the Form populate it's name, lat, and lng state.
    // hikeName is the prop passed to Form to populate the name field in Form (when nameEntered === true)
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

  // this function is passed as props to SetPinForm so it can call it when the form is submitted
  // it sets this.name as the name passed from SetPinForm
  // getCoordinates will set this.lat and this.lng and toggle this.nameEntered to true so that a pin will show up on the map and state will be modified in Form
  setName(name) {
    console.log('in setName and name is:');
    console.log(name);
    // this will update this.state.name is Form since hikeName is passed to Form via props
    this.setState({hikeName: name})
    this.getCoordinates(name);
  }

  // this function is passed as props to LatLngSetPinForm so it can call it when the form is submitted
  // it sets the state for hikeName, lat and lng and also toggles nameEntered to true so that a pin will show up on the map and state will be modified in Form
  setLatLng(name, lat, lng) {
    console.log('in setLatLng');
    console.log(name);
    console.log(typeof lat);
    console.log(typeof lng);
    this.setState({
      hikeName: name,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      nameEntered: true,
      error: false,
      errorMessage: '',
    })
  }

  // this function is used to toggle this.manualEnter between true and false
  // when this.manualEnter === true LatLngSetPinForm is rendered along with a button to switch back to entering a name to set the pin
  // // when this.manualEnter === false SetPinForm is rendered along with a button to switch to manually entering a lat and lng
  // clicking on these buttons is what triggers the setManualEnter function below
  setManualEnter() {
    this.setState({
      manualEnter: !this.state.manualEnter,
    })
  } // setManualEnter


  // this function is called via this.setName() when the user submits the SetPinForm
  // it makes a GET request to the google maps geocoding API to get the lat and lng of the name the user entered in the SetPinForm
  getCoordinates(hikeName) {
    const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    const apiKey = 'AIzaSyD6xT_duuOpLAzZEE-yHY1l7do810TIL_8';
    console.log(apiKey);
    const url = baseUrl + hikeName + '&key' + apiKey;
    const encodedUrl = encodeURI(url);

    //
    // console.log('encoded url: ');
    // console.log(encodedUrl);

    const setErrorState = () => {
      this.setState({
        error: true,
        errorMessage: 'Unable to access Google at this time to find the location of your hike. Please click the button below to manually enter the lat and lng of your hike'
      })
    } // setErrorState


    $.ajax({
      url: encodedUrl,
      dataType: 'json',
      cache: false,
      success: function(data){
        // when the call the the api is successful set this.lat and this.lng and toggle nameEntered to true so that the map will render a pin and state for the name, start_lat and start_lng will be updated in Form.js
        console.log('successful api call to geocode!');
        console.log(data);
        if (data[0]) {
          // console.log('in if in geocode ajax call');
          // console.log(data.results[0].geometry.location.lat);
          // console.log(data.results[0].geometry.location.lng);
          let geoLat = data.results[0].geometry.location.lat
          let geoLng = data.results[0].geometry.location.lng
          this.setState({
            lat: geoLat,
            lng: geoLng,
            nameEntered: true,
            error: false,
            errorMessage: '',
          })
          // TODO: handle when there are no results
        } else {
          this.setState({
            error: true,
            errorMessage: 'No hike was found for that name. Try adding more details, like a state or county, or click the button below to manually enter the starting lat and lng for your hike.'
          })
        } // if/else
      }.bind(this), // success
      error: function(xhr, status, err) {
        console.log('in error');
        console.log(err);
        // TODO: handle when the API call did not work
        setErrorState();
      } // error
    }); // get request
  } // getCoordinates


  // pass the Form a method to close the AddFormModal via props (hideFormModal)
  // pass Form fetchHikes so that it can call the Map components fetchHikesFromApi function when the form is submitted
  render() {

    // if this.manualEnter is true either render the SetPinForm so that the user can enter a name and use geocoding to set the pin for the hike
    // if this.manualEnter is false render the LatLngSetPinForm so that the user can manually enter a lat and lng to set the pin for the hike
    let button;
    let pinForm;
    if (this.state.manualEnter) {
      button= <button onClick={this.setManualEnter}>Use name to set pin</button>
      pinForm = <LatLngSetPinForm setLatLng={this.setLatLng}/>
    } else {
      button= <button onClick={this.setManualEnter}>Set lat and lng manually</button>
      pinForm= <SetPinForm setName={this.setName}/>
    }

    // if there was an error in the api call to geocode (either the api call failed or no results were returned) then render a <p> with an error message for the user
    let displayErrorMessage;
    if (this.state.error) {
      displayErrorMessage = <h5>{this.state.errorMessage}</h5>
    }

    // return
    // 1. A form for the user to set the pin for the hike
    // 2. a map so show the pin on
    // 3. A form with all the details for the hike. This form is what is submitted to the backend API to add a hike to the DB.
    return (
      <div>
      {displayErrorMessage}
      {pinForm}
      {button}
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
