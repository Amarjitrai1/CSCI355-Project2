/*----------- RETRIEVING INITIAL MOVIES -----------*/
const API_URL = '/api/initial'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = '/api/search?query='

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = search.value
    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)
        search.value = ''
        //Scroll the user down and change the title of the section
        window.location.replace("#movies");
        document.querySelector("#moviesSectionTitle").innerHTML = `Showing results for "${searchTerm}"`
    } else {
        window.location.reload()
    }
})

/*----------- CHANGE HEADER ON SCROLL -----------*/
window.addEventListener('scroll', headerAdjustScroll)
function headerAdjustScroll() {
  if (window.scrollY > 120) {
    document.getElementsByClassName('nav')[0].classList.add('active');
  } else
    document.getElementsByClassName('nav')[0].classList.remove('active')
}

/*----------- USING SCROLL REVEAL TO ANIMATE IN ELEMENTS -----------*/
const srev = ScrollReveal({
  origin: 'top',
  distance: '250px',
  duration: 1500,
  delay: 100,
  // reset: true
})
srev.reveal(`.recommended-movies`, { origin: 'right', delay:200});
srev.reveal(`.recommended`, { origin: 'top',delay:100 });
srev.reveal(`#movies`, { origin: 'bottom',delay:400 });


// ----------------- RIPPLE EFFECT --------------------------- //
const buttons = document.querySelectorAll('.ripple')
buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const x = e.pageX
        const y = e.pageY

        const buttonTop = e.target.offsetTop
        const buttonLeft = e.target.offsetLeft

        const xInside = x - buttonLeft
        const yInside = y - buttonTop

        const circle = document.createElement('span')
        circle.classList.add('circle')
        circle.style.top = yInside + 'px'
        circle.style.left = xInside + 'px'

        this.appendChild(circle)

        setTimeout(() => circle.remove(), 500)
    })
})
