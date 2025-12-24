export default function renderMovieHtml(movie, isWatchlistPage) {
  const moviesToRender = isWatchlistPage ? [...movie].reverse() : movie;
  return moviesToRender
    .map((movie) => {
      const posterSource =
        movie.Poster === "N/A" ? "placeholder.png" : movie.Poster;

      const buttonText = isWatchlistPage
        ? "Remove from watchlist"
        : "Add to watchlist";
      const icon = isWatchlistPage
        ? `<svg 
                      class="size-4" 
                      viewBox="0 0 16 16" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="8" cy="8" r="8" fill="white" />
                      <path 
                        d="M5 8H11" 
                        stroke="#121212" 
                        stroke-width="2" 
                        stroke-linecap="round" 
                      />
                    </svg>`
        : `                    <svg
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
                    </svg>`;
      const hoverColor = isWatchlistPage
        ? "hover:text-[#FB7185]"
        : "hover:text-[#38BDF8]";

      const borderColor = isWatchlistPage
        ? "border-[#E5E7EB]"
        : "border-[#2C2C2C]";

      return `<div
              class="flex gap-5 sm:gap-7 items-start border-b-[0.094rem] ${borderColor} pb-7 pt-5"

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
                    class="flex items-center gap-1.5 text-xs ${hoverColor} transition-colors cursor-pointer"
                    data-movie-id=${movie.imdbID}
                  >
                    ${icon}
                    ${buttonText}
                  </button>
                </div>
                <p class="text-[#A5A5A5] text-sm leading-relaxed">${movie.Plot}</p>
              </div>
            </div>`;
    })
    .join("");
}
let toastContainer;
export function showToast(message, type) {
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className =
      "fixed bottom-5 right-5 flex flex-col-reverse gap-2 items-end";
    document.body.append(toastContainer);
  }

  const toast = document.createElement("div");
  const bgColor = type === "error" ? "bg-[#FB7185]" : "bg-[#38BDF8]";

  toast.className = `${bgColor} p-4 rounded-md shadow-lg font-bold text-slate-900`;
  toast.textContent = message;

  toastContainer.append(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}
