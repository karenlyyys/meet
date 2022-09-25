import React, { Component } from 'react';

class Alert extends Component {
    constructor(props) {
      super(props);
      this.color = null;
      this.class = 'alert'
    }

    getStyle = () => {
        return {
          color: this.color
        };
      };
    
      getClass = () => {
        return this.class;
      };

render() {
    return (
        <div className={`alert ${this.getClass()}`}>
            <p style={this.getStyle()}>{this.props.text}</p>
        </div>
    );
}
}

class ErrorAlert extends Alert {
    constructor(props) {
      super(props);
      this.color = 'red';
      this.class = 'error-alert';
    }
  }

  class InfoAlert extends Alert {
    constructor(props) {
      super(props);
      this.color = 'blue';
    }
  }
  
  class WarningAlert extends Alert {
    constructor(props) {
      super(props);
      this.color = 'orange';
    }
  }

  export { ErrorAlert, InfoAlert, WarningAlert };