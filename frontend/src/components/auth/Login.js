import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import LoginFormTitle from './LoginFormTitle'

import Auth from '../../lib/Auth'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      formData: {},
      error: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const formData = {
      ...this.state.formData,
      [e.target.name]: e.target.value
    }
    this.setState({ formData, error: '' })
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('Your form has been submitted')
    console.log(this.state)

    axios
      .post('/api/login/', this.state.formData)
      .then((res) => {
        Auth.setUser(res.data.user)
        Auth.setToken(res.data.token) // store the token in localStorage
        this.props.history.push('/books/') // redirect to the books INDEX page
      })
      .catch(() => {
        Auth.removeToken() // remove the token from localStorage
        this.setState({ error: 'Invalid credentials' }) // display an error
      })
  }

  render() {
    return (
      <section className='FormCenter login'>
        <LoginFormTitle />
        <div className='container'>
          <form className='FormFields' onSubmit={this.handleSubmit}>
            <div className='FormField'>
              <label className='FormField__Label' htmlFor='email'>
								Email
              </label>
              <div className='control'>
                <input
                  type='email'
                  id='email'
                  className='FormField__Input'
                  placeholder='Enter your Email'
                  name='email'
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className='FormField'>
              <label className='FormField__Label' htmlFor='password'>
								Password
              </label>
              <div className='control'>
                <input
                  type='password'
                  id='password'
                  className='FormField__Input'
                  placeholder='Enter your Password'
                  name='password'
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              {this.state.error && (
                <small className='help is-danger'>{this.state.error}</small>
              )}
            </div>
            <div className='FormField'>
              <button className='FormField__Button mr-20 Login'>Sign In</button>
            </div>
          </form>
          <div className='FormField NewCreate'>
            <span className='NewBok'>New to Bokatee?</span>
            <Link to='/register' className='FormField__Link'>
							Create an account
            </Link>
          </div>
        </div>
      </section>
    )
  }
}

export default Login
