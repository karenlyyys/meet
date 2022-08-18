import React, { Component } from 'react';

class Event extends Component {
  toggleEventDetails = () => {
    this.setState({ show: !this.state.show });
  };

  state = { show: false };

  render() {
    const { event } = this.props;
    // console.log(event)
    return (
      <>
        <div className="event">
          <h1 className="event-summary-title">{event.summary}</h1>
          <p className="event-date">
            {event.start.dateTime}
          </p>
          <p className="event-location">
            {event.location}
          </p>
          {this.state.show && (
            <>
              <h2 className="event-about-title">About event:</h2>
              <a
                href={event.htmlLink}
                target="_blank"
                rel="noreferrer"
                className="event-htmlLink"
              >
                See details on Google Calendar
              </a>
              <p className="event-description">{event.description}</p>
            </>
          )}
          {!this.state.show ? (
            <button
              className="event-showDetails-btn"
              onClick={this.toggleEventDetails}
            >
              Show EventDetails
            </button>
          ) : (
            <button
              className="event-hideDetails-btn"
              onClick={this.toggleEventDetails}
            >
              Hide EventDetails 
              </button>
          )}
        </div>
      </>
    );
  }
}

export default Event;

