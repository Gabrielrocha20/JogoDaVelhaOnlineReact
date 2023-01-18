import React from 'react'

const BlocksTicToc = ({id, sinal, className, handlePlayed}) => {
  return (
    <div className={className} onClick={() => handlePlayed(id)}>
      <h2>
        {sinal[id]}
      </h2>
    </div>
  )
}

export default BlocksTicToc