import renderMovieHtml from "./renderMovieFunction.js";

const defaultStateContainer = document.getElementById("default-state");
const movieCard = document.getElementById("movie-card");
const defaultStateText = document.getElementById("default-state-text");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const filmReelIcon = document.getElementById("main-icon");
const APIKEY = "f0c686cd";
searchBtn.addEventListener("click", handleSearch);

async function handleSearch() {
  if (!searchInput.value) {
    renderError();
    return;
  }

  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${APIKEY}&s=${searchInput.value}`
  );
  const searchData = await response.json();

  if (searchData.Response === "False") {
    renderError();
    return;
  }

  const moviePromises = searchData.Search.map(async (movie) => {
    const detailRes = await fetch(
      `https://www.omdbapi.com/?apikey=${APIKEY}&i=${movie.imdbID}`
    );
    return await detailRes.json();
  });

  const movieDetailsArray = await Promise.all(moviePromises);

  movieCard.innerHTML = renderMovieHtml(movieDetailsArray, false);

  hideError();
  hideDefaultState();
}

const moviesWatchlist =
  JSON.parse(localStorage.getItem("movies-added-to-watchlist")) || [];

document.addEventListener("click", (e) => {
  const addedMovieId = e.target.dataset.movieId;

  if (addedMovieId && !moviesWatchlist.includes(addedMovieId)) {
    moviesWatchlist.push(addedMovieId);
    localStorage.setItem(
      "movies-added-to-watchlist",
      JSON.stringify(moviesWatchlist)
    );
  }
});

function renderError() {
  showDefaultState();
  filmReelIcon.classList.add("hidden");
  defaultStateText.textContent =
    "Unable to find what you’re looking for. Please try another search.";

  movieCard.classList.add("hidden");
}

function hideError() {
  defaultStateText.textContent = ``;
  movieCard.classList.remove("hidden");
}

function hideDefaultState() {
  defaultStateContainer.classList.add("hidden");
}

function showDefaultState() {
  defaultStateContainer.classList.remove("hidden");
}
