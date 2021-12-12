$(document).ready(function() {

    getMoview();

    // $('.movie').pagination({
    //     dataSource: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    //     pageSize: 5,
    //     pageRange: null,
    //     showPageNumbers: true,
    //     callback: function(data, pagination) {
    //         var html = template(data);
    //         dataContainer.append(html);
    //     }
    // })


});

function getMoview() {
    const api_url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=676e896f3bb979d4566a1fea83360997&page=1';

    fetch(api_url).then(res => res.json()).then(data => {
        showMoview(data.results);
    });
}

function showMoview(data) {

    console.log(data);
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
                    ${overview.substring(0,65)}
                </div>
                <div class="d-flex justify-content-between">
                    <a href="javascript:;" class="movie__btn movie__hover-btn">
                        Read More
                    </a>
                    <div class="movie__btn">
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