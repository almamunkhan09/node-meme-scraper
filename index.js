// import packages
import axios from 'axios';
import * as cheerio from 'cheerio';

const url = 'https://memegen-link-examples-upleveled.netlify.app/';

const { data } = await axios(url);
const $ = cheerio.load(data);
const elementSelector = '#images > div';

// $(elementSelector, data).each(() => {
//   if (parentIndex < 10) {
//     // console.log(parentElement);
//     console.log('------------------------------------------------------------');
//     $(parentElement)
//       .children()
//       .each((index, element) => {
//         console.log(element.attribs.href);
//       });
//   }
// });
const sources = [];
const textArrays = [];

$(elementSelector, data).each((index, element) => {
  if (index < 10) {
    const children = $(element).children();
    const children1 = $(children).children();
    const source = $(children1).attr('src');
    //console.log(typeof source);
    sources.push(source);
    const text = source
      .replace('https://api.memegen.link/images/', '')
      .replace(/.([jpg]|[png]|[jpeg])*\?width=[0-9]*/, '')
      .replace(/\~q/, '?')
      .replace(/\_/g, ' ')
      .split('/');

    const textObj = {
      index: index,
      topText:
        text.length <= 2
          ? text.length === 2
            ? text[text.length - 1]
            : ' '
          : text[text.length - 2],
      bottomText: text.length >= 3 ? text[text.length - 1] : '',
    };
    textArrays.push(textObj);

    //console.log($(children1).attr('src'));
  }
});

console.log(textArrays, '----------');
console.log(sources);

// console.log(data);
//console.log($);
//console.log($());
