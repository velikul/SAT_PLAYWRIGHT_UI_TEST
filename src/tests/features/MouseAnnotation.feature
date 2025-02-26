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
    Then clicks on "Setup" navigation menu button
    Then unselects all behaviors
    And select the following behaviors
      | Walking             |
      | Rearing unsupported |
    Then clicks on "Save and lock Setup" button
    And clicks on setup save confirm button
    And clicks on cookies accept button
    And clicks on upload completed box close button
    Then clicks on Annotate navigation menu button
    #Then pauses
    