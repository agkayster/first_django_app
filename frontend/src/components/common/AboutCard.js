import React from 'react'

const AboutCard = ({ name, link, image, githubLink }) => {
  return (
    <div className='card about'>
      <div className='card-header'>
        <div className='card-header-title'>{name}</div>
      </div>
      <div className='card-image'>
        <figure className='image'>
          <img src={image} alt={name} />
        </figure>
      </div>
      <div className='card-content flex'>
        <span className='notes'>{githubLink}</span>
        <span className='notes'>{link}</span>
      </div>
    </div>
  )
}

// const AboutCard = (props) => {
// 	return (
// 		<div className='card'>
// 			<div className='card-header'>
// 				<div className='card-header-title'>{props.name}</div>
// 			</div>
// 			<div className='card-image'>
// 				<figure className='image'>
// 					<img src={props.image} alt={props.name} />
// 				</figure>
// 			</div>
// 			<div className='card-content flex'>
// 				<span className='notes'>{props.githubLink}</span>
// 				<span className='notes'>{props.link}</span>
// 			</div>
// 		</div>
// 	);
// };

export default AboutCard
