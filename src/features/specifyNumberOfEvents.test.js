import { mount } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import React from 'react';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');
defineFeature(feature, (test) => {
  test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
    given('the user searched for an event', () => {
    });
  
      let AppWrapper;
      when('the user chooses not to specify the number of events', () => {
        AppWrapper = mount(<App />);
      });
  
      then('the user will get 32 as a result', () => {
        AppWrapper.update();
        expect(AppWrapper.state('numberOfEvents')).toBe(32);
      });
    });

  //   test('When user hasnt specified a number, 32 is the default number', ({ given, when, then }) => {
  //     given('the user searched for an event', () => {

  //     });

  //     when('the user chooses not to specify the number of events', () => {

  //     });

  //     then(/^the user will get (\d+) as a result$/, (arg0) => {

  //     });
  // });
  
    test('User can change the number of events they want to see', ({given, when, then}) => {
      let AppWrapper;
      given('the user is in the search query', () => {
        AppWrapper = mount(<App />);
      });
  
      when('the user wants to change the search number',
        () => {
          AppWrapper.update();
          let NumberOfEventsWrapper = AppWrapper.find('NumberOfEvents');
          const eventObject = { target: { value: 6 } };
          NumberOfEventsWrapper.find('#events-num-input').simulate( 'click',
            eventObject
          );
        }
      );
  
      then(
        'they can select their desired default number',
        () => {
          expect(AppWrapper.state('#events-num-input')).toBe(6);
        }
      );
    });
  });