import React from 'react'
import Letter from '../components/Letter';
import wordList from '../assets/wordList.js';

export default function getWord() {
    let index = Math.round(Math.random()*32)
    let randArray = wordList(index).split("").map((random,index) => {index++; return (<Letter visible={false} key={index-1} letter={random}/>)});
    console.log("SW", randArray)
    return randArray;
};
