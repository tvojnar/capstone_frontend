import React from 'react';
import $ from 'jquery';
import Modal from 'react-modal';
import BaseModal from './BaseModal';
import { TextHikeDetailsContainer } from '../containers/TextHikeDetailsContainer';
import { HikeAttributes } from '../components/HikeAttributes';
import MapHikeDetails from '../components/MapHikeDetails';
import EditForm from '../components/EditForm';
import FormContainer from '../containers/FormContainer';

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
      load: 'loading...'
    }

    this.toggleEditForm = this.toggleEditForm.bind(this);
    this.fetchHikeDetailsFromApi = this.fetchHikeDetailsFromApi.bind(this);
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = 'green';
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
    $.ajax({
      url: `/api/hikes/${hikeId}`,
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

          // pass hikeState to EditForm, which will be added to EditForms state via the ComponentWillMount function in BaseForm
          whatToRender =
            <div>
              <h2 ref={subtitle => this.subtitle = subtitle}>{hikeDetails.name}</h2>
              <h4>Edit hike details: </h4>
              <FormContainer
                hikeState={hikeDetails}
                fetchHikes={this.props.fetchHikes}
                fetchHikeDetails={this.fetchHikeDetailsFromApi}
                hideEditForm={this.toggleEditForm}
                whichForm={'edit'}/>
              <button onClick={this.toggleEditForm}>Cancle</button>
          </div>
        }
        else {
          // else the modal will show all of the hike's details
            whatToRender =
            <div>
              <h2 ref={subtitle => this.subtitle = subtitle}>{hikeDetails.name}</h2>
              <button onClick={this.toggleEditForm}>Edit hike details</button>
              <HikeAttributes hikeData={hikeDetails}/>
              <MapHikeDetails
                onRef={ref => (this.child = ref)}         lat={hikeDetails.start_lat} lng={hikeDetails.start_lng}/>
              <TextHikeDetailsContainer hikeData={hikeDetails}/>
              <button onClick={this.closeModal}>close</button>
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
      <h2 ref={subtitle => this.subtitle = subtitle}>{this.state.load}</h2>
      <button onClick={this.closeModal}>close</button>
    </Modal>
  </div>
); // return
  }
  } // render
} // HikeDetailsModal

export default HikeDetailsModal
