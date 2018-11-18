import React, { Component } from 'react';
import StartPage from './StartPage';
import SearchPage from './SearchPage';
import MovieDetail from './MovieDetail';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Button, Container, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import filmProjector from './film-projector_1.png'



class App extends Component {
  state = {
    starredMovies: [

    ],
    movieDetailID: ''
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
    console.log('going to:' + movieID)
    this.setState({ movieDetailID: movieID })
  }
  StartPageWithHandlers = () => {
    return (
      <StartPage onStar={this.handleStar} starredMovies={this.state.starredMovies} toMovie={this.handleToMovieDetail}/>
    )
  }
  detailPageWithHandlers = () => {
    return (
      <MovieDetail movieID={this.state.movieDetailID} />
    )
  }

componentDidMount() {
  localStorage.starredMovies = localStorage.starredMovies ? localStorage.getItem('starredMovies') : '[]';
  this.setState({ starredMovies: JSON.parse(localStorage.getItem('starredMovies')) }) 
}
  render() {
    const path = window.location.pathname
    return (
      <Router>
        <div>
          <hr style={{'border-color':'white','border':'0'}}/>
          <hr style={{'border-color':'white','border':'0'}}/>
          <img className='ui mini centered image' src={filmProjector}/>
          <hr style={{'border-color':'white','border':'0'}}/>
          <hr style={{'border-color':'white','border':'0'}}/>
          <Route exact path="/" component={this.StartPageWithHandlers} />
          <Route exact path="/SearchPage" component={SearchPage} />
          <Route path="/MovieDetail" component={this.detailPageWithHandlers} />
        </div>
      </Router>
    );
  }
}

export default App;
