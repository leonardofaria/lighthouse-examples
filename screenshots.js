const { writeFileSync } = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

(async () => {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {port: chrome.port, emulatedFormFactor: 'desktop'};
  const { lhr: { audits } } = await lighthouse('https://leonardofaria.net', options);

  audits['screenshot-thumbnails'].details.items
    .forEach(({ timing, data }) => {
      debugger;
      const screenshot = data.split(';base64,').pop();
      const screenshotFile = `screenshot-${timing}ms.jpg`;
      writeFileSync(screenshotFile, screenshot, { encoding: 'base64' });
    });

  const finalScreenshotFile = `screenshot-final.jpg`;
  const finalScreenshot = audits['final-screenshot'].details.data.split(';base64,').pop();
  writeFileSync(finalScreenshotFile, finalScreenshot, { encoding: 'base64' });

  await chrome.kill();
})();
