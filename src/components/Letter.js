import React from 'react';
import Paper from 'material-ui/Paper';

var Letter = (props) => {
    return (
        <Paper style={props.flash?localStyles.flash:localStyles.letter} zDepth={4}>
                {props.visible?props.letter:""}
        </Paper>
    );
}

export default Letter;

const localStyles = {
    letter: {
        height : 100,
        width : 70,
        margin : 5,
        textAlign : 'center',
        display : 'inline-block',
        fontSize: '5rem',
        // marginBottom: 50
        // backgroundColor: 'green',
    },
    flash: {
        height : 120,
        width : 90,
        margin : 5,
        textAlign : 'center',
        display : 'inline-block',
        fontSize: '5rem',
        backgroundColor: 'green',
        marginBottom: 100
    }
}
