Feature: Show/hide event details 
Scenario 1: An event element is collapsed by default
    Given the main page is open
    When the user views the city
    Then the current events will be collapsed from the viewer's end
Scenario 2: User can expand an event to see its details
    Given the user clicked on the event button/page
    When the user clicks on an event
    Then more details about the event will display
Scenario 3: User can collapse an event to hide its details
    Given the event details are open
    When the user clicks on the event again
    Then the details about the event will close