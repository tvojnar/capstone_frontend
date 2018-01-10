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
    console.log(this.state.id);
    // construct the url to submit the patch request to
    const url = `/api/hikes/${this.state.id}`

    // construct the data to send to the API
    const hikeParams = {
      hike: this.state
    };


    // make the API patch request to the API
    $.ajax({
      url: url,
      type: 'PATCH',
      data: hikeParams,
      success: function(data){
        console.log('successful patch');
        console.log(data);

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
