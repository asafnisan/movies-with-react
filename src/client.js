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
    return {
        getMovies
    }
}

export default client
