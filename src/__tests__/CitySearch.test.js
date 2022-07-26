import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySearch';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';

describe('<CitySearch /> component', () => {
 
   //USER SHOULD SEE LIST OF SUGGESTIONS DURING SEARCH

  test('render text input', () => {
    let locations = extractLocations(mockData[0].items);
    let CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={() => {}} />);

    expect(CitySearchWrapper.find('.city')).toHaveLength(1);
  });

  test('renders text input correctly', () => {
    const query = CitySearchWrapper.state('query');
    expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
  });

  test('change state when text input changes', () => {
    let locations = extractLocations(mockData[0].items);
    let CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={() => {}} />);

    CitySearchWrapper.setState({
      query: 'Berlin'
    });
    const eventObject = { target: { value: 'Berlin' }};
    CitySearchWrapper.find('.city').simulate('change', eventObject);
    expect(CitySearchWrapper.state('query')).toBe('Berlin');
  });

  test('render list of suggestions correctly', () => {
    let locations = extractLocations(mockData[0].items);
    let CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={() => {}} />);

    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i]);
    }
  });

  test('suggestion list match the query when changed', () => {
    let locations = extractLocations(mockData[0].items);
    let CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={() => {}} />);

  CitySearchWrapper.setState({ query: '', suggestions: [] });
  CitySearchWrapper.find(".city").simulate("change", {
    target: { value: "Berlin" },
  });
  const query = CitySearchWrapper.state("query");
  const filteredLocations = locations.filter((location) => {
    return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
  });
  expect(CitySearchWrapper.state("suggestions")).toEqual(filteredLocations);
  });


  //USER CAN SELECT CITY FROM LIST OF SUGGESTIONS

  test("selecting a suggestion should change query state", () => {
    let locations = extractLocations(mockData[0].items);
    let CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={() => {}} />);

    CitySearchWrapper.setState({
      query: 'Berlin'  });
    const suggestions = CitySearchWrapper.state('suggestions');
    CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
    expect(CitySearchWrapper.state("query")).toBe(suggestions[0]);
  });

  test("selecting CitySearch input reveals the suggestions list", () => {
    let locations = extractLocations(mockData[0].items);
    let CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={() => {}} />);

    CitySearchWrapper.find('.city').simulate('focus');
    expect(CitySearchWrapper.state('showSuggestions')).toBe(true);
    expect(CitySearchWrapper.find('.suggestions').prop('style')).not.toEqual({ display: 'none' });
  });

  test("selecting a suggestion should hide the suggestions list", () => {
    let locations = extractLocations(mockData[0].items);
    let CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={() => {}} />);

    CitySearchWrapper.setState({
        query: 'Berlin',
        showSuggestions: undefined
    });
    CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
    expect(CitySearchWrapper.state('showSuggestions')).toBe(false);
    expect(CitySearchWrapper.find('.suggestions').prop('style')).toEqual({ display: 'none' });
  });

});


