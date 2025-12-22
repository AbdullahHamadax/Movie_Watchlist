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
    `http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchInput.value}`
  );
  const searchData = await response.json();

  if (searchData.Response === "False") {
    renderError();
    return;
  }

  const moviePromises = searchData.Search.map(async (movie) => {
    const detailRes = await fetch(
      `http://www.omdbapi.com/?apikey=${APIKEY}&i=${movie.imdbID}`
    );
    return await detailRes.json();
  });

  const movieDetailsArray = await Promise.all(moviePromises);

  movieCard.innerHTML = movieDetailsArray
    .map((movie) => {
      const posterSource =
        movie.Poster === "N/A" ? "placeholder.png" : movie.Poster;
      return `<div
              class="flex gap-5 sm:gap-7 items-start border-b-[0.094rem] border-[#2C2C2C] pb-7 pt-5"
            >
              <img
                src="${posterSource}"
                alt="${movie.Title}"
                class="w-24 sm:w-28 rounded-sm shadow-lg shrink-0"
                onerror="this.src='placeholder.png'" 
              />
              <div class="flex flex-col gap-3">
                <div class="flex items-center flex-wrap gap-3">
                  <h2 class="text-lg font-bold">${movie.Title}</h2>
                  <div class="flex items-center gap-[0.36rem] text-sm">
                    <svg
                      class="size-4 text-[#FEC84B]"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path
                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                      />
                    </svg>
                    <span>${movie.imdbRating}</span>
                  </div>
                </div>
                <div class="flex items-center flex-wrap gap-x-5 gap-y-2 text-xs">
                  <span>${movie.Runtime}</span>
                  <span>${movie.Genre}</span>
                  <button
                    class="flex items-center gap-1.5 text-xs hover:text-[#38BDF8] transition-colors cursor-pointer"
                  >
                    <svg
                      class="size-4"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="8" cy="8" r="8" fill="white" />
                      <path
                        d="M8 5V11M5 8H11"
                        stroke="#121212"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                    Add to watchlist
                  </button>
                </div>
                <p class="text-[#A5A5A5] text-sm leading-relaxed">${movie.Plot}</p>
              </div>
            </div>`;
    })
    .join("");

  hideError();
  hideDefaultState();
}

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
