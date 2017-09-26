import React from 'react';
import Paper from 'material-ui/Paper';

var Letter = (props) => {
    return (
        <Paper style={localStyles.visible} zDepth={4} >
            {props.visible?props.letter:""}
        </Paper>
    );
}

export default Letter;

const localStyles = {
    visible: {
        height : 100,
        width : 70,
        margin : 5,
        textAlign : 'center',
        display : 'inline-block',
        fontSize: '5rem',
    },
    hidden: {
        height : 100,
        width : 70,
        margin : 5,
        textAlign : 'center',
        display : 'inline-block',
        fontSize: '5rem',
        color: 'white'
    }
}
