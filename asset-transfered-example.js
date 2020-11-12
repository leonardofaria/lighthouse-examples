const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

(async () => {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {port: chrome.port};
  const runnerResult = await lighthouse('https://leonardofaria.net', options);

  const assets = {};
  runnerResult.lhr.audits['resource-summary'].details.items
    .filter(({ transferSize }) => transferSize > 0)
    .forEach(({ resourceType, transferSize }) => {
      assets[resourceType] = transferSize;
    });

  console.log(assets);

  await chrome.kill();
})();
