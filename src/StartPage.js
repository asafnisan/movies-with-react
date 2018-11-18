import React, { Component } from 'react';
import { Header, Container, Rating, Dropdown, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import client from './client'

class StartPage extends React.Component {
    state = { 
        movies: [] 
    };
    handleSubmit = (e) => {
        e.preventDefault()
        const search = this.refs.searchbox.value
        console.log(this.refs.searchbox.value);
        client().getMovies(search,(movies) => {this.setState({ movies: movies })});
    }
    render() {
        const movieList = this.state.movies.length != 0 ? this.state.movies.Search.map((val,i) => {
            const title = val.Title;
            const year = val.Year;
            return (
                <Container key={val.imdbID}>
                    <Rating />
                    <Link to="/MovieDetail">
                        {title}({year})
                    </Link>
                </Container>
            )
        }) : null
        return (
            <div>
                <Container>
                    <form className='ui form' onSubmit={this.handleSubmit}>
                        <div className='field'>
                            <input type='text' ref="searchbox" placeholder="search..."></input>
                        </div>
                    </form>
                </Container>
                <Container>
                    {movieList}
                    {movieList ? <Button>Load more</Button> : null}
                </Container>
            </div>
        )
    }
}

export default StartPage