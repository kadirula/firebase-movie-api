$(document).ready(function() {
    getMovie('popularity.desc');

    console.log(localStorage.getItem("user"));


    var user = getLocalStorage("user");

    let navItem = '';
    if (user != null) {
        navItem = `
            <a href="javascript:;" class="nav-link fw-bold text-white" id="sign-out">            
                Çıkış Yap
            </a>
        `;
    } else {
        navItem = `
            <a class="nav-link fw-bold text-white" href="login.html">            
                Giriş Yap
            </a>
        `;
    }

    $('.auth-li').html(navItem);

});

function getMovie(sort) {

    const base_url = 'https://api.themoviedb.org/3/discover/movie';
    const sort_by = '?sort_by=' + sort;
    const api_key = '&api_key=676e896f3bb979d4566a1fea83360997';
    const page = '&page=' + 1;

    const api_url = base_url + sort_by + api_key + page;

    // output
    // https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=676e896f3bb979d4566a1fea83360997&page=1;

    fetch(api_url).then(res => res.json()).then(data => {
        showMoview(data.results);
    });
}

function showMoview(data) {

    data.forEach(movie => {

        const { title, poster_path, vote_average, overview, release_date } = movie;

        const movieItem = `
        <div class="movie__item">
            <div class="movie__info">
                <div class="movie__title">${title}</div>
                <div class="d-flex justify-content-between align-items-center my-4">
                    <div class="movie__average">${vote_average}</div>
                    <div class="movie__date">${release_date}</div>
                </div>
                <div class="movie__description my-4">
                    ${overview.substring(0,65) + "..."}
                </div>
                <div class="d-flex justify-content-between">
                    <a href="javascript:;" class="btn btn-outline-warning">
                        Read More
                    </a>
                    <div class="btn btn-outline-warning">
                        <i class="far fa-star"></i>
                    </div>
                </div>
            </div>
            <div class="movie__media">
                <img src="https://image.tmdb.org/t/p/w500/${poster_path}" class="movie__img" alt="">
            </div>
        </div>
        `;

        $('.movie').append(movieItem);

    });
}

function getLocalStorage(key) {
    return localStorage.getItem(key);
}