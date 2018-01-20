import React, { Component } from 'react';

export class HikeFeatures extends Component {
  render() {
    // NOTE: the way I am displaying which features are displayed is not DRY, but I can't off the bat think of a good way to clean this up since the name of the prop is not always what I want to appear on the page...

    // define hikeData from props
    const hikeData = this.props.hikeData;

    // declare all the variables for the features
    let lakes, coast, rivers, waterfalls, meadows, wildflowers, fallFoliage, oldGrowth, mountainViews, summits, establishedCampsites, dayHike, overnight;


    // if the hike has a freature then make a <li> for that feature to be returned
    if (hikeData.lakes) {
      lakes = <li>Lakes</li>
    }

    if (hikeData.coast) {
       coast = <li>Coast</li>
    }

    if (hikeData.rivers) {
       rivers = <li>Rivers</li>
    }

    if (hikeData.rivers) {
       rivers = <li>Rivers</li>
    }

    if (hikeData.waterfalls) {
       waterfalls = <li>Waterfalls</li>
    }

    if (hikeData.fall_foliage) {
       fallFoliage = <li>Fall foliage</li>
    }

    if (hikeData.wildflowers) {
       wildflowers = <li>Wildflowers</li>
    }

    if (hikeData.meadows) {
       meadows = <li>Meadows</li>
    }

    if (hikeData.old_growth) {
       oldGrowth = <li>Old-growth</li>
    }

    if (hikeData.mountain_views) {
       mountainViews = <li>Mountain views</li>
    }

    if (hikeData.summits) {
       summits = <li>Summits</li>
    }

    if (hikeData.established_campsites) {
       establishedCampsites = <li>Established campsites</li>
    }

    if (hikeData.day_hike) {
       dayHike = <li>Day hike</li>
    }

    if (hikeData.overnight) {
       overnight = <li>Overnight</li>
    }

    return (
      <div className='hikeDetails'>
        <h4>Features</h4>
        <ul>
          {lakes}
          {coast}
          {rivers}
          {waterfalls}
          {meadows}
          {wildflowers}
          {fallFoliage}
          {oldGrowth}
          {mountainViews}
          {summits}
          {establishedCampsites}
          {dayHike}
          {overnight}
        </ul>

      </div>
    )
  }
} // HikeFeatures
