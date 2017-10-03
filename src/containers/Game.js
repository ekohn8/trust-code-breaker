import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Letter from '../components/Letter';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import getWord from '../utils/getWord';
import letterMatch from '../utils/letterMatch';
import GameEndModal from '../components/GameEndModal';
import CategoryMenu from '../components/CategoryMenu';
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
                letterGuessHistory: [],
                wordGuessHistory: [],
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
                infoModal: false,
                category: '',
                timer: 0,
            }
        }

    componentWillMount() {
         let choices = ['country','animal','pirate']
         let category = choices[Math.round(Math.random()*2)]
        //  console.log(category)
        callApi('', {category: category}).then(value => {
            // console.log(value.records)

            let int = Math.round(Math.random()*(value.records.length-1))
            // console.log(int)
            let res = getWord(value.records[int].fields.Word)
            this.setState({
                secretWord: res,
                category: value.records[int].fields.Category,
            })
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
        setTimeout(()=>{clearInterval(flasher)},1000)
    }

    checkLetter = () => {
        this.setState({nGuesses: this.state.nGuesses+1})
        let indexArray = letterMatch(this.state.letterGuess,this.state.secretWord);
        let index = indexArray.map((item,index) => {this.flip(item.key); return index})
        if(index.length===0){this.flashRed()}
        if(this.state.letterGuess.match(/[a-z]/i))
        {
            let lGH = this.state.letterGuessHistory
            lGH.push(this.state.letterGuess)
            lGH.sort()
            this.setState({
                letterGuessHistory: lGH
            })
        }
        this.clearInput(index.length !== 0, true)
        this.checkForWin()
    }

    convertToString = (word) => {
        return word.map(letter => {
            return letter.props.letter
        }).join('')
    }

    checkWord = () => {
        this.setState({nGuesses: this.state.nGuesses+1})
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
            if(this.state.wordGuess.length > 0)
            {
                let wGH = this.state.wordGuessHistory
                wGH.push(this.state.wordGuess)
                wGH.sort()
                this.setState({
                    wordGuessHistory: wGH
                })
            }
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
            wordGuess: '',
            // nGuesses: this.state.nGuesses+1,
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

    runTimer = () => {
        let previous = this.state.timer;
        let next = previous + 1;
        setTimeout(()=>{this.setState({timer: next})},1000)
    }

    setCategory = (cat) => {
        // console.log("Cat", cat)
        // console.log("catgegory", this.state.category)
        if(cat.toLowerCase() === this.state.category.toLowerCase()){
            return
        }else{
        this.setState({
            category: cat
        })
        callApi('', {category: cat}).then(value => {
            // console.log(value.records)

            let int = Math.round(Math.random()*(value.records.length-1))
            // console.log(int)
            let res = getWord(value.records[int].fields.Word)
            this.setState({
                secretWord: res,
                category: value.records[int].fields.Category,
            })
        })
    }

    }

  render() {
    this.state.screen === 'paper' && this.runTimer();
    let wordArray = this.state.secretWord;
    let letterError = `Secret word does not contain '${this.state.lastLetter.letter}'`
    let wordError = `Secret word is not '${this.state.lastWord.word}'`
    let category = `Selected category: ${this.state.category}`
    return (
        <Paper style={localStyles.container}>
            <AppBar
                title= "Code Breaker"
                iconElementLeft={<FontIcon className="material-icons"></FontIcon>}
                iconElementRight={<CategoryMenu onClick={(cat) => this.setCategory(cat)} text={category}/>}

            />
            <Paper>
                <div style={this.state.flashRed ? localStyles.flashRed : localStyles.flexRow}>
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
                </div>
                <div style={localStyles.flexRow}>
                    <div style={localStyles.historyContainer}>
                        {this.state.letterGuessHistory.map(
                            letter => {return <Chip key={Math.random()*100} >{letter}</Chip>})}
                    </div>
                    <div style={localStyles.historyContainer}>
                        {this.state.wordGuessHistory.map(word => {return <Chip>{word}</Chip>})}
                    </div>
                </div>
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
                    <GameEndModal score={(200-this.state.timer)*(25-this.state.nGuesses)}/>
                }
                {this.state.infoModal &&
                    <InfoModal/>
                }
            </Paper>
            <div style={localStyles.flexRow}>
                <h3>
                    Number of guesses: {this.state.nGuesses}
                </h3>
                <h3>
                    Total time: {this.state.timer}
                </h3>
            </div>
            <RaisedButton
                label="Why do I get to play this game?"
                secondary={true}
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
        alignItems: 'flex-start',
        flexWrap: 'wrap',
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
    },
    historyContainer: {
        marginTop: 10,
        marginBottom: 5,
        display: 'flex',
        width: '35vw',
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    }
}
