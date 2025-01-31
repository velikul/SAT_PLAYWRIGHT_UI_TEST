Feature: Login Feature

  Background:
    Given the user is on the login page

  Scenario: Can Login With Valid Credentials
    When enters valid credentials
    Then the user is logged in

  Scenario: Cannot Login With Blank Email And Password
    When enters the invalid credentials "" and ""
    Then "Please enter your Email Address" message is displayed
    And "Please enter your passwor" message is displayed
