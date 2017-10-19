import React from 'react';
import Paper from 'material-ui/Paper';
import '../App.css';


var Letter = (props) => {
    if(!props.space){
        return (
            <Paper className={props.className} style={props.flash?localStyles.flash:localStyles.letter} zDepth={4}>
                    {props.visible?props.letter:" "}
            </Paper>
        );
    }else{
        return (
            <div style={localStyles.blank} />
        )
    }

}

export default Letter;

const localStyles = {
    letter: {
        height : 100,
        width : 100,
        margin : 5,
        textAlign : 'center',
        display : 'inline-block',
        fontSize: '5rem',
    },
    flash: {
        height : 100,
        width : 100,
        margin : 5,
        textAlign : 'center',
        display : 'inline-block',
        fontSize: '5rem',
        backgroundColor: 'green',
    },
    blank: {
        height : 100,
        width : 100,
        margin : 5,
    }
}
