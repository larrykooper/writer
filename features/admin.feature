Feature: The Admin
// Scenario is covered by a Dalek test
  Scenario: Display the Admin 
    Given I visit the admin page 
    Then I should see the login form

// Scenario is basically covered by a Dalek test
// Except for the New Post button
  Scenario: Login
    Given a user with username "mary" and password "secret"
    When I login as "mary" with password "secret"
    Then I should be on the admin posts page
    And I should see a button labeled "New post"

// Scenario is covered by a Dalek test
  Scenario: If not registered, you cannot log in.
    Given there is no user "josh"
    When I login as "josh" with password "invalid"
    Then I should be on the admin page
    And I should see as error "Your username or password is incorrect"

