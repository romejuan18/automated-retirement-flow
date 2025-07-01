# Automated Retirement Flow E2E Tests

This project automates the **Retirement and Wealth** user flow of a modern web application, using contemporary tools and best practices:

- ✅ [Playwright](https://playwright.dev/) for browser automation  
- ✅ [Cucumber](https://cucumber.io/) for BDD-style tests  
- ✅ TypeScript for scalability and reliability  
- ✅ Docker & Docker Compose for consistency  
- ✅ GitHub Actions for CI/CD  
- ✅ Beautiful HTML reports with Multiple Cucumber HTML Reporter

---

## 📂 Project Structure

```
.
├── src/
│   ├── pages/                   # Page Object Model files
│   ├── tests/
│   │   ├── features/            # Gherkin feature files
│   │   ├── step-definitions/    # Step definitions
│   │   └── data/                # (Optional) test data
│   └── support/                 # Cucumber hooks and custom world
├── .env                         # Local environment variables
├── .env.ci                      # CI environment variables
├── Dockerfile                   # Playwright Docker image
├── docker-compose.yml           # Services for running tests and reports
├── run-tests.sh                 # Main test runner script
├── cucumber.cjs                 # Cucumber config
├── Makefile                     # CLI shortcuts
├── reports/                     # Test report output
└── README.md
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/romejuan18/automated-retirement-flow.git
cd automated-retirement-flow
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Run tests locally

```bash
npm test
```

Or using Docker:

```bash
make run
```

### 4. View the HTML report

```bash
make report
```

Then open: [http://localhost:8888](http://localhost:8888)

---

##  Environment Variables

Use `.env` (for local) or `.env.ci` (for CI):

| Variable                | Description                                  | Example                     |
|-------------------------|----------------------------------------------|-----------------------------|
| `BASE_URL`              | Website base URL                             | `https://blankfactor.com`   |
| `HEADLESS`              | Run browser in headless mode                 | `true` / `false`            |
| `SLOWMO`                | Delay between actions (ms)                   | `0`, `200`, etc             |
| `TIMEOUT`               | Step timeout in milliseconds                 | `15000`, `30000`, etc       |
| `BROWSER`               | Browser to use: `chromium`, `firefox`, `webkit` | `chromium`              |
| `SCREENSHOT_ON_FAILURE`| Capture screenshots on test failure          | `true` / `false`            |
| `CI`                    | CI environment flag                          | `true`                      |

---

##  Docker Compose Commands

```bash
make run        # Run tests only
make report     # Serve last HTML report on http://localhost:8888
make all        # Run tests and serve the report
make clean      # Stop all containers and remove volumes
make reset      # Delete dist/ and reports/ folders
```

---

##  Example Feature File

`src/tests/features/retirement-flow.feature`

```gherkin
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
```

---

##  GitHub Actions CI

The workflow file `.github/workflows/ci.yml` does the following:

- Runs on push and PR to `master`
- Installs dependencies
- Uses `.env.ci`
- Executes tests via `run-tests.sh`
- Uploads the HTML report as an artifact

View results directly in GitHub after each run.

---

##  HTML Report

- Cucumber JSON output: `reports/cucumber-report.json`
- HTML report: `reports/html/index.html`

The report is generated using [`multiple-cucumber-html-reporter`](https://www.npmjs.com/package/multiple-cucumber-html-reporter) and shows:

- Scenario status
- Screenshots on failure
- Metadata: browser, OS, environment

---

##  Optional Linting & Formatting

You may optionally add:

- **ESLint** for code quality
- **Prettier** for code formatting
- **Husky** for Git hooks (e.g., lint before commit)

These tools are not included by default in this boilerplate.

---

##  Optional Features to Add Later

These improvements can be added as the project scales:

- **Run tests by tags** using Cucumber’s `--tags` flag to group test suites (e.g., `@smoke`, `@regression`)
- **Add test coverage** tools
- **Add environment switching** (e.g., staging vs. production)
- **Generate test summary badges** for CI status
- **Add integration with Allure Reports** or advanced dashboards

## License

This project is shared under the MIT License. You're free to use, modify, and share it with proper attribution.
