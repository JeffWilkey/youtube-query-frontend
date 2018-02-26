const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search'
const API_KEY = '' // Enter your api key here

function getDataFromApi(searchTerm, callback) {
    const query = {
        part: 'snippet',
        key: API_KEY,
        q: `${searchTerm}`
    }
    $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
    console.log(result);
    $(".js-search-results").append(`
        <div class="search-result">
            <div class="row">
                <div class="col-4">
                    <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
                        <img class="search-result-thumbnail" src="${result.snippet.thumbnails.medium.url}">
                    </a>
                </div>
                <div class="col-8">
                    <h3 class="search-result-title">${result.snippet.title}</h3>
                    <p class="search-result-description">${result.snippet.description}</p>
                    <p class="search-result-channel">
                        from: <a href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">${result.snippet.channelTitle}</a>
                    </p>
                </div>
            </div>
        </div>
    `)
}

function displayYoutubeSearchData(data) {
    $(".js-search-results").empty();
    const results = data.items.forEach(function(item) {
        renderResult(item);
    });
}


function watchSubmit() {
    $('.js-search').submit(event => {
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find('.js-query');
        const query = queryTarget.val();

        getDataFromApi(query, displayYoutubeSearchData);
    });
}

watchSubmit();
