import React from 'react'
import HikeInfoWindow from './HikeInfoWindow'

export const TextHikeDetails = (props) => {
  // pull out the hike data from the props passed from TextHikeDetailsContainer
  const data = props.data


  return(
    <div>
      <h3>{data.title}</h3>
      <p>{data.text}</p>
      <button>Edit {data.title}</button>
    </div>
  )
} //
