const APIKEY = "2869ad6eb45150034d0f7d861e6e58e7";
const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${APIKEY}&page=1`;

const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=${APIKEY}&query=`;

const main = document.querySelector("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  showMovies(respData.results);
  // respData.results.forEach((movie) => {
  //   const { poster_path, title, vote_average } = movie;

  //   const movieEl = document.createElement("div");
  //   movieEl.classList.add("movie");
  //   movieEl.innerHTML = `

  //       <img
  //         src="${IMGPATH + poster_path}"
  //         alt="${title}"
  //       />
  //       <div class="movie-info">
  //         <h3>${title}</h3>
  //         <span class = ${getClassByRate(vote_average)}>${vote_average}</span>
  //       </div>
  //     `;

  //   main.appendChild(movieEl);
  // });
  // return respData;
}

getMovies(APIURL);

function showMovies(movies) {
  //clear main
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
   
        <img
          src="${IMGPATH + poster_path}"
          alt="${title}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class = ${getClassByRate(vote_average)}>${vote_average}</span>
        </div>
        <div class = "overview">
        <h4>Overview</h4>
        ${overview}
        </div>
      `;

    main.appendChild(movieEl);
  });
}
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
    search.value = "";
  }
});
