import React from 'react'

export const TextHikeDetails = (props) => {
  // pull out the hike data from the props passed from TextHikeDetailsContainer
  const data = props.data


  return(
    <div className='details'>
    <h4>{data.title}</h4>
    <p className='textForDetails'>{data.text}</p>
    </div>
  )
} //
