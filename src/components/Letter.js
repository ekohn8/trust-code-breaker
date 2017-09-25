import React from 'react';
import Paper from 'material-ui/Paper';

const Letter = (props) => {
    return (
        <Paper style={localStyles.holder} zDepth={1} >
            {props.letter}
        </Paper>
    );
}

export default Letter;

const localStyles = {
    holder: {
        height : 100,
        width : 70,
        margin : 5,
        textAlign : 'center',
        display : 'inline-block',
        fontSize: '5rem'
    }
}