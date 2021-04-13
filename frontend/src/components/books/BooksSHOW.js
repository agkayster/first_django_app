import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';

class BooksShow extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.getBook();
	}

	getBook() {
		Axios.get(`/api/books/${this.props.match.params.id}`)
			.then((res) => this.setState({ book: res.data }))
			.catch((err) => console.log(err));
	}

	handleDelete(e) {
		console.log(e.target);
		Axios.delete(`/api/books/${this.props.match.params.id}`),
			{
				headers: { Authorization: `Bearer ${Auth.getToken()}` },
			}.then(() => this.props.history.push('/api/books'));
	}

	canModify() {
		return (
			Auth.isAuthenticated() &&
			Auth.getPayload().sub === this.state.book.user.id // This ensures that only the person that created the book can edit it //
		);
	}

	render() {
		console.log(this.state.book);
		if (!this.state.book) return <h1>Please wait while loading...</h1>;

		const currentBook = this.state.book.genres
			.map((genre) => genre.name)
			.join(', ');

		console.log(currentBook);

		return (
			<div className='show'>
				<section className='section show'>
					<div className='container'>
						<div className='columns is-mobile'>
							<div className='column is-two-thirds-desktop'>
								{this.state.book && (
									<div>
										<header>
											<p className='title is-2'>
												Title: {this.state.book.title}
											</p>
											<hr />
										</header>

										<div className='card-image'>
											<figure className='image show'>
												<img
													src={this.state.book.image}
													alt={this.state.book.title}
												/>
											</figure>
										</div>
										<br />
										<h2 className='subtitle is-4'>
											Title: {this.state.book.title}
										</h2>
										<h2 className='subtitle is-4'>
											Author:{' '}
											{`${this.state.book.author.firstname} ${this.state.book.author.lastname}`}
										</h2>
										<h2 className='subtitle is-4'>
											Genres: {currentBook}
										</h2>
										<h2 className='subtitle is-4'>
											Price(£): {this.state.book.price}
										</h2>
										<h2 className='subtitle is-4'>
											Summary: {this.state.book.summary}
										</h2>
										{this.canModify() && (
											<div className='buttons'>
												<Link
													className='button'
													to={`/books/${this.state.book.id}/edit`}>
													Edit
												</Link>
												<button className='button is-danger'>
													Delete
												</button>
											</div>
										)}
										<hr />
									</div>
								)}
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default BooksShow;
