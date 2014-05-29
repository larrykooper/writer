Feature: The Admin
  Scenario: Display the Admin 
    Given I visit the admin page 
    Then I should see the login form

  Scenario: Login
    Given a user with username "john" and password "secret"
    When I login as "john" with password "secret"
    Then I should be on the admin posts page

  Scenario: If not registered, you cannot log in.
    Given there is no user "josh"
    When I login as "josh" with password "invalid"
    Then I should be on the admin page
    And I should see "Your username or password is incorrect"

