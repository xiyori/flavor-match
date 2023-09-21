'use client';

import React, { useState } from 'react'

function ExpandableDescription ({name, description}) {
  const [isExpanded, setIsExpanded] = useState(false)

  // set last direction and decrease current index
  const handleClick = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <div
      className={'expandableDescription' + (isExpanded ? '' : ' contracted')}
      onClick={handleClick}
    >
      <div className='flexContainer'>
        <h3>{name}</h3>
        <div 
          style={{ backgroundImage: 'url("/info.svg")' }}
          className='infoSymbol'
        />
      </div>
      <p>{description}</p>
    </div>
  )
}

export default ExpandableDescription