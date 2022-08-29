import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
    // handleInputChanged = (event) => {
    //     // let actValue = parseInt(event.target.value)
    //     // if (actValue > 0 && actValue <= 32) {
    //     //     this.setState({ 
    //     //         numberOfEvents: actValue,
    //     //         errorText: ' '
    //     //      });
    // //}
    //          if (event.target.value < 1 || event.target.value > 32) {
    //         this.setState({
    //             renderNumber: event.target.value,
    //             errorText: 'Please enter a number between 1 and 32'
    //         })
    //     } else {
    //         this.props.updateEvents(undefined, event.target.value);
    //         this.setState({
    //             renderNumber: event.target.value,
    //             errorText: '' 
    //         });
    //     }
    // }

constructor() {
    super();
    this.state = {
        renderNumber: 32,
    }
}

render() {
    const { renderNumber } = this.state;
   
    return (
        <div className="number-of-events">
            <p className="input-label">Number of Events</p>
            <ErrorAlert text={this.props.infoText} />
            <input id="render-number" type="number" className="rendernumber" value={this.props.NumberOfEvents} onChange={(e) => this.props.changeNumOfEvents(e)}></input>
        </div>
    );
}
}

export default NumberOfEvents;