import React from 'react';
import $ from 'jquery';
import Modal from 'react-modal';
import BaseModal from './BaseModal';
import { TextHikeDetailsContainer } from '../containers/TextHikeDetailsContainer';
import { HikeAttributes } from '../components/HikeAttributes';
import MapHikeDetails from '../components/MapHikeDetails';

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
      hike: '',
    }
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = 'green';
  }


  closeModal() {
    // make the success modal dissapear
    this.setState({modalIsOpen: false});
    // make the HikeInfoWindow close as well
    this.props.closeInfoWindow();
  }

  componentWillMount() {
    // super.componentWillMount();
    // Call the function that makes the api call
    this.fetchHikeDetailsFromApi()
  }

  fetchHikeDetailsFromApi() {
    // make the api call to get hike details
    const hikeId = this.props.id
    $.ajax({
      url: `/api/hikes/` + `${hikeId}`,
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

  render() {
    console.log('in HikeDetailsModal render');
    // hikeData was passed via props from HikeInfoWindow
    // const hikeData = this.props.hikeData;

    const hikeDetails = this.state.hike;

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

          <h2 ref={subtitle => this.subtitle = subtitle}>{hikeDetails.name}</h2>
          <HikeAttributes hikeData={hikeDetails}/>
          <MapHikeDetails onRef={ref => (this.child = ref)} lat={hikeDetails.start_lat} lng={hikeDetails.start_lng}/>
          <TextHikeDetailsContainer hikeData={hikeDetails}/>
          <button onClick={this.closeModal}>close</button>
        </Modal>
      </div>
    );
  }
}

export default HikeDetailsModal
