Feature: Read Posts
    As me 
    I want to add a post to the blog 

  Scenario: Add a post
    Given there is a User
    And the User has posted the posting "this is my posting"
    When I visit the homepage
    Then I should see "this is my posting"