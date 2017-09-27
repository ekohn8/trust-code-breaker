import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class GameEndModal extends React.Component {
  state = {
    open: true,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
    this.reset()
  };

  reset = () => {
      console.log("Reset");
      setTimeout(()=>{window.location.reload(true)},500);
  };

  render() {
    const actions = [
      <FlatButton
        label="Got it!"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Why do I get to play this game again?"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          This is an early beta version of a game to study the concept of trust among users.
          We are collecting gameplay data to be used in the implementation of the real product.
          Feel free to play as much as you'd like and consider it a contribution to the blueberry squad.
          Thank you! <br/><br/>  -Blueberry Gameplay Research Department
          <br/><br/> (Hint: The category for this version is "Countries")

        </Dialog>
      </div>
    );
  }
}
