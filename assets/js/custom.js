$(document).ready(function () {

    getMovie('popularity.desc');

    getHeaderUserStatusElement(getLocalStorage("user"));

    $('#search').on('input', function () {
        var data = getLocalStorage("movie-data");
        var searchValue = $(this).val();

        if (searchValue == '') {
            var result = clearElement('.movie');
            if (result) {
                getMovie('popularity.desc');
            }
        }
        else {
            data.forEach(obj => renameKey(obj, 'title', 'value'));
            $(this).autocomplete({
                source: data,
                select: function (event, ui) {
                    var title = ui.item.title;
                    if (title != '') {
                        var result = clearElement(".movie");
                        if (result) {
                            addElement(".movie", ui.item);
                        }
                    }
                }
            });
        }
    });

    $('.movie__title').click(function(){
        alert("asd");
    });
});

function getHeaderUserStatusElement(user) {

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
}

function getMovie(sort) {

    const base_url = 'https://api.themoviedb.org/3/discover/movie';
    const sort_by = '?sort_by=' + sort;
    const api_key = '&api_key=676e896f3bb979d4566a1fea83360997';
    const page = '&page=' + 1;

    const api_url = base_url + sort_by + api_key + page;

    // output
    // https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=676e896f3bb979d4566a1fea83360997&page=1;

    fetch(api_url).then(res => res.json()).then(data => {
        showMovie(data.results);
        localStorage.setItem('movie-data', JSON.stringify(data.results));
    });


}

function showMovie(data) {

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
                    ${overview.substring(0, 65) + "..."}
                </div>
                <div class="d-flex justify-content-between">
                    <a href="#" class="btn btn-outline-warning movie__btn">
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
    return JSON.parse(localStorage.getItem(key));
}

function clearElement(key) {
    var element = $(key);

    if (element != null) {
        element.html('');
        return true;
    }
    return false;
}

function addElement(element, data) {
    const { title, value, poster_path, vote_average, overview, release_date } = data;

    const movieItem = `
        <div class="movie__item">
            <div class="movie__info">
                <div class="movie__title">${title == null ? value : title}</div>
                <div class="d-flex justify-content-between align-items-center my-4">
                    <div class="movie__average">${vote_average}</div>
                    <div class="movie__date">${release_date}</div>
                </div>
                <div class="movie__description my-4">
                    ${overview.substring(0, 65) + "..."}
                </div>
                <div class="d-flex justify-content-between">
                    <a href="#" class="btn btn-outline-warning movie__btn">
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
    $(element).append(movieItem);
}

function renameKey(obj, old_key, new_key) {
    if (old_key !== new_key) {
        Object.defineProperty(obj, new_key, Object.getOwnPropertyDescriptor(obj, old_key));
        delete obj[old_key];
    }
}