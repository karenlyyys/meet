import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';


describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}} />);
  });

test('render number input', () => {
    expect(NumberOfEventsWrapper.find('div')).toHaveLength(1);
});

test('render display 32 by default', () => {
    expect(NumberOfEventsWrapper.state('renderNumber')).toBe(32);
});

test('render number of events according to user input', () => {
  NumberOfEventsWrapper.find('#render-number').simulate('change', {
    target: { value: 18 },
  });
  expect(NumberOfEventsWrapper.find('#render-number').prop('value')).toBe(18);
});
});


