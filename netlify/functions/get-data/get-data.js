const chromium = require('chrome-aws-lambda');

exports.handler = async (event, context) => {
  const pageUrl = 'https://www.linkedin.com/in/michaelpallister/';

  if (!pageUrl)
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Page URL not defined' }),
    };

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });

  const page = await browser.newPage();

  await page.goto(pageUrl, { waitUntil: 'networkidle2' });

  const title = await page.title();
  console.log('done on page', title);

  await browser.close();

  return {
    statusCode: 200,
    body: JSON.stringify({
      title,
    }),
  };
};
