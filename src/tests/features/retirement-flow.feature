Feature: Retirement Flow

  Scenario: Complete the retirement flow and verify contact title
    Given I navigate to the homepage and accept cookies
    When I go to the Retirement and Wealth page
    And I scroll to the innovation section
    And I hover over the AI & Machine Learning card
    Then I should see the AI card back text
    When I click Let's Get Started
    Then I should be on the contact page
    And the title should contain "Let’s talk"