require('dotenv').config();

module.exports = {
  paths: ['dist/tests/features/**/*.feature'],
  require: [
    'dist/tests/step-definitions/**/*.js',
    'dist/support/world.js',
    'dist/support/hooks.js'
  ],
  format: ['json:reports/cucumber-report.json'],
  timeout: parseInt(process.env.TIMEOUT || '15000', 10),
};
