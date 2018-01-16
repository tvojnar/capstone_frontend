import React, { Component } from 'react';
import AddHikeModal from '../modal/AddHikeModal';
import {Button, Colors} from 'react-foundation';
import '../App.css';
import '../foundation.css';



// To start off AddHike only renders the 'Add hike' button
// when the 'add hike button is clicked it changes the showModal state to true, which triggers {modal} to be rendered
// {modal} is an instance of AddHikeModal
export class AddHike extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: true,
      showModal: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);
  }

  handleClick() {
    console.log('in handleClick');
    this.setState({showModal: true})

  }

  handleHideModal() {
    console.log('in handleHideModal');
    this.setState({showModal: false})
  }

  render() {
    // pass AddHikeModal the function to close the modal via props (hideModalFromAddHike)
    // pass AddHikeModal fetchHikes prop so that it can pass it to the Form component so that when the form is submitted it calls the fetchHikesFromApi function in the Map component so that the newly added hike will imidiatly show up on the map
    let modal;
    if (this.state.showModal) {
      modal = <AddHikeModal
      hideModalFromAddHike={this.handleHideModal}
      fetchHikes={this.props.fetchHikes}/>
    }


    return (
      <div>
        { modal }
        <Button className='greenButton hoverGrey' onClick={this.handleClick}>AddHike</Button>
      </div>
    )
  }

} // AddHike
