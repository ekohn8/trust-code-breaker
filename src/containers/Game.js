import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Letter from '../components/Letter';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import getWord from '../utils/getWord';
import letterMatch from '../utils/letterMatch';
import GameEndModal from '../components/GameEndModal';
import InfoModal from '../components/InfoModal';
import FontIcon from 'material-ui/FontIcon';
import { callApi } from '../helpers';
import '../App.css';

export default class Game extends Component {
    constructor(props){
        super(props)
            this.state = {
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
                flashRed: false,
                screen: 'paper',
                infoModal: false
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
        temp[int] = <Letter className='bounce' flash={true} visible={true} letter={letter} key={int}/>
        this.setState({secretWord: temp})
        setTimeout(()=>{
            temp[int] = <Letter className='bounce' flash={false} visible={true} letter={letter} key={int}/>
            this.setState({
                secretWord: temp,
            })
        },1000)
    }

    flipAll = () => {
        let temp = this.state.secretWord;
        temp.map((filler,index)=>  {
            index++;
            return this.flip(index-1)
        })

    }

    flashRed = () => {
        var flasher = setInterval(()=>{this.setState({flashRed: !this.state.flashRed})},250)
        var clear = setTimeout(()=>{clearInterval(flasher)},1000)
    }

    checkLetter = () => {
        let indexArray = letterMatch(this.state.letterGuess,this.state.secretWord);
        let index = indexArray.map((item,index) => {this.flip(item.key); return index})
        if(index.length===0){this.flashRed()}
        this.clearInput(index.length !== 0, true)
        this.checkForWin()
    }

    convertToString = (word) => {
        return word.map(letter => {
            return letter.props.letter
        }).join('')
    }

    checkWord = () => {
        let total = [];
        if(this.state.wordGuess.length > this.state.secretWord.length){
            total = [1];
        }else{
            total = this.state.wordGuess.split("").filter((item,index) => {
                return item.toLowerCase() === this.state.secretWord[index].props.letter.toLowerCase()
        })}
        if (total.length === this.state.secretWord.length) {
            this.gameEndSequence()
        }else{
            this.flashRed();
        }
        this.clearInput(true, total.length === this.state.secretWord.length)
    }

    checkForWin = () => {
        let total = this.state.secretWord.filter((item) => {
            return item.props.visible===true
        });
        if (total.length === this.state.secretWord.length) {
            this.gameEndSequence()
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

    gameEndSequence = () => {
        this.flipAll()
        setTimeout(()=>{
            this.setState({
                screen: 'div',
         });},1000)
         setTimeout(()=>{
             this.setState({
                 screen: 'finish'
          });},2500)
          setTimeout(()=>{
              this.setState({
                  screen:'modal'
              })
         },5000)

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

  render() {
    let wordArray = this.state.secretWord;
    let letterError = `Secret word does not contain '${this.state.lastLetter.letter}'`
    let wordError = `Secret word is not '${this.state.lastWord.word}'`
    return (
        <Paper style={localStyles.container}>
            <AppBar
                title="Code Breaker"
                iconElementLeft={<FontIcon className="material-icons"></FontIcon>}
            />
            <Paper style={this.state.flashRed ? localStyles.flashRed : localStyles.flexRow}>
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
            <Paper  style={localStyles.content} >
                {(this.state.screen==='paper') &&
                    wordArray
                }
                {(this.state.screen==='div') &&
                    <div className='flip' >
                        {wordArray}
                    </div>
                }
                {(this.state.screen==='finish') &&
                    <div className='hinge'>
                        {wordArray}
                    </div>
                }
                {(this.state.screen==='modal') &&
                    <GameEndModal/>
                }
                {this.state.infoModal &&
                    <InfoModal/>
                }
            </Paper>
            <RaisedButton
                label="Why do I get to play this game?"
                onClick={() => this.setState({infoModal: true})}
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
    flashRed: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        backgroundColor: 'red'
    },
    textInput: {
        justifyContent: 'center',
        alignItems: 'center',

    }
}
