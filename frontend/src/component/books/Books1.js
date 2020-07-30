import React, { Component } from 'react'
import Axios from 'axios'
import Card from '../common/Card'
import { Link } from 'react-router-dom'
import PriceCheckBox from './PriceCheckBox'
import GenreCheckBox from './GenreCheckBox'

const Genres = [
  {
    genreClass: 'Comedy',
    value: 'comedy'
  },
  {
    genreClass: 'Fiction',
    value: 'fiction'
  },
  {
    genreClass: 'Action',
    value: 'action'
  },
  {
    genreClass: 'Thriller',
    value: 'thriller'
  },
  {
    genreClass: 'Sci-fi',
    value: 'sci-fi'
  },
  {
    genreClass: 'Romance',
    value: 'romance'
  },
  {
    genreClass: 'Horror',
    value: 'horror'
  }
]

const Prices = [
  {
    priceClass: 'priceZero',
    priceRange: { priceMax: 1.99, priceMin: 0 },
    name: '0-1.99'
  },
  {
    priceClass: 'priceOne',
    priceRange: { priceMax: 2.99, priceMin: 2 },
    name: '2-2.99'
  },
  {
    priceClass: 'priceTwo',
    priceRange: { priceMax: 3.99, priceMin: 3 },
    name: '3-3.99'
  },
  {
    priceClass: 'priceThree',
    priceRange: { priceMax: 4.99, priceMin: 4 },
    name: '4-4.99'
  },
  {
    priceClass: 'priceFour',
    priceRange: { priceMax: 5.99, priceMin: 5 },
    name: '5-5.99'
  }
]

class Books extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      checkBoxState: {},
      pricesToFilter: [],
      books: [],
      filteredBooks: [],
      title: 'Eze goes to School'
    }

    this.handleBooks = this.handleBooks.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.handleSortPrice = this.handleSortPrice.bind(this)
    this.currentGenres = this.currentGenres.bind(this)
    this.bookUpdate = this.bookUpdate.bind(this)
  }

  componentDidMount() {
    this.bookUpdate()
    this.currentGenres()
  }

  bookUpdate() {
    Axios.get('/api/books')
      .then((res) =>
        this.setState({ books: res.data, filteredBooks: res.data })
      )
      .catch((err) => console.log(err))
  }

  handleBooks(e) {
    this.setState({ title: e.target.value })
  }

  handleSearch(e) {
    const re = new RegExp(e.target.value, 'i')
    const filteredBooks = this.state.books.filter((book) => {
      return (
        re.test(book.title) ||
        re.test(
          `${book.author.firstName} ${book.author.middlename} ${book.author.lastName}`
        ) ||
        re.test(book.genres.map((genre) => genre.name)) ||
        re.test(book.price)
      )
    })
    this.setState({ filteredBooks })
  }

  handleSort(e) {
    const checkBoxState = {
      ...this.state.checkBoxState,
      [e.target.value]: e.target.checked
    }
    const filteredBooks = Object.values(checkBoxState).some((value) => value)
      ? this.state.books.filter((book) =>
        book.genres.some((genre) => checkBoxState[genre.name.toLowerCase()])
      )
      : this.state.books

    this.setState({
      checkBoxState,
      filteredBooks
    })
  }

  handleSortPrice(e, value) {
    const checkBoxState = {
      ...this.state.checkBoxState,
      [e.target.name]: e.target.checked
    }
    const pricesToFilter = e.target.checked
      ? [...this.state.pricesToFilter, value]
      : this.state.pricesToFilter.filter(
        (price) => price.priceMin !== value.priceMin
      )

    const filteredBooks = pricesToFilter.length
      ? this.state.books.filter((book) => {
        return pricesToFilter.some(
          (range) =>
            book.price >= range.priceMin && book.price <= range.priceMax
        )
      })
      : this.state.books

    this.setState({ checkBoxState, pricesToFilter, filteredBooks })
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
    console.log('books', this.state.books)
    console.log('filtered books', this.state.filteredBooks)
    if (!this.state.books) return <h1>Please wait while loading...</h1>
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
            {Genres.map((genre) => (
              <GenreCheckBox
                key={genre.value}
                genreClass={genre.genreClass}
                isChecked={this.state.checkBoxState[genre.value] || ''}
                value={genre.value}
                handleSort={this.handleSort}
              />
            ))}
          </div>
          <div className="control">
            <p className="menu-label is-centered">Prices(£)</p>
            {Prices.map((price) => (
              <PriceCheckBox
                key={price.name}
                priceClass={price.priceClass}
                isChecked={this.state.checkBoxState[price.name] || ''}
                priceRange={price.priceRange}
                name={price.name}
                handleSortPrice={this.handleSortPrice}
              />
            ))}
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
                      <i className="fas fa-search" />
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
              {this.state.filteredBooks.map((book) => (
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
