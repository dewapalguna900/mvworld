import tempe from "tempe";
import img from "../../img/default_movie_poster.jpg";

class MovieItem extends HTMLElement {
    set movie(movie) {
        this._movie = movie;
        this.setAttribute("class", "col-md-3 mt-3");
        this.render();
    }

    render() {
        let poster_movie = "";
        if (this._movie.poster_path == null) {
            poster_movie = img;
        } else {
            poster_movie = `http://image.tmdb.org/t/p/w185/${this._movie.poster_path}`;
        }

        this.innerHTML = `<div class="card h-100">
		  <img src="${poster_movie}" class="card-img-top">
		  <div class="card-body">
		    <h5 class="card-title">${this._movie.title}</h5>
		    <p class="card-text">${tempe(this._movie.release_date).format('DD MMMM YYYY', 'id')}</p>
		    <a href="#" class="btn btn-primary btn-detail-movie" data-toggle="modal" data-target="#modalDetailMovie" data-id="${this._movie.id}">Detail Movie</a>
		  </div>
		</div>`;
    }
}

customElements.define("movie-item", MovieItem);