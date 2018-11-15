import React, { Component } from 'react';
import SearchPage from './SearchPage';
import MovieDetail from './MovieDetail';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Button, Container, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';



class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={SearchPage} />
          <Route path="/MovieDetail" component={MovieDetail} />
        </div>
      </Router>
    );
  }
}

export default App;
