import React, { Component } from 'react';
import { Button, Container, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

class SearchPage extends React.Component {
    render() {
        return (
            <div>
                <h3>You are viewing search results</h3>
                <Link to='/MovieDetail'>
                    <Button basic color='blue'>
                        To Movie Details 
                    </Button>  
                </Link>
            </div>
        )
    }
}

export default SearchPage