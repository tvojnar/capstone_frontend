import React from 'react'

export const TextHikeDetails = (props) => {
  // pull out the hike data from the props passed from TextHikeDetailsContainer
  const data = props.data


  return(
    <div className='details'>
      <h3 className='greenUnderline'>{data.title}</h3>
      <p >{data.text}</p>
    </div>
  )
} //
