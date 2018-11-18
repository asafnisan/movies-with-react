// client
function client() {
    function getMovies(search,success,pageNum) {
        const apiEndpoint = 'http://www.omdbapi.com/?apikey=aebd27fd';
        const query = apiEndpoint + '&s=' + search + '&page=' + pageNum;
        const movies = fetch(query).then(function(response){
            return response.json()
        }).then(function(myJson){
            success(myJson.Search)
        })
    }
    function getMovie(movieID,success){
        const apiEndpoint = 'http://www.omdbapi.com/?apikey=aebd27fd';
        const movieCall = apiEndpoint + '&i=' + movieID
        const movie = fetch(movieCall).then(function(response){
            return response.json()
        }).then(function(myJson){
            success(myJson)
        })
    }
    return {
        getMovies,
        getMovie
    }
}

export default client
