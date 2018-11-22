import React, { Component } from 'react';
import { Container, Rating, Button, Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import client from './client'

class SearchResultsPage extends React.Component {
    handleLoadMore = (e) => {
        this.props.onLoading(true)
        const search = this.refs.searchbox.value
        const pageNum = this.props.pageNumber
        client().getMovies(
            search,
            (movies) => {
                if(movies === undefined) {
                    this.props.onLoadMore([]); 
                    this.props.onLoading(false)
                } else {
                    this.props.onLoadMore(movies); 
                    this.props.onLoading(false)
                }
            }, 
            pageNum
        );
    }
    handleSubmit = (e) => {
        this.props.onLoading(true);
        const search = this.refs.searchbox.value;
        this.props.onQuery(search)
        e.preventDefault()
        client().getMovies(
            search,
            (movies) => {
                if(movies === undefined) {
                    this.props.onSubmit([]); 
                    this.props.onLoading(false)
                } else {
                    this.props.onSubmit(movies); 
                    this.props.onLoading(false)
                }
            }, 
            1
        );
    }
    render() {
        const isNewQuery = this.props.queryHistory !== this.props.query;
        
        //filter(movie => {return this.props.selectedYears.indexOf(movie.Year) != -1}) : []
        const movieList = this.props.listOfLoadedMovies.length != 0 ? this.props.listOfLoadedMovies.
        map((val,i) => {
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
        const filteredMovies = movieList !== null && movieList.length > 0 ? movieList.filter((mov) => (this.props.selectedYears.indexOf(mov.props.children[1].props.children[2]) != -1)) : []
        console.log('here are new movies')
        console.log(filteredMovies)
        let yearList = this.props.listOfLoadedMovies ? this.props.listOfLoadedMovies.map(val => val.Year) : []
        let allYears = [];
        yearList.forEach(year => {
            if(allYears.indexOf(year) === -1) {
                allYears.push(year)
            }
        })
        allYears = allYears.sort()
        return (
            <div>
                <hr style={{'borderColor':'white','border':'0'}}/>
                <hr style={{'borderColor':'white','border':'0'}}/>
                <Container>
                    <form className='ui form' onSubmit={this.handleSubmit}>
                        <div className='field'>
                            <input type='text' ref="searchbox" placeholder="search..." value={this.props.query} onChange={(e) => this.props.onQuery(e.target.value)}></input>
                        </div>
                    </form>
                    {(movieList && !isNewQuery) || (movieList && isNewQuery && !this.props.isLoading)  ? 
                        <div style={{marginTop:'10px'}}>
                            <Dropdown ref='dropdown'
                                placeholder='Select year' 
                                scrolling
                                multiple
                                selection
                                options={
                                    allYears.map(year => ({ text:year, value:year}))
                                }
                                onChange={(e, {value}) => {
                                    //console.log(value);
                                    this.props.onSelectYears(value)
                                }
                                }
                            />
                        </div> : 
                        null
                    }
                </Container>
                <hr style={{'borderColor':'white','border':'0'}}/>
                <hr style={{'borderColor':'white','border':'0'}}/>
                <Container>
                    <hr style={{'borderColor':'white','border':'0'}}/>
                    <hr style={{'borderColor':'white','border':'0'}}/>
                    {this.props.isLoading && !movieList  ? <p style={{color:'red'}}>Fetching movies...</p> : null}
                    {this.props.isLoading && movieList && isNewQuery  ? <p style={{color:'red'}}>Fetching movies...</p> : (filteredMovies.length > 0 ? filteredMovies : movieList)}
                    <hr style={{'borderColor':'white','border':'0'}}/>
                    <hr style={{'borderColor':'white','border':'0'}}/>
                    <Container>
                        {movieList && !isNewQuery ? 
                            <Button onClick={this.handleLoadMore}>
                                {this.props.isLoading && movieList  ? 
                                'Fetching movies' : 
                                'Load movies'}
                            </Button> : 
                            (movieList && isNewQuery && !this.props.isLoading ? (
                                <Button onClick={this.handleLoadMore}>
                                    {this.props.isLoading && movieList  ? 
                                    'Fetching movies' : 
                                    'Load movies'}
                                </Button>) : 
                                null 
                            )
                        }
                    </Container>
                </Container>
            </div>
        )
    }
}

export default SearchResultsPage