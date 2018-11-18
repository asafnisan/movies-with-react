import React, { Component } from 'react';
import { Header, Container, Rating, Dropdown, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Movies from './Movies';

class SearchPage extends React.Component {
    state = {};
    componentDidMount() {
        
    }
    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.refs.searchbox.value);
    }
    handleStar = (e, { rating, maxRating }) => {
        console.log(e, rating, maxRating)
    }
    render() {
        const years = [
            {
                text: '2019',
                value: '2019'
            },
            {
                text: '2018',
                value: '2018'
            },
            {
                text: '2017',
                value: '2017'
            }
        ]
        const movieList = Movies.Search.map((val,i) => {
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
        })
        return (
            <div>
                <Container>
                    <form className='ui form' onSubmit={this.handleSubmit}>
                        <div className='field'>
                            <input type='text' ref="searchbox" placeholder="search..."></input>
                        </div>
                    </form>
                    <Dropdown placeholder='Select movie year' selection options={years}/>
                </Container>
                <Container>
                    {movieList}
                    <Button>Load more</Button>
                </Container>
            </div>
        )
    }
}

export default SearchPage