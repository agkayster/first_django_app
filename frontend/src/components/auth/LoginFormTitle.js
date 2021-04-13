import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class LoginFormTitle extends Component {
  render() {
    return (
      <div className="FormTitle">
        <NavLink
          to="/login"
          activeClassName="FormTitle__Link--Active"
          className="FormTitle__Link"
        >
          Sign In
        </NavLink>
      </div>
    )
  }
}

export default LoginFormTitle
