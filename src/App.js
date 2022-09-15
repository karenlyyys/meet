import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './nprogress.css';
import { mockData } from './mock-data';

class App extends Component {
  constructor() {
    super();
    this.changeNumOfEvents = this.changeNumOfEvents.bind(this)
  }
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
    getEvents().then((events) => {
      const filteredEvents = (location === 'all') ?
        events[0].items.slice(0, eventCount) :
        events[0].items.filter((event) => event.location === location).slice(0, eventCount);
      // const filteredEvents= events[0].items.slice(0, eventCount)
      this.setState({
        events: filteredEvents,
        locationSelected: location,
        numberofEvents: eventCount
      });
    });
  }

  //testing
  getData = () => {
    let {locations, events} = this.state;
    let data = locations.map((location)=>{
        let number = events.filter((event) => event.location === location).length
        let city = location.split(', ').shift()
        city = city.split('- ').shift()
        return {city, number};
    })
    data = data.filter(data => (data.number >= 1))
    return data;
};

changeNumOfEvents = async (e) => {
  let newValue = parseInt(e.target.value);
  if ((newValue > 32) || (newValue < 1)) {
   await this.setState({
      numberOfEvents: newValue,
      infoText: 'Please choose a number between 1 and 32',
    })
  } else {
    await this.setState({
      numberOfEvents: newValue,
      infoText: ' ',
    })
  }
      this.updateEvents(this.state.locationSelected, this.state.numberOfEvents);
}

  render() {
    return (
      <div className="App">
        <h1 className="app-title title">Welcome to the Events App!</h1>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} evts={this.state.events} />
         <NumberOfEvents changeNumOfEvents={this.changeNumOfEvents} NumberOfEvents={this.state.numberOfEvents} infoText={this.state.infoText} />
         <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;