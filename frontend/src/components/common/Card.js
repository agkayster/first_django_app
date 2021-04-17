import React from 'react'

const Card = ({ title, author, image }) => {
  return (
    <div className='card'>
      <header className='card-header'>
        <div className='card-header-title'>{title}</div>
      </header>
      <div className='card-image'>
        <figure className='image'>
          <img src={image} alt={title} className='card-image' />
          <p>click to know more about the book</p>
        </figure>
        <div className='card-content'>
          <div className='content'>{author}</div>
        </div>
      </div>
    </div>
  )
}

export default Card
