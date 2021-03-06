import React from 'react';
import Modal from 'react-modal';
import BaseModal from './BaseModal';
import FormContainer from '../containers/FormContainer'
import '../foundation.css';
import {Button, Row, Column} from 'react-foundation';

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
class AddHikeModal extends BaseModal {

  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: true,
    };

  }

// override the BaseModals behavior so that the user can click on 'Add Hike' again if they close the AddHikeModal by clicking outside of the modal. This way 'modalIsOpen' for AddHikeModal will always be true so it can be shown whenever the 'Add hike' button is clicked
  closeModal() {
    this.props.hideModalFromAddHike();
  }



// pass FormContainer fetchHikes so that it can pass it to Form to call the Map components fetchHikesFromApi function when the form is submitted
// pass FormContainer hideModalFromAddHike so that it can close the AddHikeModal
// pass FormContainer whichForm = 'add' so that it will render Form.js not EditForm.js
  render() {

    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
         <h1 className="addh2"> Add a hike </h1>
          <FormContainer
            fetchHikes={this.props.fetchHikes}
            hideModalFromAddHike={this.props.hideModalFromAddHike}
            whichForm={'add'}/>
          <Row>
            <Column large={12}>
              <Button className='redButton hoverGrey'onClick={this.props.hideModalFromAddHike}>Cancel</Button>
            </Column>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default AddHikeModal
