import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class BooksEdit extends React.Component {
  constructor() {
    super()
    this.state = {
      formData: {
        author: {},
        genres: []
      },
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleArrayChange = this.handleArrayChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    axios
      .get(`/api/books/${this.props.match.params.id}`)
      .then((res) => this.setState({ formData: res.data }))
  }

  handleSubmit(e) {
    e.preventDefault()

    return axios
      .put(
        `/api/books/${this.props.match.params.id}/`,
        this.state.formData,
        {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        }
      )
      .then(() =>
        this.props.history.push(`/books/${this.props.match.params.id}/`)
      )
      .catch((err) => this.setState({ errors: err.response.data })) // no err.response.data.errors in django
  }

  handleChange(e) {
    const formData = {
      ...this.state.formData,
      [e.target.name]: e.target.value
    }
    this.setState({ formData })
  }

  handleArrayChange(e) {
    const formData = {
      ...this.state.formData,
      [e.target.name]: e.target.value.join(', ')
    }
    this.setState({ formData })
  }

  render() {
    console.log(this.state.formData)
    return (
      <section className='section'>
        <div className='container'>
          <form onSubmit={this.handleSubmit}>
            <div className='field'>
              <label className='label'>Title</label>
              <input
                className='input'
                name='title'
                placeholder='eg: There There'
                value={this.state.formData.title || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.title && (
                <small className='help is-danger'>
                  {this.state.errors.title}
                </small>
              )}
            </div>
            <div className='field'>
              <label className='label'>Author</label>
              <input
                className='input'
                name='author'
                placeholder='eg: Chinua Achebe'
                value={
                  `${this.state.formData.author.firstname} ${this.state.formData.author.lastname}` ||
									''
                }
                onChange={this.handleChange}
              />
              {this.state.errors.author && (
                <small className='help is-danger'>
                  {this.state.errors.author}
                </small>
              )}
            </div>
            <div className='field'>
              <figure className='image'>Image</figure>
              <input
                className='input'
                name='image'
                type='string'
                placeholder='Enter URL here'
                value={this.state.formData.image || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.image && (
                <small className='help is-danger'>
                  {this.state.errors.image}
                </small>
              )}
            </div>
            <div className='field'>
              <label className='label'>Summary</label>
              <input
                className='input'
                name='summary'
                type='string'
                placeholder='eg: What a world'
                value={this.state.formData.summary || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.summary && (
                <small className='help is-danger'>
                  {this.state.errors.summary}
                </small>
              )}
            </div>
            <div className='field'>
              <label className='label'>Genres</label>
              <input
                className='input'
                name='genres'
                type='string'
                placeholder='eg: Comedy'
                value={
                  this.state.formData.genres.map(
                    (genre) => genre.name
                  ) || ''
                }
                onChange={this.handleArrayChange}
              />
              {this.state.errors.genres && (
                <small className='help is-danger'>
                  {this.state.errors.genres}
                </small>
              )}
            </div>
            <div className='field'>
              <label className='label'>Price(£)</label>
              <input
                className='input'
                name='price'
                type='string'
                placeholder='eg: 45'
                value={this.state.formData.price || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.price && (
                <small className='help is-danger'>
                  {this.state.errors.price}
                </small>
              )}
            </div>
            <button className='button'>Submit</button>
          </form>
        </div>
      </section>
    )
  }
}

export default BooksEdit
