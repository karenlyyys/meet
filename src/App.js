import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents, getAccessToken, checkToken } from './api';
import './nprogress.css';
import { mockData } from './mock-data';
import { OfflineAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';


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
    showWelcomeScreen: undefined
  }

//componentDidMount() {
// this.mounted = true;
// getEvents().then((events) => {
// if (this.mounted) {
// this.setState({ events, locations: extractLocations(events) });
// }
// });
//}

async componentDidMount() {
  this.mounted = true;
  const accessToken = localStorage.getItem('access_token');
  const isTokenValid = (await checkToken(accessToken)).error ? false : true;
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get('code');
  this.setState({ showWelcomeScreen: !(code || isTokenValid) });
  if ((code || isTokenValid) && this.mounted) {
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

if (!navigator.onLine) {
  this.setState({
    warningText:
      "It seems that you're not connected to the internet, your data was loaded from the cache.",
    });
  } else {
    this.setState({
      warningText: '',
    });
  }
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
//figure out chart stuff
  render() {
    if (this.state.showWelcomeScreen === undefined) return <div
className="App" />
    return (
      <div className="App">
        <h1 className="app-title title">Welcome to the Events App!</h1>
        <OfflineAlert text={this.state.offlineText} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} evts={this.state.events} />
         <NumberOfEvents changeNumOfEvents={this.changeNumOfEvents} NumberOfEvents={this.state.numberOfEvents} infoText={this.state.infoText} />
         <ResponsiveContainer height={400}>
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis  allowDecimals={false} type="number" dataKey="number" name="number of events" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
         <EventList events={this.state.events} />
         <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;