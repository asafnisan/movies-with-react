import React, { Component } from 'react';
import { Header, Container, Rating, Dropdown, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import client from './client'

class StartPage extends React.Component {
    handleLoadMore = (e) => {
        this.props.onLoading(true)
        const search = this.refs.searchbox.value
        const pageNum = this.props.pageNumber
        client().getMovies(
            search,
            (movies) => {
                this.props.onLoadMore(movies)
                this.props.onLoading(false)
            }, 
            pageNum
        );
    }
    handleSubmit = (e) => {
        this.props.onLoading(true)
        const search = this.refs.searchbox.value;
        this.props.onQuery(search)
        e.preventDefault()
        client().getMovies(
            search,
            (movies) => {
                this.props.onSubmit(movies); 
                this.props.onLoading(false)
            }, 
            1
        );
    }
    render() {
        const movieList = this.props.listOfLoadedMovies.length != 0 ? this.props.listOfLoadedMovies.map((val,i) => {
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
                            <input type='text' ref="searchbox" placeholder="search..." value={this.props.query} onChange={(e) => this.props.onQuery(e.target.value)}></input>
                        </div>
                    </form>
                </Container>
                <hr style={{'border-color':'white','border':'0'}}/>
                <hr style={{'border-color':'white','border':'0'}}/>
                <Container>
                    <hr style={{'border-color':'white','border':'0'}}/>
                    <hr style={{'border-color':'white','border':'0'}}/>
                    {this.props.isLoading && !movieList  ? <p style={{color:'red'}}>Fetching movies...</p> : null}
                    {this.props.isLoading && movieList  ? movieList : movieList}
                    <hr style={{'border-color':'white','border':'0'}}/>
                    <hr style={{'border-color':'white','border':'0'}}/>
                    <Container>
                        {movieList ? <Button onClick={this.handleLoadMore}>{this.props.isLoading && movieList  ? 'Fetching movies' : 'Load movies'}</Button> : null}
                    </Container>
                </Container>
            </div>
        )
    }
}

export default StartPage