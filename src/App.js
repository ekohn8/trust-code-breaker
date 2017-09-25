import React, { Component } from 'react';
import Radium from 'radium';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Letter from './components/Letter';
import './App.css';

class App extends Component {
  render() {
    return (
        <Paper style={localStyles.container} zDepth={1}>
            <AppBar 
                title="Code Breaker" 
            />
            <Paper zDepth={1} style={localStyles.content}>
                <Letter letter='h' />
                <Letter letter='e'/>
                <Letter letter='l'/>
                <Letter letter='l'/>
                <Letter letter='o' />
            </Paper>
        </Paper>
    );
  }
}

export default Radium(App);

const localStyles = {
    container: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}