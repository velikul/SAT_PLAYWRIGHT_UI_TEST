Feature: Create Experiment Feature

  Background:
    Given the user is on the home page
    Then clicks on create experiment button
 
  Scenario: Can Create New Experiment
    And types a unique name and a unique description
    And clicks on create experiment submit button
    And clicks on skip upload button
    Then sees the first name as the unique experiment name
    And delete the unique name experiment
 
  Scenario: Cannot Create Experiment With Blank Name
    Then sees the create experiment page header as "Create experiment"
    And name and description are enabled
    And create experiment submit button is not enabled
    When types "experiment with the blank name" as name
    Then create experiment submit button is enabled
    When deletes name
    Then sees "Please enter a name" text on the page
    And closes the create experiment page
  
  Scenario Outline: Cannot Create Experiment With The Same Name

    And types "<name>" as name
    And clicks on create experiment submit button
    And clicks on skip upload button
    Then sees the first name as "<name>"
    And waits for the experiment list to load
    When clicks on create experiment button
    When types "<name>" as name
    Then sees "This name already exists" text on the page
    And closes the create experiment page
    And deletes the experiment with name "<name>"

    Examples:
      |name                         | 
      |Experiment With The Same Name| 