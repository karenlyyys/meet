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

test('render display 32 by default', () => {
    expect(NumberOfEventsWrapper.state('renderNumber')).toBe(32);
});


//CHANGE NUMBER OF EVENTS 
test('user change number of events', () => {
 NumberOfEventsWrapper.find('.renderNumber').simulate(
      'change', {target: { value: 5 }}
  );
  expect(NumberOfEventsWrapper.state('renderNumber')).toEqual(5);
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
