# meet

# FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS 
Scenario 1: An event element is collapsed by default
Given the main page is open, when the user views the city, then the current events will be collapsed from the viewer's end. 
Scenario 2: User can expand an event to see its details
Given the user clicked on the event button/page, when the user clicks on an event, then more details about the event will display.
Scenario 3: User can collapse an event to hide its details
Given the event details are open, when the user clicks on the event again, then the details about the event will close. 
User Story: As a user, I should be able to view the events or hide them so that I can easily access the options that are available in the city.


# FEATURE 3: SPECIFY NUMBER OF EVENTS

Scenario 1: When user hasn’t specified a number, 32 is the default number

Given the user searched for an event, when the user chooses not to specify the number of events, then the user will get 32 as a result. 

Scenario 2: User can change the number of events they want to see

Given the user is in the search query, when they user wants to change the search number, then they can select their desired default number. 

User Story: As a user, I should be able to choose how many events are listed so I can know how many events there are in my city. 

# FEATURE 4: USE THE APP WHEN OFFLINE

Scenario 1: Show cached data when there’s no internet connection

Given there is no internet connection, when the user clicks on cached data, then data will be shown. 

Scenario 2: Show error when user changes the settings (city, time range)

Given the user tries to change the setting with the settings tab, when the user clicks on a different city/time, an error will be shown. 

User Story: As a user, I should be able to use my app offline so that I can still access the app when there is no internet connection. 

# FEATURE 5: DATA VISUALIZATION

Scenario 1: Show a chart with the number of upcoming events in each city

Given the user selects a city, when the user clicks on the upcoming events list, then events will be shown. 

User Story: As a user, I should be able to see a list of events in my selected city so I can go through my options.
