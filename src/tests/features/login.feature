Feature: Login Feature

  Background:
    Given the user is on the login page

  Scenario: Can Login With Valid Credentials
    When enters valid credentials
    Then the user is logged in

  Scenario: Cannot Login With Blank Email And Password
    When enters the invalid credentials "" and ""
    Then "Please enter your Email Address" message is displayed
    And "Please enter your password" message is displayed

  Scenario: Cannot Login With Blank Email
    When enters the invalid credentials "" and "password"
    Then "Please enter your Email Address" message is displayed

  Scenario: Cannot Login With Blank Password
    When enters the invalid credentials "email@noldus.com" and ""
    Then "Please enter your password" message is displayed

  Scenario Outline: Cannot Login With Invalid Characters In Email Address
    When enters the invalid credentials "<email>" and "password"
    Then "Please enter a valid email address." message is displayed
    Examples:
      | email                 |
      | !@#$@noldus.com       |
      | noldus.com            |
      | tester    @noldus.com |

  Scenario Outline: Cannot Login With Invalid Password
    When enters the invalid credentials "tester1@noldus.com" and "<password>"
    Then "Your password is incorrect." message is displayed
    Examples:
      | password       |
      | wrong password |
      | --password--   |

  Scenario Outline: Cannot Login With Invalid Email Address
    When enters the invalid credentials "<email>" and "tester123"
    Then "We can't seem to find your account." message is displayed
    Examples:
      | email             |
      | tester@noldus.com |
      | user@gmail.com    |
