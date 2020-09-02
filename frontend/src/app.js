import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import ReactDOM from 'react-dom'
import Home from './component/pages/Home'
import SecureRoute from './component/common/SecureRoute'
import Books from './component/books/Books2'
import BooksSHOW from './component/books/BooksSHOW'
import BooksEdit from './component/books/BooksEDIT'
import Register from './component/auth/Register'
import Login from './component/auth/Login'
import 'bulma'
import '@fortawesome/fontawesome-free/js/all.js'
import './style.scss'

class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <SecureRoute path="/books/:id/edit" component={BooksEdit} />
            <SecureRoute path="/books/:id" component={BooksSHOW} />
            <SecureRoute path="/books" component={Books} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Home} />
          </Switch>
        </HashRouter>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
