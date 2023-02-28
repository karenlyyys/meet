import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  test("When user hasn't specified a number, 32 is the default number.", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;

    given('the user is on the main page of the app', () => {
      AppWrapper = mount(<App />);
    });

    when("the user hasn't specified a number of events", () => {
      AppWrapper.update();
    });

    then('the default number of displayed events will be 32', () => {
      expect(AppWrapper.find('.event')).toHaveLength(2);
    });
  });

  test('User can change the number of events they want to see.', ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;

    given('the user is on the main page', () => {
      AppWrapper = mount(<App />);
    });

    when(
      'the user set a number of events he or she wants to see in the “Number of events” box',
      () => {
        AppWrapper.update();
        AppWrapper.find('.numberinput').simulate('change', {
          target: { value: '0' },
        });
      }
    );

    then('this number of events will be displayed', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(0);
    });
  });
});
