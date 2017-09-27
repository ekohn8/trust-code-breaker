import React, { Component } from 'react';
import {
    Paper,
    AppBar,
    RaisedButton,
    TextField,
    Drawer,
    MenuItem
 } from 'material-ui';
import Letter from '../components/Letter';
import getWord from '../utils/getWord';
import letterMatch from '../utils/letterMatch';
import { callApi } from '../helpers'
import {
  Route,
  Link
} from 'react-router-dom'

export default class Trust extends Component {
    constructor(props){
        super(props)
            this.state = {

            }
        }

  render() {
    return (
        <Paper style={localStyles.container}>Hello!</Paper>
    );
  }
}


const localStyles = {
    container: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}
