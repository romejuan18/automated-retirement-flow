#!/bin/bash
set -euo pipefail

echo "Cleaning old results..."
rm -rf ./dist ./reports

# Detect if its running in CI
if [[ "${CI:-false}" == "true" && -f .env.ci ]]; then
  echo "CI detected. Using .env.ci"
  cp .env.ci .env
else
  echo "Using local .env"
fi

echo "Using environment variables:"
grep -v '^#' .env | grep -E 'BASE_URL|HEADLESS|SLOWMO|BROWSER|CI|TIMEOUT|SCREENSHOT_ON_FAILURE'

echo "Compiling TypeScript..."
npx tsc

echo "Copying feature files..."
mkdir -p dist/tests/features
cp -r src/tests/features/* dist/tests/features/

echo "Step definitions:"
ls dist/tests/step-definitions

echo "Running Cucumber tests..."
npx cucumber-js \
  dist/tests/features \
  --require dist/tests/step-definitions \
  --require dist/support/hooks.js \
  --require dist/support/world.js \
  --format json:reports/cucumber-report.json

echo "Generating HTML report..."
npm run generate:report

echo "Done. Open reports/html/index.html to view the report"
