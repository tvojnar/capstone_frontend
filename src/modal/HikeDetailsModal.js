import React from 'react';
import Modal from 'react-modal';
import BaseModal from './BaseModal'

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



  render() {
    // hikeData was passed via props from HikeInfoWindow
    const hikeData = this.props.hikeData;

    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>{hikeData.name}</h2>
          
          <button onClick={this.closeModal}>close</button>
        </Modal>
      </div>
    );
  }
}

export default HikeDetailsModal
