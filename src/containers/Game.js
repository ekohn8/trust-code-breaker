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

export default class Game extends Component {
    constructor(props){
        super(props)
            this.state = {
                open: false,
                secretWord:'',
                letterGuess:'',
                wordGuess:'',
                nGuesses: 0,
                lastLetter: {
                    letter: '',
                    correct: true,
                },
                lastWord: {
                    word: '',
                    correct: true,
                },
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
        let backgroundColor = temp[int].props.backgroundColor;
        temp[int] = <Letter flash={false} visible={true} letter={letter} key={int}/>
        var flasher = setInterval(()=>{this.flash(int)},250)
        var clear = setTimeout(()=>{clearInterval(flasher);this.setState({secretWord: temp,
        })},1000)
    }

    flash = (int) => {
        let temp = this.state.secretWord;
        let letter = temp[int].props.letter;
        let flash = temp[int].props.flash;
        temp[int] = <Letter flash={!flash} visible={true} letter={letter} key={int}/>
        this.setState({
            secretWord: temp,
        })
    }

    checkLetter = () => {
        let indexArray = letterMatch(this.state.letterGuess,this.state.secretWord);
        let index = indexArray.map((item,index) => {this.flip(item.key); return index})
        console.log("Index", index)
        this.clearInput(index.length !== 0, true)
        this.checkForWin()
    }

    convertToString = (word) => {
        return word.map(letter => {
            return letter.props.letter
        }).join('')
    }

    checkWord = () => {
        let total = this.state.wordGuess.split("").filter((item,index) => {
            if(item.toLowerCase() === this.state.secretWord[index].props.letter.toLowerCase()){
                index++
            }
            return index
        })
        if (total.length === this.state.secretWord.length) {
            alert("Would you look at that!")
            callApi('', {
                method: 'post',
                body: {
                    fields: {
                        word: this.convertToString(this.state.secretWord),
                        attempts: this.state.nGuesses
                    }
                }
            })
        }
        this.clearInput(true, total.length === this.state.secretWord.length)

    }

    checkForWin = () => {
        let total = this.state.secretWord.filter((item) => {
            return item.props.visible===true
        });
        if (total.length === this.state.secretWord.length) {
            alert("Would you look at that!")
            callApi('', {
                method: 'post',
                body: {
                    fields: {
                        word: this.convertToString(this.state.secretWord),
                        attempts: this.state.nGuesses
                    }
                }
            })
        }
    }

    clearInput = (lFlag, wFlag) => {
        document.getElementById("letterField").value = '';
        document.getElementById("wordField").value = '';
        this.setState({
            lastLetter: {
                letter: this.state.letterGuess,
                correct: lFlag,

            },
            lastWord: {
                word: this.state.wordGuess,
                correct: wFlag,
            },
            letterGuess: '',
            nGuesses: this.state.nGuesses+1,
        })
    }
    handleToggle = () => {
        this.setState({open: !this.state.open})
    }
    handleClose = () => {
        this.setState({open: false})
    }

  render() {
    let wordArray = this.state.secretWord;
    let letterError = `Secret word does not contain '${this.state.lastLetter.letter}'`
    let wordError = `Secret word is not '${this.state.lastWord.word}'`
    return (
        <Paper style={localStyles.container}>
            <Paper style={localStyles.flexRow}>
                <TextField
                    hintText=""
                    floatingLabelText="Guess a letter here"
                    style={localStyles.textInput}
                    onChange={this.onChangeLetter}
                    id = "letterField"
                    onKeyPress = {(e)=>{if(e.key === 'Enter'){this.checkLetter()}}}
                    onFocus= {() => this.clearInput(true,true)}
                    errorText = {this.state.lastLetter.correct?"":letterError}
                />
                <TextField
                    hintText=""
                    floatingLabelText="Guess the word here"
                    style={localStyles.textInput}
                    onChange={this.onChangeWord}
                    id = "wordField"
                    onKeyPress = {(e)=>{if(e.key === 'Enter'){this.checkWord()}}}
                    onFocus= {() => this.clearInput(true,true)}
                    errorText = {this.state.lastWord.correct?"":wordError}

                />
                {/* <RaisedButton
                    style={{marginTop: 30, marginBottom: 30}}
                    secondary={true}
                    label="Send Letter"
                    onClick={() => this.checkLetter()}
                 /> */}

                {/* <RaisedButton
                    style={{marginTop: 30}}
                    secondary={true}
                    label="Send Word"
                    onClick={() => this.checkWord()}
                /> */}
            </Paper>
            <Paper style={localStyles.content}>
                {wordArray}
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
