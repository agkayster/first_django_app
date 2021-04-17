import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class RegisterFormTitle extends Component {
  render() {
    return (
      <div className='FormTitle'>
        <NavLink
          exact
          to='/register'
          activeClassName='FormTitle__Link FormTitle__Link--Active'
          className='FormTitle__Link'>
          <strong>Register</strong>
        </NavLink>
      </div>
    )
  }
}

export default RegisterFormTitle
