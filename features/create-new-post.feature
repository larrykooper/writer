Feature: Create a new post

  Scenario: Create a new post 
    Given I am a logged-in user
    And I press the button with id "newPost"
    Then I should be on the editor page 