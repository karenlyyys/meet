import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import App from '../App';
import { mount, shallow } from 'enzyme';
import { mockData } from '../mock-data';
import EventList from '../EventList';
//import Event from '../Event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  let AppWrapper;
    test('An event element is collapsed by default', ({ given, when, then }) => {
     
      given('the main page is open', () => {
        //EventListWrapper = mount(<EventList events={250} />);
        //EventWrapper = mount(<Event event={250[0]} />);
        AppWrapper = mount(<App />);
      });
  
      when('the user views the city', () => {
          AppWrapper.update();
          expect(AppWrapper.find('.event')).toHaveLength(250);
        }
      );
      
      then('the current events will be collapsed from the viewers end', () => {
        AppWrapper.update();
        let EventWrapper = AppWrapper.find(Event);
        EventWrapper.forEach((event) => expect(event.state('show')).toBe(false));
        expect(EventWrapper.find('.event-showDetails-btn')).toHaveLength(
          0
        );
      });
    });

      test('User can expand an event to see its details', ({ given, when, then }) => {
        let EventWrapper;
        given('the user clicked on the event button', () => {
          const event = mockData[0].items[0];
          const EventWrapper = shallow(<Event event={event} />);
          expect(EventWrapper.state('show')).toBe(false);
          expect(EventWrapper.find('.event-showDetails-btn')).toHaveLength(
            1
          );
          expect(EventWrapper.find('.event-description')).toHaveLength(0);
        });
    
        when('the user clicks on an event', () => {
          EventWrapper.find('.event-showDetails-btn').simulate('click');
        });
    
        then('more details about the event will display', () => {
            expect(EventWrapper.state('show')).toBe(true);
            expect(EventWrapper.find('.event-showDetails-btn')).toHaveLength(
              1
            );
            expect(EventWrapper.find('.event-description')).toHaveLength(1);
          }
        );
      });

      test('User can collapse an event to hide its details', ({given, when, then}) => {
        let EventWrapper;
        given('the event details are open',() => {
            EventWrapper = shallow(<Event event={mockData[0]} />);
            EventWrapper.setState({ show: true });
             expect(EventWrapper.state('show')).toBe(true);
             expect(EventWrapper.find('.event-hideDetails-btn')).toHaveLength(
              1
            );
            expect(EventWrapper.find('.event-description')).toHaveLength(1);
 
          }
        );

    
        when('the user clicks on the event again', () => {
          EventWrapper.find('.event-hideDetails-btn').simulate('click');
        });
    
        then('the details about the event will close', () => {
            expect(EventWrapper.state('show')).toBe(false);
            expect(EventWrapper.find('.event-showDetails-btn')).toHaveLength(
              1
            );
            expect(EventWrapper.find('.event-description')).toHaveLength(0);
          }
        );
      });
    });