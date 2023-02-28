import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  constructor() {
    super();
    this.state = {
      numberOfEvents: 32,
    };
  }

  updateNumberOfEvents = (event) => {
    let newValue = parseInt(event.target.value);
    if (newValue > 33 || newValue < 1) {
      this.setState({
        numberOfEvents: newValue,
        infoText: 'Please choose a number between 1 and 32',
      });
    } else {
      this.setState({
        numberOfEvents: newValue,
        infoText: ' ',
      });
    }
    this.props.updateNumberOfEvents(newValue);
  };

  render() {
    return (
      <div className="NumberOfEvents row">
        <label className="numbercount">Number of events: </label>
        <input
          type="number"
          className="numberinput"
          onChange={this.updateNumberOfEvents}
          value={this.state.numberOfEvents}
        />
        <ErrorAlert text={this.state.infoText} />
      </div>
    );
  }
}

export default NumberOfEvents;
