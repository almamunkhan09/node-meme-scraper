// import packages

import { createWriteStream } from 'node:fs';
import * as fs from 'node:fs/promises';
import { clearInterval } from 'node:timers';
import axios from 'axios';
import * as cheerio from 'cheerio';
import cliProgress from 'cli-progress';

// initiate the progess bar
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
bar1.start(200, 0); // Set the final and initial state of bar

// run the bar update a 200 ms interval
const progressbar = setInterval(() => {
  bar1.update(10);
}, 50);

// Website URL
const url = 'https://memegen-link-examples-upleveled.netlify.app/';

// write function to download images from url
const sources = [];

// Define an array of objects where we will put all top texts and buttom texts for more functionaly of the project

const imagesArrays = [];

// Get fetch data from webURL using axios and initiate the cheerio

const { data } = await axios(url);
const $ = cheerio.load(data);

// Get the souce by using cheerio
$('#images > div', data).each((index, element) => {
  if (index) {
    const children = $(element).children();
    const children1 = $(children).children();
    const source = $(children1).attr('src');

    // Push single souce url to the sources array
    sources.push(source);

    // We nedd to Seperate the url sources and image name
    const images = source.split('/');
    const imageName = images[4];
    const imageSrc = images.splice(0, 4).join('/');

    // Save the image name and url spurce in images array for further futuer download
    const textObj = {
      index: index - 1,
      name: imageName,
      source: imageSrc,
    };
    imagesArrays.push(textObj); // push the name and url as an object to the images sources // log here to check if there is any error
  }
});

async function downloadAndSave(URLsources) {
  // check if the folder exists or not
  const fileExists = await fs
    .access('./memes')
    .then(() => true)
    .catch(() => false);

  if (fileExists) {
    await fs.rm('./memes', { recursive: true, force: true }); // Remove directory if the directory exists
  }
  await fs.mkdir('./memes'); // Create directory named memes

  URLsources.forEach((urlSource, index) => {
    if (index + 1 >= 10) {
      axios({
        method: 'get',
        url: urlSource,
        responseType: 'stream',
      })
        .then(function (response) {
          response.data.pipe(createWriteStream(`./memes/${index + 1}.jpg`));
        })
        .catch((err) => err);
    } else {
      axios({
        method: 'get',
        url: urlSource,
        responseType: 'stream',
      })
        .then(function (response) {
          response.data.pipe(createWriteStream(`./memes/0${index + 1}.jpg`));
        })
        .catch((err) => err);
    }
  });
}

// Function that get image sources and top text and bottom text

async function downloadFile() {
  try {
    if (!process.argv[2] && !process.argv[3] && !process.argv[4]) {
      const firstTenURL = [];
      sources.forEach((item, index) => {
        if (index < 10) firstTenURL.push(item);
      });

      await downloadAndSave(firstTenURL);
    } else if (!process.argv[4]) {
      console.error(
        '\n Program Exited with Error. Either provide 3 or no arguments',
      ); // returns if atlaest one but not 3 arguments provided by user
      process.exit();
    } else {
      const nameExist = imagesArrays.filter(
        (item) => item.name === process.argv[4],
      );
      if (!nameExist.length) {
        console.log('Image does not exist');
      } else {
        const existedSource = nameExist.map(
          (item) =>
            `${item.source}/${item.name}/${process.argv[2]}/${process.argv[3]}.png`,
        );
        await downloadAndSave(existedSource);
      }
    }
  } catch (error) {
    throw new Error('Application broken ');
  }
}

downloadFile()
  .then(() => {
    clearInterval(progressbar); // clear the interval
    bar1.update(200); // update the bar to final value so that its shows full bar at finish
    bar1.stop(); // finaly return to console
  })
  .catch((err) => console.log(err));
