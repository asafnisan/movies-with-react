import React, { Component } from 'react';
import { Button, Container, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

class MovieDetail extends React.Component {
    render() {
        return (
            <div>
                <h3>You are viewing a movie detail</h3>
                <Link to='/SearchPage'>
                    <Button basic color='blue'>
                        To Search Page  
                    </Button>  
                </Link>
            </div>
        )
    }
}

export default MovieDetail