Feature: Create a new post

    Scenario: Sign in
        Given I am not signed in
        And I sign in
        And I press the button with id "newPost"
        Then I should be on the editor page
