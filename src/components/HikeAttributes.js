import React, { Component } from 'react';
import { HikeLocation } from './HikeLocation';
import { HikeLength } from './HikeLength';
import { HikeElevation } from './HikeElevation';
import { HikeFeatures } from './HikeFeatures';
import '../foundation.css';
import {Button, Colors, Row, Column, Alignments, Menu} from 'react-foundation';
import '../App.css';


// use this component to render the Location, Length, and Elevation components
export class HikeAttributes extends Component {

  render() {
    console.log('in HikeAttributes and miles are:');
    console.log(this.props.hikeData.miles);
    // this component returns:
        // 1. The HikeLocation component which show the region that the hike is in
        // 2. The Length component which shows how many miles the hike is
    return (
    <div>
      <Row upOnSmall={1} upOnMedium={4} upOnLarge={4} alignment={Alignments.CENTER}>
      <Column isColumn>
      <HikeLocation region={this.props.hikeData.region}/>
      </Column>
      <Column isColumn>
      <HikeLength miles={this.props.hikeData.miles}/>
      </Column >
      <Column isColumn>
      <HikeElevation
            maxElevation={this.props.hikeData.max_elevation}
            elevationGain={this.props.hikeData.elevation_gain}
      />
      </Column>
      <Column isColumn>
      <HikeFeatures hikeData={this.props.hikeData}/>
      </Column>
      </Row>
    </div>
    )
  } // render
} // HikeAttributes
