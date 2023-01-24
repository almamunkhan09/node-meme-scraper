# Node Meme Scraper

It is a web scraper that scraps the various information of images presented in the website https://memegen-link-examples-upleveled.netlify.app/.
Also the application can download images based on user input.

## Authors

- [@al mamun khan](https://github.com/almamunkhan09)

## Features

- Srape metadata of images
- Download images from the server
- Write the image file to particular folder
- Also supports user input for for particular sets of file
- Has a cli bar to visualize the running progress of the application

## Documentation

[Documentation](https://linktodocumentation)

This application is developed to scrape image files from specific website mentioned avobe. A slide modification can scape any image file from an html page. Thsis document will show different command line options to parse image data from the html website.

This application generate random color in the rgb color domain. Also feature of luminosity added to this application

First command is

```bash
$ node index
```

It will get all the image from the website and download and store the memes folder. Every run it will overwrite existing file and run without any error

The application also supports user inputs. For the user input it requires three argument. First argument is the text what the user want to see at the top of the image. Then next argument is the text that will appear at the bottom and final argument is the image name,That exist in the image urls in the base website. If the name dont match it will show na error.

```bash
$ node index <upper text> <lower text > <name>
```

Some common name in the website is snek,bender etc.

To download the image of bender type

```bash
$ node index <upper text> <lower text > bender
```

```bash
$ node index meme
$ node index meme bender

```

both of this command will log error message for you.
