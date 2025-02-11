Feature: Logout Feature And Contact Support Page

  Background:
    Given the user is on the home page
    And clicks on the account button

  Scenario: Can Logout
    When clicks on the logout button
    Then is logged out

  Scenario: Can See The Contact Support Page
    When clicks on contact support button
    Then a new window is opened
    And can see the title "MyNoldus - Login"
