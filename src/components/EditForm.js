import $ from 'jquery';
// import React from 'react';
import BaseForm from './BaseForm';

// using valueLink library to connect form fields with the components state. Also used to provide inline error handing for invalid fields in the form

// EditForm is a child class of BaseForm
// Form is also a child class of BaseForm
class EditForm extends BaseForm {

  constructor(props) {
    super(props);

    // Set the state using the default props
    this.submitForm = this.submitForm.bind(this);
}

  submitForm() {
    console.log('in submit editForm');


    // construct the data to send to the API
    const hikeParams = {
      hike: this.state
    };

    const callMethodsInHikeDetails = () => {
      this.props.fetchHikeDetails();
      this.props.hideEditForm();
    }

    console.log(this.state.id);
    // construct the url to submit the patch request to
    const baseUrl = 'http://scrappyhikerapi.com/api/hikes/';
    // NOTE: below is the url I used before getting my domain name
    // const baseUrl = 'http://capstone-env.ejfznpwqha.us-west-2.elasticbeanstalk.com/api/hikes/'
    const url = baseUrl + `${this.state.id}`

    // make the API patch request to the API
    $.ajax({
      url: url,
      type: 'PATCH',
      data: hikeParams,
      success: function(data){
        console.log('successful patch');
        console.log(data);
        // TODO: call the GET in the HikeDetailsModal to reload the hikes data
        // TODO: remove the editForm and show the button again
        callMethodsInHikeDetails();

      },
      error: function(xhr, status, err) {
        console.log('in error');
        console.log(this);
      } // error
    }) // patch
  } // submitForm

  // render function is definded in the parent class (BaseForm)

  } // form

export default EditForm
