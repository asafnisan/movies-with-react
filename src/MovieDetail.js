import React, { Component } from 'react';
import { Button, Container, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Movie from './Movie';

class MovieDetail extends React.Component {
    render() {
        const movie = Movie;
        return (
            <div>
                <Link to={'/'}>
                    <Button>back</Button>
                </Link>
                <Container>
                    <img src={Movie.Poster}/>
                </Container>
                <h1>{Movie.Title}</h1><h2>{Movie.imdbRating}</h2>
                <p>{Movie.Plot}</p>
                <ul>
                    <li>Year: {Movie.Year}</li>
                    <li>Director: {Movie.Director}</li>
                    <li>Duration: {Movie.Runtime}</li>
                </ul>
            </div>
        )
    }
}

export default MovieDetail