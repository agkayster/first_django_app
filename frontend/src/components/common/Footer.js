import React, { Component } from 'react'

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className='footer-bottom'>
          <div className='row'>
            <div className='span'>
              <div id='footer-social'>
                <p className='copyright'>
                  {' '}
									© 2021. BooksApp Inc. All rights reserved{' '}
                </p>
                <div className="icons">
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://www.booksapp.com'>
                    <i className='fab fa-twitter-square'></i>
                  </a>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://www.booksapp.com'>
                    <i className='fab fa-facebook-square'></i>
                  </a>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://www.booksapp.com'>
                    <i className='fab fa-linkedin-in'></i>
                  </a>
                </div>
              </div>
              <div>
                <ul id='menu-footer-menu'>
                  <li className='menu-item'>
                    <a href='https://www.booksapp.com'>
                      {' '}
											Privacy Policy
                    </a>{' '}
                  </li>
                  <li className='menu-item'>
                    <a href='https://www.booksapp.com'>
											Cookie Policy
                    </a>{' '}
                  </li>
                  <li className='menu-item'>
                    <a href='https://www.booksapp.com'>
                      {' '}
											Terms and Conditions{' '}
                    </a>
                  </li>
                  <li className='menu-item'>
                    <a href='https://www.booksapp.com'>
                      {' '}
											Contact us
                    </a>{' '}
                  </li>
                  <li className='menu-item'>
                    <a href='https://www.booksapp.com'>
                      {' '}
											Careers{' '}
                    </a>
                  </li>
                  <li className='menu-item'>
                    <a href='https://www.booksapp.com'>
                      {' '}
											Advertise
                    </a>{' '}
                  </li>
                  <li className='menu-item'>
                    <a href='https://www.booksapp.com'>
                      {' '}
											Events
                    </a>{' '}
                  </li>
                </ul>
              </div>
              <div>
                <p className='copyright'>
                  {' '}
									This website uses cookies. By using this
									website, you agree we can set and use
									cookies{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
export default Footer
