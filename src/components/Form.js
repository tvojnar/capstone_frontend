import $ from 'jquery';
import BaseForm from './BaseForm';

// this is the form that the the user enters all the hikes details in
// the state of Form is what is submitted to the API to create a new hike
class Form extends BaseForm {

  constructor(props) {
    super(props);

    // Set the state using the default props
    this.submitForm = this.submitForm.bind(this);
}

  submitForm() {

    // I have to define this function out here because I don't have access to this from within the post request error callback
    // this function calls the showModal function, which returns the ErrorModal that tells the user that the hike did not save or the SuccessModal saying that the hike was saved, depending on if modalType is 'error' or 'success'
    const callShowModal = (modalType) => {
      this.showModal(modalType);
    }

    // have to call this.props.fetchHikes(); out here because I don't have access to 'this.props' in the success callback of the post
    // this.props.fetchHikes() calls the fetchHikes function in the App component, which calls the FetchHikesFromApi function in the Map component, which will cause the map to re-render to show the newly added hike.
    const callFetchHikes = () => {
      this.props.fetchHikes();
    }


    // set the params that will be sent to the API equal to the state of the Form component
    const hikeParams = {
      hike: this.state
    };

    // clear the form by resetting the state to the initialState defined in the default props
    this.setState(this.props.initialState);

    // construct the url to submit the post request to
    const url = 'http://capstone-env.ejfznpwqha.us-west-2.elasticbeanstalk.com/api/hikes'


    // make the API post request to the API
    $.ajax({
      type: "POST",
      url: url,
      data: hikeParams,
      success: (data) => {
        console.log('successful post');
        console.log(data);
        // when the post is successful show the SuccessModal to the user
        callShowModal('success');
        // when the post is successful call this method which though a chain of props will call the fetchHikesFromApi method in the Map component
        callFetchHikes();
      },
      error: function(xhr, status, err) {
        console.log('in error');
        console.log(this);
        // if the api post fails then display a modal telling the user that there was an error
        callShowModal('error')
      } // error
    }) // post

  } // submitForm


  // displays the ErrorModal or SuccessModal, depending on if the post to add a new hike was successful or not
  showModal(modalType) {
    console.log('in renderModal');
    if (modalType === 'error') {
      this.setState({showModal: true})
    } else if (modalType === 'success'){
      this.setState({showSuccessModal: true})
    }
  } // showModal


  // render function is definded in the parent class (BaseForm)

  } // form

export default Form
