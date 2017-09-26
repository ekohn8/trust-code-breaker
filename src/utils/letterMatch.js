export default function letterMatch(letter,word) {
    //error handling
    if(letter.length === 0){alert("Enter some input please") }
    if(letter.length > 1){alert("One letter at a time, friend")}
    //standard flexRow
    let temp = word
    let indexArray = temp.filter((item) => {if(item.props.letter.toLowerCase() === letter.toLowerCase()){return item.key}})

    return indexArray
};
