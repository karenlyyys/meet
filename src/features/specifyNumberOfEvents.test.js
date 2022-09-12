import { mount } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import React from 'react';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');
defineFeature(feature, (test) => {
  test('When user has not specified a number, 32 is the default number', ({ given, when, then }) => {
    let AppWrapper;
    given('the user searched for an event', () => {
    });
  
    AppWrapper = mount(<App />);
      when('the user chooses not to specify the number of events', () => {
       
      });
  
      then('the user will get 32 as a result', () => {
        AppWrapper.update();
        expect(AppWrapper.state('numberOfEvents')).toBe(32);
      });
    });
 
    test('User can change the number of events they want to see', ({given, when, then}) => {
      let AppWrapper = mount(<App/>);
      let NumberOfEventsWrapper = AppWrapper.find('NumberOfEvents');
      given('the user is in the search query', () => {
        AppWrapper = mount(<App />);
      });
  
      when('the user wants to change the search number', () => {
          AppWrapper.update();
         
          const eventObject = { target: { value: 6 } };
          NumberOfEventsWrapper.find('#render-number').simulate( 'click',
            eventObject
          );
        }
      );
  
      then('they can select their desired default number', () => {
        expect(NumberOfEventsWrapper.find('#render-number')).toHaveLength(1);
        //expect(AppWrapper.find('.EventItem')).toHaveLength(1);
          //expect(NumberOfEventsWrapper.state('#render-number')).toBe(6);
        }
      );
    });
  });