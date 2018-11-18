// client
function client() {
    function getMovies(search,success) {
        const apiEndpoint = 'http://www.omdbapi.com/?apikey=aebd27fd';
        const query = apiEndpoint + '&s=' + search;
        const movies = fetch(query).then(function(response){
            return response.json()
        }).then(function(myJson){
            success(myJson)
        })
    }
    return {
        getMovies
    }
}

export default client
