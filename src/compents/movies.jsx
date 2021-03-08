import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
class Movies extends Component {
	state = {
		movies: getMovies(),
	};
	deleteMovie = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
		console.log(this.state.movies.length);
	};
	render() {
		if (this.state.movies.length === 0)
			return (
				<main className="container">
					<h1>no movie in the play list</h1>
				</main>
			);
		return (
			<React.Fragment>
				<main className="container">
					<h1>{this.state.movies.length}</h1>
					<table className="table mt-5">
						<thead>
							<tr>
								<th>Title</th>
								<th>Genre</th>
								<th>Stock</th>
								<th>Rate</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{this.state.movies.map((movie) => (
								<tr key={movie._id}>
									<td>{movie.title}</td>
									<td>{movie.genre.name}</td>
									<td>{movie.numberInStock}</td>
									<td>{movie.dailyRentalRate}</td>
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
				</main>
			</React.Fragment>
		);
	}
}

export default Movies;
