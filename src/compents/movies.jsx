import React, { Component } from "react";
import Like from "../tools/like";
import Pagination from "../tools/pagination";
import ListGroup from "../tools/listGroup";
import { paginate } from "../tools/paginate";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 3,
		currentPage: 1,
	};
	componentDidMount() {
		const genres = [{ name: "All Genres" }, ...getGenres()];
		this.setState({ movies: getMovies(), genres });
	}

	deleteMovie = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
		// console.log(this.state.movies.length);
	};
	handlerLike = (movie) => {
		// console.log("liked was cliked",movie);
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].like = !movies[index].like;
		this.setState({ movies });
	};
	handlerPageChange = (page) => {
		this.setState({ currentPage: page });
	};
	handlerItemSelect = (genre) => {
		this.setState({ selectedGenre: genre ,currentPage : 1});
	};
	render() {
		const { length: count } = this.state.movies;
		const {
			currentPage,
			pageSize,
			selectedGenre,
			movies: allMovies,
		} = this.state;
		const filteredMovie =
			selectedGenre  && selectedGenre._id
				? allMovies.filter((m) => m.genre._id === selectedGenre._id)
				: allMovies;
		const movies = paginate(filteredMovie, currentPage, pageSize);
		// console.log(movies);
		if (count === 0)
			return (
				<main className="container">
					<h1>no movie in the play list</h1>
				</main>
			);
		return (
			<React.Fragment>
				<main className="container mt-5">
					<div className="row">
						<div className="col-2">
							<ListGroup
								items={this.state.genres}
								selectedGenre={this.state.selectedGenre}
								onItemSelect={this.handlerItemSelect}
							/>
						</div>
						<div className="col">
							<h1>{filteredMovie.length}</h1>
							<table className="table mt-5">
								<thead>
									<tr>
										<th>Title</th>
										<th>Genre</th>
										<th>Stock</th>
										<th>Rate</th>
										<th>Like</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{movies.map((movie) => (
										<tr key={movie._id}>
											<td>{movie.title}</td>
											<td>
												{movie.genre.name}
											</td>
											<td>
												{
													movie.numberInStock
												}
											</td>
											<td>
												{
													movie.dailyRentalRate
												}
											</td>
											<td>
												<Like
													like={
														movie.like
													}
													onClick={() =>
														this.handlerLike(
															movie
														)
													}
												/>
											</td>
											<td>
												<button
													onClick={() =>
														this.deleteMovie(
															movie
														)
													}
													className="btn-sm btn-danger"
												>
													delete
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<Pagination
								itemCount={filteredMovie.length}
								currentPage={currentPage}
								pageSize={pageSize}
								onPageChange={this.handlerPageChange}
							/>
						</div>
					</div>
				</main>
			</React.Fragment>
		);
	}
}

export default Movies;
