const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

(async () => {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {port: chrome.port, emulatedFormFactor: 'desktop'};
  const { lhr: { audits } } = await lighthouse('https://leonardofaria.net', options);

  const webVitals = {
    largestContentfulPaint: audits['largest-contentful-paint'].displayValue,
    cumulativeLayoutShift: audits['cumulative-layout-shift'].displayValue,
    totalBlockingTime: audits['total-blocking-time'].displayValue,
    largestContentfulPaintElement: audits['largest-contentful-paint-element'].details.items[0].node.snippet,
    layoutShiftElements: audits['layout-shift-elements'].details.items.map(({ node }) => node.snippet).toString(),
  };

  console.log(webVitals);

  await chrome.kill();
})();
