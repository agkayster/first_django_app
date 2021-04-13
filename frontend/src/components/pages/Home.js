import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../common/Navbar';

class Home extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<section className='hero image-one'>
					<div className='hero-body'>
						<div className='container'>
							<div className='home'>
								<h1 className='home subtitle is-2'>
									<strong>
										Get to know everything <br />
										about the books you love
									</strong>
								</h1>
								<h3 className='home subtitle is-5'>
									Bookatee helps those who love to read,
									<br />
									get the books they love to read from
									anywhere in the world.
								</h3>
								<Link
									to='/register'
									className='button is-primary home'>
									Create your account
								</Link>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default Home;

// import React from 'react'
// import Button from '../common/Button'
// // import Auth from '../lib/Auth'
// import { Link } from 'react-router-dom'

// const Home = () => {
//   return (
//     <div>
//       <section className="hero is-fullheight image-one">
//         <div className="hero-body">
//           <div className="container">
//             <div className="home">
//               <h1 className="home subtitle is-2">
//                 <strong>
//                   Get to know everything <br />
//                   about the books you love
//                 </strong>
//               </h1>
//               <h3 className="home subtitle is-5">
//                 Bookatee helps those who love to read,
//                 <br />
//                 get the books they love to read from anywhere in the world.
//               </h3>
//             </div>
//             <Button />
//           </div>
//         </div>
//       </section>
//       <Link to="/register" className="button is-primary">
//         Register
//       </Link>
//     </div>
//   );
// }

// export default Home
