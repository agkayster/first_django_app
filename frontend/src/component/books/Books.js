import React, { Component } from 'react'
import Axios from 'axios'
import Card from '../common/Card'
import { Link } from 'react-router-dom'
// import _ from 'lodash'

class Books extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      checkBoxState: null,
      books: [],
      title: 'Eze goes to School'
    }

    this.handleBooks = this.handleBooks.bind(this)
    this.bookUpdate = this.bookUpdate.bind(this)
    this.currentGenres = this.currentGenres.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.filterBooks = this.filterBooks.bind(this)
    this.genreBooks = this.genreBooks.bind(this)
  }

  componentDidMount() {
    this.bookUpdate()
    this.currentGenres()
    // this.getbook()
  }

  bookUpdate() {
    Axios.get('/api/books')
      .then((res) => this.setState({ books: res.data }))
      .catch((err) => console.log(err))
  }

  handleBooks(e) {
    this.setState({ title: e.target.value })
  }

  handleSearch(e) {
    this.setState({ searchTerm: e.target.value })
  }

  handleSort() {
    this.setState({
      checkBoxState: this.state.books.map((book) => {
        return book.genres.map((genre) => genre.id)
      })
    })
  }

  filterBooks() {
    const re = new RegExp(this.state.searchTerm, 'i')

    const filteredBooks = this.state.books.filter((book) => {
      return (
        re.test(book.title) ||
        re.test(
          `${book.author.firstname} ${book.author.middlename} ${book.author.lastname}`
        ) ||
        re.test(book.genres.map((genre) => genre.name)) ||
        re.test(book.price)
      )
    })

    this.genreBooks()
    console.log(filteredBooks)
    return filteredBooks
  }

  genreBooks() {
    const filterCheckBox = this.state.checkBoxState
    const checkedOrNot = []
    const genreBook = this.state.books.find(
      (book) => book.title === this.state.title
    )
    if (!genreBook) return
    return genreBook.genres.filter((genre) =>
      checkedOrNot.push(genre.name === filterCheckBox)
    )
  }

  currentGenres() {
    const currentBook = this.state.books.find(
      (book) => book.title === this.state.title
    )
    if (!currentBook) return
    return currentBook.genres.map((genre) => (
      <option key={genre.id}>{genre.name}</option>
    ))
  }

  render() {
    console.log(this.state.books)
    console.log(this.genreBooks())
    console.log(this.filterBooks())

    if (!this.state.books) return <h1>Please wait while loading...</h1>

    const genreSelect = this.state.checkBoxState ? this.genreBooks() : null

    console.log(genreSelect)

    const genreArr = []

    return (
      <div>
        <aside className="menu">
          <p className="menu-label">Books Gallery</p>
          <ul className="menu-list">
            {this.state.books.map((book) => (
              <li key={book.id}>
                <Link to={`books/${book.id}`}>
                  <p>{book.title}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="control">
            <p className="menu-label Genre is-centered">Genres</p>

            <div className="comedy">
              <label className="checkbox">
                {this.state.books.map((book) => {
                  return book.genres.map((genre) => (
                    <input
                      key={genre.id}
                      type="checkbox"
                      checked={this.state.checkBoxState === genre.id}
                      onChange={this.handleSort}
                      value={genreSelect}
                    />
                  ))
                })}
                Comedy
              </label>
            </div>

            <div className="Fiction">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.checkBoxState}
                  onChange={this.handleSort}
                />
                Fiction
              </label>
            </div>
            <div className="Horror">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.checkBoxState}
                  onChange={this.handleSort}
                />
                Horror
              </label>
            </div>
            <div className="Thriller">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.checkBoxState}
                  onChange={this.handleSort}
                />
                Thriller
              </label>
            </div>
            <div className="Romance">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.checkBoxState}
                  onChange={this.handleSort}
                />
                Romance
              </label>
            </div>
            <div className="Sci-fi">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.checkBoxState}
                  onChange={this.handleSort}
                />
                Sci-fi
              </label>
            </div>
            <div className="Sci-fi">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.checkBoxState}
                  onChange={this.handleSort}
                />
                Action
              </label>
            </div>
          </div>
          <div className="control">
            <p className="menu-label is-centered">Prices(£)</p>
            <div className="priceZero">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.checkBoxState}
                  onChange={this.handleSort}
                />
                0 - 1.99
              </label>
            </div>
            <div className="priceOne">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.checkBoxState}
                  onChange={this.handleSort}
                />
                1.99 - 2.99
              </label>
            </div>
            <div className="priceTwo">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.checkBoxState}
                  onChange={this.handleSort}
                />
                2.99 - 3.99
              </label>
            </div>
            <div className="priceThree">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.checkBoxState}
                  onChange={this.handleSort}
                />
                3.99 - 4.99
              </label>
            </div>
            <div className="priceFour">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.checkBoxState}
                  onChange={this.handleSort}
                />
                4.99 - 5.99
              </label>
            </div>
          </div>
        </aside>

        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-one-third">
                <div className="field">
                  <p className="control has-icons-right">
                    <input
                      className="input is-primary"
                      type="text"
                      placeholder="search"
                      onKeyUp={this.handleSearch}
                    />
                    <span className="icon is-small is-right">
                      <i className="fas fa-search"></i>
                    </span>
                  </p>
                </div>
              </div>
              <div className="column is-one-third">
                <div className="field">
                  <div className="control">
                    <div className="select is-primary">
                      <select
                        onChange={this.handleBooks}
                        value={this.state.title}
                      >
                        {this.state.books.map((book) => (
                          <option key={book.id}>{book.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-one-third">
                <div className="field">
                  <div className="control">
                    <div className="select is-primary">
                      <select>
                        {this.currentGenres((genre) => (
                          <option key={genre.id}>{genre}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <br />
            <div className="columns is-multiline is-desktop is-mobile">
              {this.filterBooks().map((book) => (
                <div
                  className="column is-one-quarter-desktop is-half-mobile"
                  key={book.id}
                >
                  <Link to={`/books/${book.id}`}>
                    <Card
                      title={book.title}
                      image={book.image}
                      author={`${book.author.firstname} ${book.author.lastname}`}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Books

// //we use a reduce method for the books array, using 2 arguments "genreArr" and 'book'
//     const allgenre = this.state.books.reduce((genreArr, book) => {
//       // we then get each genre from the book genres
//       book.genres.forEach((genre) => {
//         // we say if some of the genre with the matching genre id are in the "genreArr" meaning genre Array
//         if(!genreArr.some(({id}) => id === genre.id)){
//           //if they are not from above, push them in based on below
//           genreArr.push(genre)
//         }
//       })
//       return genreArr
//     }, [])
//     //we pass all this into a variable called "allgenre"

// currentGenres() {
//     //In the array of books, we find each book whose title matches the title in "state"
//     //and pass it into a variable called currentBook
//     const currentBook = this.state.books.find(
//       (book) => book.title === this.state.title
//     )
//     //here we say if no book title matches the title in state and nothing is inside "currentBook", do nothing
//     if (!currentBook) return
//     // else if there is something, map over the genres of each book, to get the "name of the genre", genre.name.
//     return currentBook.genres.map((genre) => (
//       <option key={genre.id}>{genre.name}</option>
//     ))
//   }
//   // We then pass the name of the function "currentGenres" into ComponentDidMount
//   //and the dropdown select option for Genres
