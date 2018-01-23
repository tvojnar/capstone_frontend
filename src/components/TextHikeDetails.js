import React from 'react'

export const TextHikeDetails = (props) => {
  // pull out the hike data from the props passed from TextHikeDetailsContainer
  const data = props.data


  return(
    <div className='textArea'>
      <h3 className='blueText'>{data.title}</h3>
      <p className='textForDetails' >{data.text}</p>
    </div>
  )
} //
