import React, { Component } from 'react';
import StartPage from './StartPage';
import MovieDetail from './MovieDetail';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Button, Container, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import filmProjector from './film-projector.png'
import client from './client'

class App extends Component {
  state = {
    starredMovies: [], // should not be changed, working properly
    listOfLoadedMovies: [], // should not be changed, working properly
    listOfViewedMovies: {},
    movieDetailID: '',
    movieDetail: {},
    pageNumber: 1,
    query:'', 
    isLoading: false
  }
  saveToLocalStorage = (starredMovie) => {
    const StarredMovies = JSON.parse(localStorage.getItem('starredMovies'));
    if(StarredMovies.indexOf(starredMovie) === -1) {
      StarredMovies.push(starredMovie);
      localStorage.setItem('starredMovies',JSON.stringify(StarredMovies))
      this.setState({ starredMovies: StarredMovies })
    } else {
      // unstar: remove the starred movie from localStorage
      return 
    }
  }
  handleStar = (starredMovie) => {
    this.saveToLocalStorage(starredMovie)
  }
  handleToMovieDetail = (movieID) => {
    this.setState({
      movieDetailID: movieID,
    })
    if(Object.keys(this.state.listOfViewedMovies).indexOf(movieID) !== -1) {
      return
    }
    client().getMovie(movieID, (movie) => {
      const viewedMovies = Object.assign({}, this.state.listOfViewedMovies)
      viewedMovies[movieID] = movie
      this.setState({
        listOfViewedMovies: viewedMovies,
        movieDetail: movie,
      })
    })
    
  }
  handleQuerySubmit = (returnedListOfMovies) => {
    this.setState({
      listOfLoadedMovies: [...returnedListOfMovies],
      pageNumber: 2
    })
  }
  handleLoadMore = (returnedListOfMovies) => {
    this.setState({
      listOfLoadedMovies: [...this.state.listOfLoadedMovies, ...returnedListOfMovies],
      pageNumber: this.state.pageNumber + 1
    })
  }
  handleQuery = (query) => {
    this.setState({ query: query})
  }
  handleBackButton = () => {
    this.setState({
      movieDetail: {}
    })
  }
  StartPageWithHandlers = () => {
    return (
      <StartPage 
        onStar={this.handleStar} 
        starredMovies={this.state.starredMovies} 
        toMovie={this.handleToMovieDetail}
        listOfLoadedMovies={this.state.listOfLoadedMovies}
        onSubmit={this.handleQuerySubmit}
        pageNumber={this.state.pageNumber}
        onLoadMore={this.handleLoadMore}
        onQuery={this.handleQuery}
        query={this.state.query}
      />
    )
  }
  DetailPageWithHandlers = () => {
    const starredMovies = JSON.parse(localStorage.getItem('starredMovies'));
    const isStarred = starredMovies.indexOf(this.state.movieDetailID) === -1 ? 0 : 1
    return (
      <MovieDetail 
        movieID={this.state.movieDetailID} 
        isStarred={isStarred}
        movie={this.state.movieDetail}
        viewedMovies={this.state.listOfViewedMovies}
        onBack={this.handleBackButton}
      />
    )
  }

  componentDidMount() {
    localStorage.starredMovies = localStorage.starredMovies ? localStorage.getItem('starredMovies') : '[]';
    this.setState({ starredMovies: JSON.parse(localStorage.getItem('starredMovies')) }) 
  }
  render() {
    return (
      <Router>
        <div>
            <img 
              className='ui centered image' 
              src={filmProjector} 
              style={{width:'55px','margin-top':'10px'}}
            />
          <Route exact path="/" component={this.StartPageWithHandlers} />
          {<Route path="/MovieDetail" component={this.DetailPageWithHandlers} />}
        </div>
      </Router>
    );
  }
}

export default App;
