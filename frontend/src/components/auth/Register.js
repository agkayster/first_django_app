import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import RegisterFormTitle from './RegisterFormTitle'
import { Link } from 'react-router-dom'

class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      formData: {
        hasAgreed: false
      },
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const target = e.target
    const value =
			target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    const formData = {
      ...this.state.formData,
      [name]: value
    }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ formData, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('Your form has been submitted')
    console.log(this.state)

    axios
      .post('/api/register/', this.state.formData)
      .then((res) => {
        toast.success(res.data.message)
        this.props.history.push('/login')
      })
      .catch((err) => this.setState({ errors: err.response.data }))
  }

  render() {
    return (
      <div className='register'>
        <section className='FormCenter'>
          <div className='registerForm'>
            <RegisterFormTitle />
            <div className='container'>
              <form
                className='FormFields'
                onSubmit={this.handleSubmit}>
                <div className='FormField'>
                  <label
                    className='FormField__Label'
                    htmlFor='name'>
										Username
                  </label>
                  <div className='control'>
                    <input
                      type='text'
                      id='username'
                      className='FormField__Input'
                      placeholder='Enter your Username'
                      name='username'
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.username && (
                    <small className='help is-danger'>
                      {this.state.errors.username}
                    </small>
                  )}
                </div>
                <div className='FormField'>
                  <label
                    className='FormField__Label'
                    htmlFor='email'>
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
                  {this.state.errors.email && (
                    <small className='help is-danger'>
                      {this.state.errors.email}
                    </small>
                  )}
                </div>
                <div className='FormField'>
                  <label
                    className='FormField__Label'
                    htmlFor='password'>
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
                  {this.state.errors.password && (
                    <small className='help is-danger'>
                      {this.state.errors.password}
                    </small>
                  )}
                </div>
                <div className='FormField'>
                  <label
                    className='FormField__Label'
                    htmlFor='password'>
										Confirm Password
                  </label>
                  <div className='control'>
                    <input
                      type='password'
                      id='confirm_password'
                      className='FormField__Input'
                      placeholder='Confirm Password'
                      name='password_confirmation'
                      value={
                        this.state.password_confirmation
                      }
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.passwordConfirmation && (
                    <small className='help is-danger'>
                      {
                        this.state.errors
                          .passwordConfirmation
                      }
                    </small>
                  )}
                </div>
                <div className='FormField'>
                  <label className='FormField__CheckboxLabel'>
                    <div className='control'>
                      <input
                        className='FormField__Checkbox'
                        type='checkbox'
                        name='hasAgreed'
                        checked={this.state.hasAgreed}
                        onChange={this.handleChange}
                      />
                      <span className='checked'>
												By checking the box, you agree
												to all Bokatee&rsquo;s{' '}
                        <Link
                          to='/terms-of-service'
                          className='FormField__TermsLink'>
													terms of service
                        </Link>
                      </span>
                    </div>
                  </label>
                  {this.state.errors.hasAgreed && (
                    <small className='help is-danger'>
                      {this.state.errors.hasAgreed}
                    </small>
                  )}
                </div>
                <div className='FormField'>
                  <button className='FormField__Button mr-20'>
										Sign Up
                  </button>
                  <Link
                    to='/login'
                    className='FormField__Link'>
										I&rsquo;m already a member
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Register
