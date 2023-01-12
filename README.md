# Node Meme Scraper

It is a web scraper that scraps the various information of images presented in the website https://memegen-link-examples-upleveled.netlify.app/.
Alsothe application can download images based on user input.

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

```bash
 $ node index <color name > <luminosity>

```

The application also supports user inputs. For the user input it supports upper text, bottom text and the name of images. You will find the uppertext and bottom text on images. Sometimes there is no text on the images for this simpley pass " " a space in tyhe command line. The name can be found by inspecting the source attribute of the images.
The command for downloding the images pass all the parameters in order.Othwrise it will download no image or throw an error.

```bash
$ node index <upper text> <lower text > <name>
```

Note that pass " " if there in no text neither on top nor bottom. And also pass the string inside " " mark your argument contain more than a word. for Example "I'm meme".  
If there is no images specific to your query it will return "Not Found"

Errors. If you pass 1 least one arguments and less then 3 arguments as spcified avobe it will return an error message.

```bash
$ node index meme
$ node index meme bender

```

both of this command will log error message for you.
