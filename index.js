import { createWriteStream } from 'node:fs';
import * as fs from 'node:fs/promises';
// import packages
import axios from 'axios';
import * as cheerio from 'cheerio';

// Website URL
const url = 'https://memegen-link-examples-upleveled.netlify.app/';

// write function to download images from url

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

  URLsources.forEach((url, index) => {
    if (index + 1 >= 10)
      axios({
        method: 'get',
        url: url,
        responseType: 'stream',
      }).then(function (response) {
        response.data.pipe(createWriteStream(`./memes/${index + 1}.jpg`));
      });
    else {
      axios({
        method: 'get',
        url: url,
        responseType: 'stream',
      }).then(function (response) {
        response.data.pipe(createWriteStream(`./memes/0${index + 1}.jpg`));
      });
    }
  });
}

// Function that get image sources and top text and bottom text

async function downloadFile(url) {
  try {
    // Define source array where we will put source urls of images

    const sources = [];

    // Define an array of objects where we will put all top texts and buttom texts for more functionaly of the project

    const textArrays = [];

    //Get fetch data from url using axios and initiate the cheerio

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

        // Get the upper text and buttom text

        const text = source
          .replace('https://api.memegen.link/images/', '') // replaces first part of the image url
          .replace(/.([jpg]|[png]|[jpeg])*\?width=[0-9]*/, '') // replace query and width data of the image
          .replace(/\~q/, '?') // replace \~q as it apeears in url instead of a ? in the text of images
          .replace(/\_/g, ' ') // also replace _ as it appears in url instaed of no top text in the images
          .split('/'); // split the to get array. It still includes a element before the upper text

        // Check if the is no text or has only one text
        const textObj = {
          index: index - 1,
          name: text[0],
          topText:
            text.length <= 2
              ? text.length === 2
                ? text[text.length - 1]
                : ' '
              : text[text.length - 2],
          bottomText: text.length >= 3 ? text[text.length - 1] : ' ',
          source: source,
        };
        textArrays.push(textObj); // Get the texts and the index
      }
    });
    // Run if there is no user inputs
    if (!process.argv[2] && !process.argv[3] && !process.argv[4]) {
      const customURL = sources.filter((item, index) => {
        if (index < 10) return item;
      });

      downloadAndSave(customURL);
    } else {
      if (!(process.argv[3] && process.argv[4])) {
        console.log('Either provide 3 or no arguments'); // returns if atlaest one but not 3 arguments provided by user
        process.exit();
      }
      // Runs if three arguments are provided
      const filterTextArray = textArrays.filter((element) => {
        return (
          element['topText'] === process.argv[2] && // return elements if user provide valid arguments
          element['bottomText'] === process.argv[3] &&
          element['name'] === process.argv[4]
        );
      });
      if (!filterTextArray.length) {
        console.log('No image found');
      } else {
        const customURL = filterTextArray.map((item) => item['source']);
        downloadAndSave(customURL);
      }
    }
  } catch (error) {
    console.log('error occured ', error); //catch error and log it
  }
}

downloadFile(url);
