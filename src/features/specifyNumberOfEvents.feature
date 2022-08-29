Feature: Specify Number of Events 
Scenario: When user hasn’t specified a number, 32 is the default number
Given the user searched for an event
When the user chooses not to specify the number of events
Then the user will get 32 as a result
Scenario: User can change the number of events they want to see
Given the user is in the search query
When they user wants to change the search number
Then they can select their desired default number