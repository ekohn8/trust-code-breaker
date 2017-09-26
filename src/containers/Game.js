import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Letter from '../components/Letter';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import getWord from '../utils/getWord';
import letterMatch from '../utils/letterMatch';

export default class Game extends Component {
    constructor(props){
        super(props)
            this.state = {
                secretWord:'',
                letterGuess:'',
                wordGuess:'',
                nGuesses: 0,
            }
        }

    componentWillMount() {
        let wordArray = getWord();
        this.setState({
            secretWord: wordArray,
        })
    }

    onChangeLetter = (field,value) => {
        let obj = {}
        obj[field] = value
        this.setState({
            letterGuess: obj[field]
        })
    }

    onChangeWord = (field,value) => {
        let obj = {}
        obj[field] = value
        this.setState({
            wordGuess: obj[field]
        })
    }

    flip = (int) => {
        let temp = this.state.secretWord;
        let letter = temp[int].props.letter;
        let previous = false;
        temp[int] = <Letter visible={!previous} letter={letter} />
        this.setState({
            secretWord: temp
        })
    }

    checkLetter = () => {
        let indexArray = letterMatch(this.state.letterGuess,this.state.secretWord);
        indexArray.map((item) => {this.flip(item.key)})
        this.clearInput()
        this.checkForWin()
    }

    checkWord = () => {
        let total = this.state.wordGuess.split("").filter((item,index) => {if(item === this.state.secretWord[index].props.letter){index++} return index})
        if(total.length === this.state.secretWord.length) {alert("Would you look at that!")}
        this.clearInput()

    }

    checkForWin = () => {
        let total = this.state.secretWord.filter((item) => {if(item.props.visible===true) return item})
        if(total.length === this.state.secretWord.length) {alert("Would you look at that!")}
    }

    clearInput = () => {
        document.getElementById("letterField").value = '';
        document.getElementById("letterField").value = '';
        this.setState({
            letterGuess: '',
            nGuesses: this.state.nGuesses+1,
        })
    }

  render() {
    let wordArray = this.state.secretWord;
    return (
        <Paper style={localStyles.container}>
            <AppBar
                title="Code Breaker"
            />
            <Paper style={localStyles.content}>
                {wordArray}
            </Paper>
            <Paper style={localStyles.flexRow}>
                <TextField
                    hintText=""
                    floatingLabelText="Guess a letter here"
                    style={localStyles.textInput}
                    onChange={this.onChangeLetter}
                    id = "letterField"
                />
                <RaisedButton
                    style={{marginTop: 30, marginBottom: 30}}
                    secondary={true}
                    label="Send Letter"
                    onClick={() => this.checkLetter()}
                 />
                <TextField
                    hintText=""
                    floatingLabelText="Guess the word here"
                    style={localStyles.textInput}
                    onChange={this.onChangeWord}
                    id = "wordField"
                />
                <RaisedButton
                    style={{marginTop: 30}}
                    secondary={true}
                    label="Send Word"
                    onClick={() => this.checkWord()}
                />
            </Paper>
            <Paper style={localStyles.flexRow}>


            </Paper>

            <RaisedButton
                disabled={true}
                label="Show me the answer"
            />
        </Paper>
    );
  }
}


const localStyles = {
    container: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        flex: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    },
    textInput: {
        justifyContent: 'center',
        alignItems: 'center',

    }
}
