import React from 'react'
import AboutCard from '../common/AboutCard'

const About = () => {
  return (
    <section className='section about'>
      <div className='container'>
        <div className='box about-box'>
          <h2 className='title is-3'>About the Site</h2>
          <p className='description'>
						This site has been developed by Ejike Chiboka. The
						backend employs a Django database using a Python
						framework.{' '}
          </p>
        </div>
        <div className='box about-box'>
          <h2 className='developer-about'>
            <strong>About the Developer</strong>
          </h2>
          <hr />
          <div className='columns is-multiline'>
            <div className='column is-full is-offset-one-half'>
              <div className='about-site'>
                <AboutCard
                  name='Ejike Chiboka'
                  image={'https://i.imgur.com/owdRqwP.jpg'}
                  githubLink={
                    <a
                      href='https://github.com/agkayster'
                      target='_blank'
                      rel='noopener noreferrer'>
                      {' '}
                      <i className='fab fa-github-square'></i>
                    </a>
                  }
                  link={
                    <a
                      href='https://www.linkedin.com/in/ejike-chiboka-pmp-1879815a/'
                      target='_blank'
                      rel='noopener noreferrer'>
                      {' '}
                      <i className='fab fa-linkedin-in'></i>
                    </a>
                  }
                />

                <p className='explain'>
                  <strong>
										This site is a books aggregator site
										that gets information about all the
										popular books around the world that
										people love to read and displays it
										here. Users can then learn more about
										the books, how much they cost, the
										Authors, summary of such books and their
										ratings. In the end, the site helps
										users know more about the books they
										enjoy reading.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='box about-box'>
          <h2 className='about-ack'>
            <strong>Acknowledgements</strong>
          </h2>

          <hr />
          <div className='about-rep'>
            <ul>
              <li>
								• Background images - Unsplash artists,
								ShutterStock
              </li>
              <li>
								• Books - Yaa Gyasi, Chinua Achebe, Robert
								Munsch, Tommy Orange, Onuora Nzekwu, Curtis
								Sittenfield, Elena Ferrante, Kate Russel
              </li>
            </ul>

            <p>Icons made by Fontawesome</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
