import React, { Component } from 'react';
import StartPage from './StartPage';
import SearchPage from './SearchPage';
import MovieDetail from './MovieDetail';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Button, Container, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import movieCamera from './movie-camera.png'

class App extends Component {
  render() {
    const path = window.location.pathname
    return (
      <Router>
        <div>
          <img className='ui mini centered image' src={movieCamera}/>
          <Route exact path="/" component={StartPage} />
          <Route exact path="/SearchPage" component={SearchPage} />
          <Route path="/MovieDetail" component={MovieDetail} />
        </div>
      </Router>
    );
  }
}

export default App;
