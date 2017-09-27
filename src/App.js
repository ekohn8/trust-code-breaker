import React, { Component } from 'react';
import Radium from 'radium';
import Game from './containers/Game';
import './App.css';
import Trust from './containers/Trust'
import {
    Paper,
    AppBar,
    RaisedButton,
    TextField,
    Drawer,
    MenuItem
 } from 'material-ui';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        }
    }

    handleToggle = () => {
        this.setState({open: !this.state.open})
    }


  render() {
    return (
            <Paper style={localStyles.container}>
                <AppBar
                    title="Code Breaker"
                    onLeftIconButtonTouchTap={this.handleToggle}
                />
                <Drawer
                    open={this.state.open}
                    docked={false}
                    onRequestChange={(open) => this.setState({open})}
                    >
                    <MenuItem
                        onClick={this.handleToggle}
                        containerElement={<Link to="/" />}
                        >
                            Glorified Hangman Game
                    </MenuItem>
                    <MenuItem
                        onClick={this.handleToggle}
                        containerElement={<Link to="/trust" />}
                        >
                            Trust Game (Higher Stakes Baby)
                    </MenuItem>
                </Drawer>
                {/* Here is where all the routing is done */}
                <Switch>
                    <Route exact path="/" component={Game} />
                    <Route path="/trust" component={Trust} />
                </Switch>

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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
}
