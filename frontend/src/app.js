import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import ReactDOM from 'react-dom'
import Books from './component/books/Books1'
import BooksSHOW from './component/books/BooksSHOW'
import 'bulma'
import '@fortawesome/fontawesome-free/js/all.js'
import './style.scss'

class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route path="/books/:id" component={BooksSHOW} />
            <Route path="/" component={Books} />
          </Switch>
        </HashRouter>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
