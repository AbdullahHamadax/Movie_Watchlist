import renderMovieHtml from "./renderMovieFunction.js";
let savedMovies = JSON.parse(localStorage.getItem("movies-added-to-watchlist"));
const watchListDefaultState = document.getElementById(
  "watchlist-default-state"
);

let movieDetailsArray = [];

const APIKEY = "f0c686cd";
const movieCard = document.getElementById("movie-card");

init();

document.addEventListener("click", (e) => {
  const addedMovieId = e.target.dataset.movieId;
  const updatedWatchlist = savedMovies.filter((id) => id !== addedMovieId);
  movieDetailsArray = movieDetailsArray.filter(
    (movie) => movie.imdbID !== addedMovieId
  );
  localStorage.setItem(
    "movies-added-to-watchlist",
    JSON.stringify(updatedWatchlist)
  );

  savedMovies = JSON.parse(localStorage.getItem("movies-added-to-watchlist"));
  if (!savedMovies.length) {
    showWatchListDefaultState();
  }

  movieCard.innerHTML = renderMovieHtml(movieDetailsArray, true);
});

function hideWatchListDefaultState() {
  watchListDefaultState.classList.add("hidden");
}
function showWatchListDefaultState() {
  watchListDefaultState.classList.remove("hidden");
}

async function init() {
  if (savedMovies.length !== 0) {
    hideWatchListDefaultState();
    const moviePromises = savedMovies.map(async (movieId) => {
      const detailRes = await fetch(
        `https://www.omdbapi.com/?apikey=${APIKEY}&i=${movieId}`
      );
      return await detailRes.json();
    });

    movieDetailsArray = await Promise.all(moviePromises);

    movieCard.innerHTML = renderMovieHtml(movieDetailsArray, true);
  }
}
