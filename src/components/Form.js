import $ from 'jquery';
import BaseForm from './BaseForm';

// this is the form that the the user enters all the hikes details in
// the state of Form is what is submitted to the API to create a new hike
class Form extends BaseForm {

  constructor(props) {
    super(props);

    // Set the state using the default props
    this.submitForm = this.submitForm.bind(this);
    this.finalSubmit = this.finalSubmit.bind(this);
    this.generateImageUrl = this.generateImageUrl.bind(this);
  }





  //TODO: change this name to submit form!!!
  generateImageUrl() {
    // function to upload image


    // const callActualSubmit = () => {
    //   console.log('in callActualSubmit');
    //   this.finalSubmit();
    // } // callActualSubmit

    const setUrlToState = (url) => {
      console.log('in setUrlToState');
      this.setState({
        coverImageUrl: url,
      })
    }


    const upload_image = (presignedUrl) => {
      console.log('in upload_image');
      const file = this.state.file;

      // THIRD: upload the image file to S3 using the presigned url
      $.ajax({
        type : 'PUT',
        url : presignedUrl,
        data : file,
        processData: false,  // tell jQuery not to convert to form data
        // headers: { 'Content-Type': file.type, 'x-amz-acl': 'public-read' },
        headers: { 'Content-Type': file.type},
        success: function(json) {
          console.log('Upload complete!');
          setUrlToState(file.name);
        }.bind(this),
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log('Upload error: ' + XMLHttpRequest);
          console.log(errorThrown);
          console.log(XMLHttpRequest);
        }
      }); // ajax
    } // upload_image

    // generate a presignedUrl by making an api call to the backend

    console.log('generating the presignedUrl and file is: ');
    console.log(this.state.file);

    // get the file from state;
    const file = this.state.file;

    // if there is a file then generate a presignedUrl by making a call to the Rails API:
    if (file !== null ) {
      // clean the filename to remove any characters that S3 doesn't like
      let cleanFileName = file.name.toLowerCase().replace(/[^a-z0-9/g,""]/);

      // TODO: make a method to add the url for the image to state (the one that can be used to see the image on s3)


      // FIRST:  make a call to the rails API (Images#index) to get a presignedUrl from S3
      const apiUrl = '/api/images'

      $.getJSON(apiUrl, {filename: file.name, content_type: file.type},
        function(data) {
          console.log('we got the url!');
          console.log(data['url']);
          // SECOND: call upload_image, passing it the presigned url from the rails API
          // TODO: upload the image and set the url of the uploaded image to state from within the success callback of upload image. Have the submit of the form be a callback function to upload_image
          upload_image(data['url'])
        }
      ); // getJSON
    }

    // const add_url_to_state = (presignedUrl) => {
    //   this.setState({presignedUrl: presignedUrl})
    //   console.log('after setState presignedUrl is:');
    //   console.log(this.state.presignedUrl);
    // }


  } // generateImageUrl;

  finalSubmit() {

    // this.trimState( this.submitForm() )


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
    // const url = 'http://capstone-env.ejfznpwqha.us-west-2.elasticbeanstalk.com/api/hikes'
    const url = '/api/hikes'

    // TODO: need to make the post request a call back function here so that the image is uploaded so that the url of the image can be passed with the state to the post. I will have the image url be an attribute of Hike as a cover image to keep it simple right now.

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

  } // finalSubmit

  submitForm() {
    this.generateImageUrl(this.finalSubmit());
  }


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
