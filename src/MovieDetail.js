import React, { Component } from 'react';
import { Button, Container, Header, Rating } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Movie from './Movie';
import client from './client'

class MovieDetail extends React.Component {
    state = {
        movie: {},
    }
    componentDidMount(){
        console.log('reached movie:'+this.props.movieID)
        client().getMovie(this.props.movieID, (movie) => this.setState({ movie: movie}))
    }
    render() {
        const movie = this.state.movie;
        return (
            <div className=''> 
                <Container>
                    <Link to={'/'}>
                        <Button>back</Button>
                    </Link>
                    <img className='ui medium floated image rounded' src={movie.Poster}/>
                    <Rating size='massive right floated' defaultRating={this.props.isStarred}/>
                </Container>
                <Container>
                    <h1>{movie.Title}</h1><h2>{movie.imdbRating}</h2>
                    <p>{movie.Plot}</p>
                    <ul style={{'list-style':'none'}}>
                        <li>Year: {movie.Year}</li>
                        <li>Director: {movie.Director}</li>
                        <li>Duration: {movie.Runtime}</li>
                    </ul>
                </Container>
            </div>
        )
    }
}

export default MovieDetail