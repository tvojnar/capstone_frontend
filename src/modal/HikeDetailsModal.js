import React from 'react';
import $ from 'jquery';
import Modal from 'react-modal';
import BaseModal from './BaseModal';
import { TextHikeDetailsContainer } from '../containers/TextHikeDetailsContainer';
import { HikeAttributes } from '../components/HikeAttributes';
import MapHikeDetails from '../components/MapHikeDetails';
import FormContainer from '../containers/FormContainer';
import '../foundation.css';
import {Button} from 'react-foundation';
import '../App.css';

// sets the portion of the app that should be hidden
Modal.setAppElement('#root');
const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '40px',
    left                       : '40px',
    right                      : '40px',
    bottom                     : '40px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'

  }
};

// SuccessModal is a child class of BaseModal
class HikeDetailsModal extends BaseModal {
  constructor(props) {
    super(props)

    // set the initial state
    this.state = {
      modalIsOpen: true,
      hike: {},
    }

    this.toggleEditForm = this.toggleEditForm.bind(this);
    this.fetchHikeDetailsFromApi = this.fetchHikeDetailsFromApi.bind(this);
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = 'green';
  }


  closeModal() {
    // make the modal dissapear
    this.setState({modalIsOpen: false});
    // make the HikeInfoWindow close as well
    this.props.closeInfoWindow();
    // rerender the map when the modal closes to update the map incase a patch request was made in the EditForm in the modal
    this.props.fetchHikes();
  }

  // wait to make the fetch to the API until the component will mount (could also do this in componentDidMount)
  componentWillMount() {
    // Call the function that makes the api call
    this.fetchHikeDetailsFromApi();
  }

  fetchHikeDetailsFromApi() {
    // make the api call to get hike details
    const hikeId = this.props.id
    // const baseUrl = 'http://capstone-env.ejfznpwqha.us-west-2.elasticbeanstalk.com/api/hikes/'
    const baseUrl = '/api/hikes/';
    const url = baseUrl + `${hikeId}`

    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data){
        console.log('successful show api call!');
        console.log(data);
        // set this.state.hikes to be equal to the data for all of the hikes within the maps bounds
        this.setState({ hike: data })
        // QUESTION: Should I have a message to the user appear when there are no hikes in the boundaries of the map?
      }.bind(this), // success
      error: function(xhr, status, err) {
        console.log('in error');
        console.log(err);
        // TODO: Display error message that the api call did not work.
      } // error
    }); // get request
  }

  // toggles if the editForm is show
  // clicking the 'Edit hike details' button toggles to true
  // clicking the 'cancle' button toggles to false again
  toggleEditForm() {
    this.setState({showEditForm: !this.state.showEditForm})
  }

  render() {

      // IF THE API HAS RETURNED THE DATA FOR THE HIKES DETAILS
      if (Object.keys(this.state.hike).length !== 0) {
        // set hikeDetails to the data object with the hike details that was returned from the API
        const hikeDetails = this.state.hike;


        let whatToRender;
        if (this.state.showEditForm) {
          // the editForm will replace all of the hike details when the 'Edit hike details' buttomn is clicked
            // only the edit form will be rendered in the modal!

          // pass hikeState to FormContainer so that it can be passed to EditForm, hikeState will be added to EditForms state via the ComponentWillMount function in BaseForm so that the current details of the hike can be shown in the EditForm
          // passing hikeState to FormContainer will trigger FormContainer to pass detailsToSetPin to SetPinForm and LatLngSetPinForm so that the name and pin for the hike will be shown in them and on the SetPinMap
          console.log('in HikeDetailsModal render and hikeDetials is: ');
          console.log(hikeDetails);
          console.log(hikeDetails.image_url);

          whatToRender =
            <div>
              <h2 className='greenUnderline'>{hikeDetails.name}</h2>
              <h4>Edit hike details: </h4>
              <FormContainer
                hikeState={hikeDetails}
                fetchHikes={this.props.fetchHikes}
                fetchHikeDetails={this.fetchHikeDetailsFromApi}
                hideEditForm={this.toggleEditForm}
                whichForm={'edit'}/>
              <button className='hoverGrey redBUtton' onClick={this.toggleEditForm}>Cancle</button>
          </div>
        }
        else {
            let image;
             if (hikeDetails.image_url) {
               image = <div >
                 <img src={hikeDetails.image_url} className='coverImage'/>
               </div>
             }
          // else the modal will show all of the hike's details
            whatToRender =
            <div>
              <h2 className='greenUnderline'>{hikeDetails.name}</h2>
              {image}
              <div className='topMargin'>
                <HikeAttributes hikeData={hikeDetails}/>
              </div>
              <div>
              <TextHikeDetailsContainer hikeData={hikeDetails}/>
              </div>
              <MapHikeDetails
                onRef={ref => (this.child = ref)}
                lat={hikeDetails.start_lat}
                lng={hikeDetails.start_lng}/>
              <Button className='yellowButton hoverGrey alignLeft rightMargin' onClick={this.toggleEditForm}>Edit hike details</Button>
              <Button className='hoverGrey redButton' onClick={this.closeModal}>close</Button>
          </div>
        }


        // return a modal
        // in the modal there is:
            // 1. The name of the hike
            // 2. The attributes of the hike (which are rendered in the HikeAttributes component )
            // 3. A map with A pin where the hike is
                  // NOTE: Have to set onRef={ref => (this.child = ref)} for the map to mount and unmount correctly
                  // pass the start_lng and start_lat to the map so that the map can be centered on the location of the hike
            // 4. The hikes description and notes via the TextHikeDetailsContainer
        return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {whatToRender}
        </Modal>
      </div>
    ); // return
  }
  // IF THE API HAS NOT RETUNED THE DATA FOR THE HIKES DETAILS YET
  // we won't have access to the hike's details yet, so we should just render some text in an h2
  else {
    // just return a modal with an <h2> that says 'loading ...'
    return (
  <div>
    <Modal
      isOpen={this.state.modalIsOpen}
      onAfterOpen={this.afterOpenModal}
      onRequestClose={this.closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h2>loading ...</h2>
      <button onClick={this.closeModal}>close</button>
    </Modal>
  </div>
); // return
  }
  } // render
} // HikeDetailsModal

export default HikeDetailsModal
