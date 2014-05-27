Feature: The Admin
  Scenario: Display the Admin 
    Given I visit the admin page 
    Then I should see the login form

   Scenario: Login
     Given a user with username "john" and password "secret"
     When I login as "john" with password "secret"
     Then I should be on the admin posts page
 
