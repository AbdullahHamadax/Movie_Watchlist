const defaultStateContainer = document.getElementById("default-state");
const defaultStateText = document.getElementById("default-state-text");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const filmReelIcon = document.getElementById("main-icon");
const APIKEY = "f0c686cd";
searchBtn.addEventListener("click", handleSearch);

function handleSearch() {
  if (!searchInput.value) {
    renderError();
    return;
  }
}

function renderError() {
  filmReelIcon.remove();
  defaultStateText.textContent =
    "Unable to find what you’re looking for. Please try another search.";
}
