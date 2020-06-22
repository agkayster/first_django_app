import React from 'react'

const Card = (props) => {
  return (
    <div className="card">
      <header className="card-header">
        <div className="card-header-title">{props.title}</div>
      </header>
      <div className="card-image">
        <figure className="image">
          <img src={props.image} alt={props.title} className="card-image" />
        </figure>
        <div className="card-content">
          <div className="content">{props.author}</div>
        </div>
      </div>
    </div>
  )
}

export default Card
