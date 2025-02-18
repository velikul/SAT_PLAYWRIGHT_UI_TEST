@Test
Feature: Mouse Annotation Feature

  Background:
    Given the user is on the home page

    Scenario:
    And the user creates experiment with a unique name
    Then sees the first name as the unique experiment name
    And selects the first experiment
    And clicks on upload data icon
    And upload one minute experiment
    #Then unselects all behaviors
    #And select the following behaviors
    