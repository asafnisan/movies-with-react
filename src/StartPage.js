import React, { Component } from 'react';
import { Header, Container, Rating, Dropdown, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import client from './client'

class StartPage extends React.Component {
    state = { 
        movies: [],
        pageNumber: 1
    };
    handleLoadMore = (e) => {
        const search = this.refs.searchbox.value
        const pageNum = this.state.pageNumber
        client().getMovies(
            search,
            (movies) => {
                this.setState({ movies: [...this.state.movies, ...movies] });
                console.log(movies)
            }, 
            pageNum
        );
        this.setState({ pageNumber: this.state.pageNumber + 1})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({ pageNumber: 1, movies:[]}, () => {
            const search = this.refs.searchbox.value
            const pageNum = this.state.pageNumber
            console.log(this.refs.searchbox.value);
            client().getMovies(
                search,
                (movies) => {
                    this.setState({ movies: [...this.state.movies, ...movies] });
                    console.log(movies)
                }, 
                pageNum
            );
            this.setState({ pageNumber: this.state.pageNumber + 1})
        })
    }
    render() {
        const movieList = this.state.movies.length != 0 ? this.state.movies.map((val,i) => {
            const title = val.Title;
            const year = val.Year;
            const id = val.imdbID;
            return (
                <div key={val.imdbID}>
                    <div style={{display:'inline'}} id={id} onClick={() => this.props.onStar(id)}>
                        <Rating id={id} defaultRating={this.props.starredMovies.indexOf(id) === -1 ? 0 : 1} />
                    </div>
                    
                    <Link to="/MovieDetail" id={id} onClick={() => this.props.toMovie(id)}>
                        {title}({year})
                    </Link>
                </div>
            )
        }) : null
        return (
            <div>
                <hr style={{'border-color':'white','border':'0'}}/>
                <hr style={{'border-color':'white','border':'0'}}/>
                <Container>
                    <form className='ui form' onSubmit={this.handleSubmit}>
                        <div className='field'>
                            <input type='text' ref="searchbox" placeholder="search..."></input>
                        </div>
                    </form>
                </Container>
                <hr style={{'border-color':'white','border':'0'}}/>
                <hr style={{'border-color':'white','border':'0'}}/>
                <Container>
                    <hr style={{'border-color':'white','border':'0'}}/>
                    <hr style={{'border-color':'white','border':'0'}}/>
                    {movieList}
                    <hr style={{'border-color':'white','border':'0'}}/>
                    <hr style={{'border-color':'white','border':'0'}}/>
                    <Container>
                        {movieList ? <Button onClick={this.handleLoadMore}>Load more</Button> : null}
                    </Container>
                </Container>
            </div>
        )
    }
}

export default StartPage