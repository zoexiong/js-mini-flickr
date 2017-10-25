# js-mini-flickr

This is a mini flickr gallery that shows pictures from flickr.com that with tag #pancake\_the\_cat (pancake is the cat I adopted two years ago).

Infinite scroll and preload is enabled to improve user experience. I also provided tag filter and pin function to help users find desired pictures and pin pictures to mark them as favorite.

### Live demo
* [**Pancake and His Friends Gallery**](http://34.208.219.214:3000/) (hosted on AWS)

### How to install this project

Apply for a Flickr api key at https://www.flickr.com/services/api/misc.api_keys.html

Put your Flickr api key in `service/flickrService.js`

Replace the #tag with your favorite one

#### Run following command in your terminal:

`git clone https://github.com/zoexiong/js-mini-flickr.git`

`cd js-mini-flickr`

`npm install` ( if npm is not installed, install Node.js)

`bower install` ( if bower is not installed, run "npm install -g bower")

`node server.js`

Now you should be able to access the project by going to [http://localhost:3000](http://localhost:3000) in your browser.

(I used some sample code from https://github.com/zhewangjoe/mini-flickr)
