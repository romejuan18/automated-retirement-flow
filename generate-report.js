const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'reports', // folder where cucumber-report.json is located
  reportPath: 'reports/html',
  metadata: {
    browser: {
      name: 'chromium',
      version: 'latest',
    },
    device: 'Docker Container',
    platform: {
      name: 'ubuntu',
      version: '22.04',
    },
  },
  customData: {
    title: 'Run Info',
    data: [
      { label: 'Project', value: 'Automated Retirement Flow' },
      { label: 'Execution Start Time', value: new Date().toLocaleString() },
    ],
  },
});
