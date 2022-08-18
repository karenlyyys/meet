import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './nprogress.css';
import { mockData } from './mock-data';

class App extends Component {
  state = {
    events: mockData[0].items,
    locations: [],
    locationSelected: 'all',
    numberOfEvents: 32,
  }

 

componentDidMount() {
// this.mounted = true;
// getEvents().then((events) => {
// if (this.mounted) {
// this.setState({ events, locations: extractLocations(events) });
// }
// });
}

  componentWillUnmount(){
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    if (eventCount === undefined) {
      eventCount = this.state.numberOfEvents;
  } else(
      this.setState({ numberOfEvents: eventCount })
  )
  if (location === undefined) {
      location = this.state.locationSelected;
  }
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents,
        numberofEvents: eventCount
      });
    });
  }

  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
         <NumberOfEvents />
         <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;