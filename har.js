const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const { fromLog } = require('chrome-har-capturer');
const { writeFileSync } = require('fs');

(async () => {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {port: chrome.port, emulatedFormFactor: 'desktop'};
  const url = 'https://leonardofaria.net';
  const { artifacts: { devtoolsLogs: { defaultPass } } } = await lighthouse(url, options);

  const har = await fromLog(url, defaultPass);
  writeFileSync('page.har', JSON.stringify(har));

  await chrome.kill();
})();
