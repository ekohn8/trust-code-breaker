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
        label="Start New Game"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Congratulations big winner!"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          Want to play again?
        </Dialog>
      </div>
    );
  }
}
