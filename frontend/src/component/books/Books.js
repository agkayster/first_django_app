import React, { Component } from 'react'
import Axios from 'axios'
import Card from '../common/Card'
import { Link } from 'react-router-dom'

class Books extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      checkBoxState: {},
      books: [],
      title: 'Eze goes to School'
    }

    this.bookUpdate = this.bookUpdate.bind(this)
    this.handleBooks = this.handleBooks.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.handleSortPrice = this.handleSortPrice.bind(this)
    this.filterAll = this.filterAll.bind(this)
    this.filterBooks = this.filterBooks.bind(this)
    this.filterCheckBoxGenre = this.filterCheckBoxGenre.bind(this)
    this.filterCheckboxPrice = this.filterCheckboxPrice.bind(this)
    this.currentGenres = this.currentGenres.bind(this)
  }

  componentDidMount() {
    this.bookUpdate()
    this.currentGenres()
    this.filterAll()
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

  handleSort(e) {
    const checkboxes = { ...this.state.checkBoxState }

    if (e.target.checked) {
      checkboxes[e.target.value] = e.target.checked
    } else {
      delete checkboxes[e.target.value]
    }
    this.setState({
      checkBoxState: checkboxes
    })
  }

  handleSortPrice(e, value) {
    const checkBoxState = {}

    if (e.target.checked) {
      checkBoxState[e.target.name] = value
      this.setState({
        checkBoxState: { ...checkBoxState }
      })
    } else {
      this.setState({
        checkBoxState: {}
      })
    }
  }

  filterBooks() {
    const re = new RegExp(this.state.searchTerm, 'i')

    let filteredBooks = this.state.books

    filteredBooks = filteredBooks.filter((book) => {
      return (
        re.test(book.title) ||
        re.test(
          `${book.author.firstname} ${book.author.middlename} ${book.author.lastname}`
        ) ||
        re.test(book.genres.map((genre) => genre.name)) ||
        re.test(book.price)
      )
    })

    console.log(filteredBooks)

    return filteredBooks
  }

  filterCheckBoxGenre() {
    let filteredCheckboxGenre = this.state.books
    const cBState = this.state.checkBoxState

    if (Object.keys(cBState).length > 0) {
      filteredCheckboxGenre = this.state.books.filter((book) =>
        book.genres.some(
          (genre) =>
            cBState[genre.name.toLowerCase()] &&
            cBState[genre.name.toLowerCase()] === true
        )
      )
    }
    console.log(filteredCheckboxGenre)
    return filteredCheckboxGenre
  }

  filterCheckboxPrice() {
    let filteredCheckboxPrice = this.state.books
    const cBState = this.state.checkBoxState

    if (Object.keys(cBState).length > 0) {
      filteredCheckboxPrice = this.state.books.filter((book) => {
        book.price = Number(book.price)
        const range = Object.keys(cBState)[0]
        return (
          book.price >= cBState[range].priceMin &&
          book.price <= cBState[range].priceMax
        )
      })
    }
    return filteredCheckboxPrice
  }

  filterAll(e, filter) {
    switch ((e, filter)) {
      case 'search':
        return this.filterBooks(e, filter)
      case 'price':
        return this.filterCheckboxPrice(e, filter)
      case 'genre':
        return this.filterCheckBoxGenre(e, filter)
      default:
        return null
    }
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
    console.log('check the books', this.state.books)
    console.log('checkboxstate', this.state.checkBoxState)

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

            <div className="comedy">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.checkBoxState['comedy'] || ''}
                  onChange={this.handleSort}
                  value="comedy"
                />
                Comedy
              </label>
            </div>

            <div className="Fiction">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.checkBoxState['fiction'] || ''}
                  onChange={this.handleSort}
                  value="fiction"
                />
                Fiction
              </label>
            </div>
            <div className="Horror">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.checkBoxState['horror'] || ''}
                  onChange={this.handleSort}
                  value="horror"
                />
                Horror
              </label>
            </div>
            <div className="Thriller">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.checkBoxState['thriller'] || ''}
                  onChange={this.handleSort}
                  value="thriller"
                />
                Thriller
              </label>
            </div>
            <div className="Romance">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.checkBoxState['romance'] || ''}
                  onChange={this.handleSort}
                  value="romance"
                />
                Romance
              </label>
            </div>
            <div className="Sci-fi">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.checkBoxState['sci-fi'] || ''}
                  onChange={this.handleSort}
                  value="sci-fi"
                />
                Sci-fi
              </label>
            </div>
            <div className="Action">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.checkBoxState['action'] || ''}
                  onChange={this.handleSort}
                  value="action"
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
                  name="0-1.99"
                  checked={this.state.checkBoxState['0-1.99'] || ''}
                  onChange={(e) =>
                    this.handleSortPrice(e, { priceMax: 1.99, priceMin: 0 })
                  }
                />
                0 - 1.99
              </label>
            </div>
            <div className="priceOne">
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="2-2.99"
                  checked={this.state.checkBoxState['2-2.99'] || ''}
                  onChange={(e) =>
                    this.handleSortPrice(e, { priceMax: 2.99, priceMin: 2 })
                  }
                />
                2 - 2.99
              </label>
            </div>
            <div className="priceTwo">
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="3-3.99"
                  checked={this.state.checkBoxState['3-3.99'] || ''}
                  onChange={(e) =>
                    this.handleSortPrice(e, { priceMax: 3.99, priceMin: 3 })
                  }
                />
                3 - 3.99
              </label>
            </div>
            <div className="priceThree">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.checkBoxState['4 - 4.99'] || ''}
                  onChange={this.handleSort}
                  value="4 - 4.99"
                />
                4 - 4.99
              </label>
            </div>
            <div className="priceFour">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={this.state.checkBoxState['5 - 5.99'] || ''}
                  onChange={this.handleSort}
                  value="5 - 5.99"
                />
                5 - 5.99
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
              {this.filterAll('thriller', 'genre').map((book) => (
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

// else if (
//           book.price >= [Number('2')] &&
//           book.price <= [Number('2.99')]
//         ) {
//           return true
//         } else if (
//           book.price >= [Number('3')] &&
//           book.price <= [Number('3.99')]
//         ) {
//           return true
//         } else if (book.price >= Number('4') && book.price <= Number('4.99')) {
//           return true
//         } else if (book.price >= Number('5') && book.price <= Number('5.99')) {
//           return true
//         }

// function App() {
//   return (
//     <div id="colorlib-page">
//       <div id="container-wrap">
//         <Sidebar></Sidebar>
//         <div id="colorlib-main">
//           <Homepage />
//           <Introduction></Introduction>
//           <About></About>
//           <Projects></Projects>
//           <Blog></Blog>
//           <Timeline></Timeline>
//         </div>
//       </div>
//     </div>
//   );
// }

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
