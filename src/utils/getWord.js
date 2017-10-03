import React from 'react'
import Letter from '../components/Letter';

export default function getWord(word) {
    console.log("Word",word)
    let randArray = word.split("").map((random,index) => {
        // console.log(random)
        index++;
        if(random.match(/[a-z]/i))
        {
            return (
                <Letter visible={false} key={index-1} letter={random}/>
            )
        }else if(random === "&" || random === "''" || random === "-")
        {
            return (
                <Letter visible={true} key={index-1} letter={random}/>
            )
        }else {
            return <Letter space={true} visible={true} key={index-1} letter={random}/>
        }
    });
    return randArray;
};
