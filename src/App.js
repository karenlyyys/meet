import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import { mockData } from './mock-data';
import { OfflineAlert } from './Alert';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import EventGenre from './EventGenre';

class App extends Component {
  state = {
    events: mockData,
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all',
    offlineText: '',
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });

    if (!navigator.onLine) {
      this.setState({
        offlineText: "Your're offline",
      });
    } else {
      this.setState({
        offlineText: '',
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateNumberOfEvents = async (eventNumbers) => {
    await this.setState(
      {
        numberOfEvents: eventNumbers,
      },
      this.updateEvents(this.state.currentLocation, eventNumbers)
    );
  };

  updateEvents = (location, eventCount) => {
    console.log(eventCount);
    getEvents().then((events) => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter((event) => event.location === location);

      const evts = locationEvents.slice(0, eventCount);
      if (this.mounted) {
        this.setState({
          events: evts,
          currentLocation: location,
          numberOfEvents: eventCount,
        });
      }
    });
  };

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(', ').shift();
      return { city, number };
    });
    return data;
  };

  render() {
    return (
      <div className="App">
        <OfflineAlert text={this.state.offlineText} />
        <label className="align-left meet-title">Meet App</label>
        <div className="align-right">
          <NumberOfEvents
            numberOfEvents={this.state.numberOfEvents}
            updateNumberOfEvents={this.updateNumberOfEvents}
          />
          <CitySearch
            locations={this.state.locations}
            updateEvents={this.updateEvents}
          />
        </div>

        <div className="data-vis-wrapper">
          <ResponsiveContainer height={400}>
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis
                allowDecimals={false}
                type="number"
                dataKey="number"
                name="number of events"
              />{' '}
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
          <EventGenre
            events={this.state.events}
            locations={this.state.locations}
          ></EventGenre>
        </div>

        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
