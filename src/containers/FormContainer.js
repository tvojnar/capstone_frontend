import React, {Component} from 'react';
import $ from 'jquery';
import Form from '../components/Form';
import { MapAddHike } from '../components/MapAddHike';
import SetPinForm from '../components/SetPinForm';




// FormContainer is rendered by AddHikeModal and HikeDetailsModal
// FormContainer renders all of the components that make up the form to add or edit a hike
class FormContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      lat: 47.6062,
      lng: -122,
      enteredName: false,
      hikeName: '',
    };


    this.setName = this.setName.bind(this);
  }

  // this function is called by SetPinForm when it is submitted
  setName(name) {
    console.log('in setName and name is:');
    console.log(name);
    // this will update this.state.name is Form since hikeName is passed to Form via props
    this.setState({hikeName: name})
    this.getCoordinates(name);
  }


  getCoordinates(hikeName) {
    const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
    const apiKey = 'AIzaSyDCte77X-YyyMzwq0o2xqO0BD77hqy7ekM'
    console.log(apiKey);
    const url = baseUrl + hikeName + '&key' + apiKey
    const encodedUrl = encodeURI(url);


    console.log('encoded url: ');
    console.log(encodedUrl);


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
              enteredName: true,
            })
          console.log('state: ');
          console.log(this.state.lat);
          console.log(this.state.lng);
          console.log(this.state.enteredName);

        }
  }.bind(this), // success
      error: function(xhr, status, err) {
        console.log('in error');
        console.log(err);
        // TODO: Display error message that the api call did not work.
      } // error
    }); // get request


  } // getCoordinates
// pass the Form a method to close the AddFormModal via props (hideFormModal)
// pass Form fetchHikes so that it can call the Map components fetchHikesFromApi function when the form is submitted
render() {
  console.log('in render for MapAddModal and name is:');
  console.log(this.state.hikeName);
  return (
    <div>
    <SetPinForm setName={this.setName}/>
    <MapAddHike
    lat={this.state.lat}
    lng={this.state.lng}
    enteredName={this.state.enteredName}
    zoom={12}/>
    <Form
    hideFormModal={this.props.hideModalFromAddHike}
    fetchHikes={this.props.fetchHikes}
    hikeName={this.state.hikeName}
    />
    </div>
  );
}
}

export default FormContainer
