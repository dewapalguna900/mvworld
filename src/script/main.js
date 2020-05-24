import "./components/movie-list.js";
import "./components/search-component.js";
import tempe from "tempe";
import img from "../img/default_movie_poster.jpg";

function main() {
    const btnSearch = document.querySelector("#btn-search");
    const txtSearchMovie = document.querySelector("search-component");
    const selectFilterPencarian = document.querySelector("#optFilter");
    const TMDBApiKey = "7acf09ae1e7045cd9ab8996c9521d3b8";

    document.addEventListener("DOMContentLoaded", () => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDBApiKey}`)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.status_code == 7) {
                    alert(responseJson.status_message);
                } else {
                    const movieListElement = document.querySelector("movie-list");
                    movieListElement.movies = responseJson.results;

                    const buttonsDetailMovie = getAllBtnDetail();
                    eventDetailMovie(buttonsDetailMovie);
                }

            })
            .catch(errorResponse => alert(errorResponse));
    });

    const getAllBtnDetail = () => {
        return document.querySelectorAll(".btn-detail-movie");
    }

    const eventDetailMovie = btnDetailMovie => {
        btnDetailMovie.forEach(btnSingle => {
            btnSingle.addEventListener("click", function() {
                const idMovie = this.dataset.id;
                fetch(`https://api.themoviedb.org/3/movie/${idMovie}?api_key=${TMDBApiKey}`)
                    .then(response => response.json())
                    .then(responseJson => {
                        if (responseJson.status_code == 7) {
                            alert(responseJson.status_message);
                        } else {
                            setDetailMovie(responseJson);
                        }
                    })
                    .catch(errMsg => alert(errMsg));
            });
        })
    }

    const setDetailMovie = dataMovie => {
        const imgPath = (dataMovie.poster_path == null) ? img : `http://image.tmdb.org/t/p/w185/${dataMovie.poster_path}`;

        document.querySelector("#modalTitle").innerHTML = dataMovie.title;
        document.querySelector("#movie-title").innerHTML = dataMovie.title;
        document.querySelector("#poster-movie").src = imgPath;
        document.querySelector("#release-date").innerHTML = `Rilis: ${tempe(dataMovie.release_date).format('DD MMMM YYYY')}`;
        document.querySelector("#duration").innerHTML = `Durasi: ${dataMovie.runtime} Menit`;
        document.querySelector("#overview").innerHTML = dataMovie.overview;
        document.querySelector("#genreInclude").innerHTML = "Genre: " + dataMovie.genres.map(genre => `<strong>${genre.name}</strong>`).join(" | ");
        document.querySelector("#produserInclude").innerHTML = "Produser: " + dataMovie.production_companies.map(company => `<strong>${company.name}</strong>`).join(" | ");
        document.querySelector("#movie-homepage").innerHTML = dataMovie.title;

        if (dataMovie.homepage == "") {
            document.querySelector("#movie-homepage").removeAttribute("target");
        } else if (dataMovie.homepage == null) {
            document.querySelector("#movie-homepage").removeAttribute("target");
            document.querySelector("#movie-homepage").href = "";
        } else {
            document.querySelector("#movie-homepage").href = dataMovie.homepage;
        }
    }

    selectFilterPencarian.addEventListener("change", function() {
        switch (this.value) {
            case "judul":
                txtSearchMovie.value = "";
                txtSearchMovie.placeholder = "Contoh: Avengers";
                document.querySelector("#selectGenre").innerHTML = "";
                txtSearchMovie.disabled = false;
                break;
            case "tahun":
                txtSearchMovie.value = "";
                txtSearchMovie.placeholder = "Contoh: 2020";
                document.querySelector("#selectGenre").innerHTML = "";
                txtSearchMovie.disabled = false;
                break;
            case "genre":
                txtSearchMovie.value = "";
                txtSearchMovie.placeholder = "Pilih Opsi Genre di bawah.";
                txtSearchMovie.disabled = true;
                getAllGenre();
                break;
            default:
                txtSearchMovie.value = "";
                txtSearchMovie.placeholder = "Nama Movie/Animasi";
                document.querySelector("#selectGenre").innerHTML = "";
                txtSearchMovie.disabled = false;
                break;
        }
    });

    const getAllGenre = () => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDBApiKey}`)
            .then(response => response.json())
            .then(responseJson => {
                let selectElement = `
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="opsiGenre">Pilih Genre</label>
                  </div>
                  <select class="custom-select" id="opsiGenre">
                `;

                responseJson.genres.forEach(genre => {
                    selectElement += `
                    <option value="${genre.id}">${genre.name}</option>
                    `;
                })

                selectElement += `
                   </select>
                 </div>
                `;

                document.querySelector("#selectGenre").innerHTML = selectElement;
            })
            .catch(errorResponse => console.log(errorResponse));
    }

    btnSearch.addEventListener("click", function() {
        const filter = selectFilterPencarian.value;
        const genreSelected = document.querySelector("#opsiGenre");
        let url = "";

        switch (filter) {
            case "judul":
                url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDBApiKey}&query=${txtSearchMovie.value}`;
                break;
            case "tahun":
                url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDBApiKey}&query=${txtSearchMovie.value}&year=${txtSearchMovie.value}`;
                break;
            case "genre":
                url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDBApiKey}&with_genres=${genreSelected.value}`;
                break;
            default:
                url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDBApiKey}`;
                break;
        }

        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.status_code == 7) {
                    alert(responseJson.status_message);
                } else {
                    const movieListElement = document.querySelector("movie-list");
                    const contentTitle = document.querySelector("#content-title");

                    if (responseJson.results.length == 0) {
                        contentTitle.innerHTML = "-- Hasil Pencarian --";
                        movieListElement.innerHTML = `<p><em>Movie yang dicari tidak ditemukan.</em></p>`;
                    } else {
                        contentTitle.innerHTML = "-- List Movie --";
                        movieListElement.innerHTML = "";
                        movieListElement.movies = responseJson.results;

                        const buttonsDetailMovie = getAllBtnDetail();
                        eventDetailMovie(buttonsDetailMovie);
                    }
                }
            })
            .catch(errorResponse => console.log(errorResponse));
    });
}

export default main;