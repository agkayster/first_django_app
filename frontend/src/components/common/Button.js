import React from 'react'
import Auth from '../lib/Auth'
import {Link} from 'react-router-dom'

const Button = () => {
  return (
    <div className="buttons">
      {!Auth.isAuthenticated() && (
        <div className="button is-primary">
          <Link to="/register" className="button-link">
              Create your account
          </Link>
        </div>
      )}
    </div>
  )
}
 
export default Button