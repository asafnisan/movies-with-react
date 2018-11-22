import React, { Component } from 'react';
import { Button, Container, Header, Rating } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Movie from './Movie';
import client from './client'
import grey from './grey.jpg'

class MovieDetail extends React.Component {
    render() {
        const isViewed = Object.keys(this.props.viewedMovies).indexOf(this.props.movieID) === -1 ? false : true
        const trialMovie = isViewed ? this.props.viewedMovies[this.props.movieID] : this.props.movie
        const keyLength = Object.keys(trialMovie)
        const movie = trialMovie
        return (
            <div className='' style={{'margin-top':'5px'}}>
                <Container>
                    <Link to={'/'}>
                        <Button onClick={() => this.props.onBack()}>back</Button>
                    </Link>
                    <img className='ui medium floated image rounded' src={keyLength === 0 ? null : (this.props.isLoading ? grey :movie.Poster)}/>
                    <div onClick={() => this.props.onStar(movie.imdbID)} style={{display:'inline','marginTop':'20px'}}>
                        <Rating size='massive' defaultRating={this.props.isStarred}/>
                    </div>
                </Container>
                <Container>
                    <h1>{keyLength === 0 ? null : (this.props.isLoading ? '...' :movie.Title)}</h1><h2>{keyLength === 0 ? null : (this.props.isLoading ? '...' :movie.imdbRating)}</h2>
                    <p>{keyLength === 0 ? null : (this.props.isLoading ? '...' :movie.Plot)}</p>
                    <ul style={{'list-style':'none'}}>
                        <li>Year: {keyLength === 0 ? null : (this.props.isLoading ? '...' :movie.Year)}</li>
                        <li>Director: {keyLength === 0 ? null : (this.props.isLoading ? '...' :movie.Director)}</li>
                        <li>Duration: {keyLength === 0 ? null : (this.props.isLoading ? '...' :movie.Runtime)}</li>
                    </ul>
                </Container>
            </div>
        )
    }
}

export default MovieDetail