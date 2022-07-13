import { launchChromium } from "playwright-aws-lambda";
import { NextApiRequest, NextApiResponse } from "next";
import Font from "../../components/font";
import floor from "lodash/floor";
import map from "lodash/map";
import times from "lodash/times";
import twemoji from "twemoji";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, image, byline }: any = req.query;
  const browser = await launchChromium();

  const context = await browser.newContext();
  const page = await context.newPage();
  page.setViewportSize({
    width: 1200,
    height: 630,
  });

  const emojify = (text: string) => twemoji.parse(text);
  const logo = "https://testingaccessibility.com/assets/logo-mark@2x.png";

  const content = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">

<style>
${Font}

body{
  position: relative;
  overflow: hidden;
    margin: 0; 
    padding: 80px 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: center;
    width: 1200px;
    height: 630px;
    background-color: #F9F4EF;
    font-family: "Aglet Slab";
    color: #0C351B;
}

.resize{
    display: flex;
    align-items: center;
    text-align: left;
    font-weight: bold;
    width: 100%;
    height: 100%;
    color: #0C351B;
    line-height: 1.2;
    max-height: 500px;
    margin: 0;
}

.authorName {
  font-size: 80%;
  font-weight: normal;
}

.created{
    position: absolute;
    left: 200px;
    top: 475px;
}
.orange {
  color: #E24210;
}

.border {
  position: absolute;
  display: flex;
  left: 0;
  bottom: 0;
  width: 1200px;
  height: 16px;
  background: #6F8958;
  
}

.border-red {
  height: 100%;
  width: 5%;
  background: #E24210;
}

.border-yellow {
  background: #F2C684;
  height: 100%;
  width: 40%;
}

img.emoji {
  height: 1em;
  width: 1em;
  margin: 0 .05em 0 .1em;
  vertical-align: -0.1em;
  display: inline-block;
}
</style>
<div class="flex-shrink-0">
${image ? `<img src="${image}" width="480" height="480" />` : ""}
</div>
<main class="flex flex-col justify-center h-full w-full pl-8">
<div class="flex items-center space-x-6 pb-8">
</div>
  <div class="resize">
    ${emojify(title)}
    <div class="orange text-4xl pt-10">Testing Accessibility by Marcy Sutton</div>
  </div>
  
  <div class="border">
  <div class="border-red"></div>
  <div class="border-yellow"></div>
  
  </div>
</main>
<div class="flex items-center space-x-16 absolute right-8 top-8">
<img src="${logo}" width="80" height="80" />
</div>
<script src="https://unpkg.com/textfit@2.4.0/textFit.js"></script>
<script>
    textFit(document.querySelector('.resize'), { multiLine: true, maxFontSize: 70 });
</script>
</body>
</html>
`.trim();

  await page.setContent(content);

  const screenshotBuffer = await page.screenshot();
  await browser.close();

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Content-Length", screenshotBuffer.length);
  // download
  // res.setHeader("Content-disposition", "attachment; filename=review@2x.png");
  res.statusCode = 200;

  res.send(screenshotBuffer);
};
