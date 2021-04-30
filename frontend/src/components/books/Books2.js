/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Card from '../common/Card'
import { Link } from 'react-router-dom'
import PriceCheckBox from './PriceCheckBox'
import GenreCheckBox from './GenreCheckBox'
import RatingCheckBox from './RatingCheckBox'

import Auth from '../../lib/Auth'

const genres = [
  {
    genreClass: 'comedy',
    value: 'comedy'
  },
  {
    genreClass: 'fiction',
    value: 'fiction'
  },
  {
    genreClass: 'action',
    value: 'action'
  },
  {
    genreClass: 'thriller',
    value: 'thriller'
  },
  {
    genreClass: 'sci-fi',
    value: 'sci-fi'
  },
  {
    genreClass: 'romance',
    value: 'romance'
  },
  {
    genreClass: 'horror',
    value: 'horror'
  }
]

const prices = [
  {
    priceClass: 'priceZero',
    priceRange: { priceMax: 1.99, priceMin: 0 },
    name: '0 - 1.99'
  },
  {
    priceClass: 'priceOne',
    priceRange: { priceMax: 2.99, priceMin: 2 },
    name: '2 - 2.99'
  },
  {
    priceClass: 'priceTwo',
    priceRange: { priceMax: 3.99, priceMin: 3 },
    name: '3 - 3.99'
  },
  {
    priceClass: 'priceThree',
    priceRange: { priceMax: 4.99, priceMin: 4 },
    name: '4 - 4.99'
  },
  {
    priceClass: 'priceFour',
    priceRange: { priceMax: 5.99, priceMin: 5 },
    name: '5 - 5.99'
  },
  {
    priceClass: 'priceFive',
    priceRange: { priceMax: 6.99, priceMin: 6 },
    name: '6 - 6.99'
  }
]

const ratings = [
  {
    ratingClass: 'rate1',
    value: '1'
  },
  {
    ratingClass: 'rate2',
    value: '2'
  },
  {
    ratingClass: 'rate3',
    value: '3'
  },
  {
    ratingClass: 'rate4',
    value: '4'
  },
  {
    ratingClass: 'rate5',
    value: '5'
  }
]

const Books = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [checkBoxState, setCheckBoxState] = useState({})
  const [pricesToFilter, setPricesToFilter] = useState([])
  const [genresToFilter, setGenresToFilter] = useState([])
  const [ratingsToFilter, setRatingsToFilter] = useState([])
  const [books, setBooks] = useState([])

  useEffect(() => {
    const listBooks = async () => {
      const data = await Axios.get('/api/books', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      setBooks(data)
    }
    listBooks()
  }, [])

  const filterBooksByText = (book) => {
    if (!searchTerm) return true
    return (
      searchTerm.test(book.title) ||
			searchTerm.test(
			  `${book.author.firstname} ${book.author.middlename} ${book.author.lastname}`
			) ||
			searchTerm.test(book.genres.map((genre) => genre.name)) ||
			searchTerm.test(book.price)
    )
  }

  const filterBooksByGenre = (book) => {
    if (!genresToFilter.length) return true
    return book.genres.some((genre) =>
      genresToFilter.includes(genre.name.toLowerCase())
    )
  }

  const filterBooksByPrice = (book) => {
    if (!pricesToFilter.length) return true
    return pricesToFilter.some(
      ({ priceMin, priceMax }) =>
        book.price >= priceMin && book.price <= priceMax
    )
  }

  const filterBooksByRatings = (book) => {
    if (!ratingsToFilter.length) return true
    const newBook = String(book.rating)
    console.log('check newBook is a string =>', typeof newBook)
    return ratingsToFilter.includes(newBook)
  }

  const filterBooks = (books) => {
    console.log('books in filter func', books)
    return books.data.filter((book) => passesAllFilters(book))
  }

  const passesAllFilters = (book) =>
    [
      filterBooksByText,
      filterBooksByGenre,
      filterBooksByPrice,
      filterBooksByRatings
    ].reduce((passedPrevFilter, currFilterFunc) => {
      return passedPrevFilter && currFilterFunc(book)
    }, true)

  const handleSearch = (e) => {
    setSearchTerm(new RegExp(e.target.value, 'i'))
  }

  const handleGenreCheckBox = ({ target: { value, checked } }) => {
    setCheckBoxState({ ...checkBoxState, [value]: checked })

    const genresCheckBox = checked
      ? [...genresToFilter, value]
      : genresToFilter.filter((genre) => genre !== value)
    setGenresToFilter(genresCheckBox)
  }

  const handlePriceCheckBox = ({ target: { name, checked } }, value) => {
    setCheckBoxState({ ...checkBoxState, [name]: checked })

    const pricesCheckBox = checked
      ? [...pricesToFilter, value]
      : pricesToFilter.filter(
        (price) => price.priceMin !== value.priceMin
			  )

    setPricesToFilter(pricesCheckBox)
  }

  const handleRatingCheckBox = ({ target: { value, checked } }) => {
    setCheckBoxState({ ...checkBoxState, [value]: checked })

    const ratingsCheckBox = checked
      ? [...ratingsToFilter, value]
      : ratingsToFilter.filter((rating) => rating !== value)
    setRatingsToFilter(ratingsCheckBox)
  }

  if (books.length === 0) return <h1>Please wait while loading...</h1>

  console.log('state of check box', checkBoxState)
  console.log('filter prices', pricesToFilter)

  return (
    <div>
      <div className='book'>
        <aside className='menu'>
          <div className='control genre'>
            <p className='menu-label is-centered genre'>
              <strong>Genres</strong>
            </p>
            {genres.map((genre) => (
              <GenreCheckBox
                key={genre.value}
                genreClass={genre.genreClass}
                isChecked={checkBoxState[genre.value] || ''}
                value={genre.value}
                handleSort={handleGenreCheckBox}
              />
            ))}
          </div>
          <div className='control price'>
            <p className='menu-label is-centered price'>
              <strong>Prices(£)</strong>
            </p>
            {prices.map((price) => (
              <PriceCheckBox
                key={price.name}
                priceClass={price.priceClass}
                isChecked={checkBoxState[price.name] || ''}
                priceRange={price.priceRange}
                name={price.name}
                handleSortPrice={handlePriceCheckBox}
              />
            ))}
          </div>
          <div className='control rating'>
            <p className='menu-label is-centered rating'>
              <strong>Rating(Over 5)</strong>
            </p>
            {ratings.map((rating) => (
              <RatingCheckBox
                key={rating.value}
                ratingClass={rating.ratingClass}
                isChecked={checkBoxState[rating.value] || ''}
                value={rating.value}
                handleSortRating={handleRatingCheckBox}
              />
            ))}
          </div>
        </aside>
        <section className='section'>
          <div className='container'>
            <div className='columns is-centered'>
              <div className='column is-half'>
                <div className='field'>
                  <p className='control has-icons-right'>
                    <input
                      className='input'
                      type='text'
                      placeholder='search'
                      onChange={handleSearch}
                    />
                    <span className='icon is-small is-right'>
                      <i className='fas fa-search' />
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <br />
            <div className='columns is-multiline is-desktop is-mobile'>
              {books.data.length > 0 &&
								filterBooks(books).map((book) => (
								  <div
								    className='column is-one-quarter-desktop is-half-mobile'
								    key={book.id}>
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
    </div>
  )
}

export default Books

// import React, { Component } from 'react'
// import Axios from 'axios'
// import Card from '../common/Card'
// import { Link } from 'react-router-dom'
// import PriceCheckBox from './PriceCheckBox'
// import GenreCheckBox from './GenreCheckBox'

// const genres = [
//   {
//     genreClass: 'Comedy',
//     value: 'comedy'
//   },
//   {
//     genreClass: 'Fiction',
//     value: 'fiction'
//   },
//   {
//     genreClass: 'Action',
//     value: 'action'
//   },
//   {
//     genreClass: 'Thriller',
//     value: 'thriller'
//   },
//   {
//     genreClass: 'Sci-fi',
//     value: 'sci-fi'
//   },
//   {
//     genreClass: 'Romance',
//     value: 'romance'
//   },
//   {
//     genreClass: 'Horror',
//     value: 'horror'
//   }
// ]

// const prices = [
//   {
//     priceClass: 'priceZero',
//     priceRange: { priceMax: 1.99, priceMin: 0 },
//     name: '0 - 1.99'
//   },
//   {
//     priceClass: 'priceOne',
//     priceRange: { priceMax: 2.99, priceMin: 2 },
//     name: '2 - 2.99'
//   },
//   {
//     priceClass: 'priceTwo',
//     priceRange: { priceMax: 3.99, priceMin: 3 },
//     name: '3 - 3.99'
//   },
//   {
//     priceClass: 'priceThree',
//     priceRange: { priceMax: 4.99, priceMin: 4 },
//     name: '4 - 4.99'
//   },
//   {
//     priceClass: 'priceFour',
//     priceRange: { priceMax: 5.99, priceMin: 5 },
//     name: '5 - 5.99'
//   }
// ]

// class Books extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       searchTerm: '',
//       checkBoxState: {},
//       pricesToFilter: [],
//       genresToFilter: [],
//       books: [],
//       title: 'Eze goes to School'
//     }
//     this.handleBooks = this.handleBooks.bind(this)
//     this.handleSearch = this.handleSearch.bind(this)
//     this.handleSort = this.handleSort.bind(this)
//     this.handleSortPrice = this.handleSortPrice.bind(this)
//     this.currentGenres = this.currentGenres.bind(this)
//   }

//   componentDidMount() {
//     this.bookUpdate()
//     this.currentGenres()
//   }

//   bookUpdate = async () => {
//     const res = await Axios.get('/api/books')
//     this.setState({ books: res.data })
//   };

//   handleBooks(e) {
//     this.setState({ title: e.target.value })
//   }

//   handleSearch(e) {
//     const searchTerm = new RegExp(e.target.value, 'i')
//     this.setState({ searchTerm })
//   }

//   handleSort({ target: { value, checked } }) {
//     const checkBoxState = { ...this.state.checkBoxState, [value]: checked }

//     const genresToFilter = checked
//       ? [...this.state.genresToFilter, value]
//       : this.state.genresToFilter.filter((genre) => genre !== value)

//     this.setState({ checkBoxState, genresToFilter })
//   }

//   handleSortPrice({ target: { name, checked } }, value) {
//     const checkBoxState = { ...this.state.checkBoxState, [name]: checked }

//     const pricesToFilter = checked
//       ? [...this.state.pricesToFilter, value]
//       : this.state.pricesToFilter.filter(
//         (price) => price.priceMin !== value.priceMin
//       )

//     this.setState({ checkBoxState, pricesToFilter })
//   }

//   filterBooksByText = (book) => {
//     const { searchTerm } = this.state
//     if (!searchTerm) return true
//     return (
//       searchTerm.test(book.title) ||
//       searchTerm.test(
//         `${book.author.firstname} ${book.author.middlename} ${book.author.lastname}`
//       ) ||
//       searchTerm.test(book.genres.map((genre) => genre.name)) ||
//       searchTerm.test(book.price)
//     )
//   };

//   filterBooksByGenre = (book) => {
//     const { genresToFilter } = this.state
//     if (!genresToFilter.length) return true
//     return book.genres.some((genre) =>
//       genresToFilter.includes(genre.name.toLowerCase())
//     )
//   };

//   filterBooksByPrice = (book) => {
//     const { pricesToFilter } = this.state
//     if (!pricesToFilter.length) return true
//     return pricesToFilter.some(
//       ({ priceMin, priceMax }) =>
//         book.price >= priceMin && book.price <= priceMax
//     )
//   };

//   passesAllFilters = (book) =>
//     [
//       this.filterBooksByText,
//       this.filterBooksByGenre,
//       this.filterBooksByPrice
//     ].reduce((acc, currFilterFunc) => acc && currFilterFunc(book), true);

//   filterBooks = (books) => books.filter((book) => this.passesAllFilters(book));

//   currentGenres() {
//     const currentBook = this.state.books.find(
//       (book) => book.title === this.state.title
//     )
//     if (!currentBook) return
//     return currentBook.genres.map((genre) => (
//       <option key={genre.id}>{genre.name}</option>
//     ))
//   }
//   render() {
//     console.log('get all books', this.state.books)
//     if (!this.state.books) return <h1>Please wait while loading...</h1>
//     return (
//       <div>
//         <aside className="menu">
//           <p className="menu-label">Books Gallery</p>
//           <ul className="menu-list">
//             {this.state.books.map((book) => (
//               <li key={book.id}>
//                 <Link to={`books/${book.id}`}>
//                   <p>{book.title}</p>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//           <div className="control">
//             <p className="menu-label Genre is-centered">Genres</p>
//             {genres.map((genre) => (
//               <GenreCheckBox
//                 key={genre.value}
//                 genreClass={genre.genreClass}
//                 isChecked={this.state.checkBoxState[genre.value] || ''}
//                 value={genre.value}
//                 handleSort={this.handleSort}
//               />
//             ))}
//           </div>
//           <div className="control">
//             <p className="menu-label is-centered">Prices(£)</p>
//             {prices.map((price) => (
//               <PriceCheckBox
//                 key={price.name}
//                 priceClass={price.pricesClass}
//                 isChecked={this.state.checkBoxState[price.name] || ''}
//                 priceRange={price.priceRange}
//                 name={price.name}
//                 handleSortPrice={this.handleSortPrice}
//               />
//             ))}
//           </div>
//         </aside>
//         <section className="section">
//           <div className="container">
//             <div className="columns">
//               <div className="column is-one-third">
//                 <div className="field">
//                   <p className="control has-icons-right">
//                     <input
//                       className="input is-primary"
//                       type="text"
//                       placeholder="search"
//                       onKeyUp={this.handleSearch}
//                     />
//                     <span className="icon is-small is-right">
//                       <i className="fas fa-search" />
//                     </span>
//                   </p>
//                 </div>
//               </div>
//               <div className="column is-one-third">
//                 <div className="field">
//                   <div className="control">
//                     <div className="select is-primary">
//                       <select
//                         onChange={this.handleBooks}
//                         value={this.state.title}
//                       >
//                         {this.state.books.map((book) => (
//                           <option key={book.id}>{book.title}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="column is-one-third">
//                 <div className="field">
//                   <div className="control">
//                     <div className="select is-primary">
//                       <select>
//                         {this.currentGenres((genre) => (
//                           <option key={genre.id}>{genre}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <br />
//             <div className="columns is-multiline is-desktop is-mobile">
//               {this.filterBooks(this.state.books).map((book) => (
//                 <div
//                   className="column is-one-quarter-desktop is-half-mobile"
//                   key={book.id}
//                 >
//                   <Link to={`/books/${book.id}`}>
//                     <Card
//                       title={book.title}
//                       image={book.image}
//                       author={`${book.author.firstname} ${book.author.lastname}`}
//                     />
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </div>
//     )
//   }
// }
// export default Books
