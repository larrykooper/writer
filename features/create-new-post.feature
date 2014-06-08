Feature: Create a new post

    Scenario: Sign in
        Given I am a logged-in user
        And I press the button with id "newPost"
        Then I should be on the editor page
