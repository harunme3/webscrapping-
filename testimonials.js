const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const url = "https://techcrunch.com/";

axios.get(url).then((res) => {
const $ = cheerio.load(res.data);




        const sectionTexts = [];
        const artBody = $(".river").children();
artBody.each((i, element) => {

      
        const author = $(element).find(".river-byline__authors").text();
        const img = $(element).find("img").attr('src');
        const link =$(element).find(".post-block__title__link").attr('href');
        const title = $(element).find(".post-block__title__link").text();
        const content= $(element).find(".post-block__content").text();

          sectionTexts.push({

          title:title,
          author:author,
          img:img,
          content:content,
          link:link,
          });




  });




        const artFinal = JSON.stringify(sectionTexts);
        const filename ="testimonials.json";
        fs.writeFileSync(filename, artFinal);





  });