import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';


describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}} />);
  });

test('render number input', () => {
    expect(NumberOfEventsWrapper.find('.rendernumber')).toHaveLength(1);
});

test('render default number of events as 32', () => {
    expect(NumberOfEventsWrapper.state('renderNumber')).toBe(32);
});

test('render change state when input changes', () => {
  NumberOfEventsWrapper.setState({
    numOfEvents: 32
  });
  const eventObject = { target: { value: 6 } };
  NumberOfEventsWrapper.find('.rendernumber').simulate('change', eventObject);
  expect(NumberOfEventsWrapper.state('renderNumber')).toBe(6);
});
});
