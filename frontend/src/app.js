import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import ReactDOM from 'react-dom'
import Home from './components/pages/Home'
import SecureRoute from './components/common/SecureRoute'
import Books from './components/books/Books2'
import BooksSHOW from './components/books/BooksSHOW'
import BooksEdit from './components/books/BooksEDIT'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import OtherNavbar from './components/common/OtherNavbar'
import 'bulma'
import '@fortawesome/fontawesome-free/js/all.js'
import './style.scss'

class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <OtherNavbar />
          <Switch>
            <SecureRoute
              path='/books/:id/edit'
              component={BooksEdit}
            />
            <SecureRoute path='/books/:id' component={BooksSHOW} />
            <SecureRoute path='/books' component={Books} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route exact path='/' component={Home} />
          </Switch>
        </HashRouter>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
