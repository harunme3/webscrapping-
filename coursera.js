  const axios = require("axios");
  const cheerio = require("cheerio");
  const fs = require("fs");
  const url = "https://www.coursera.org/courses?query=cybersecurity";
  axios.get(url).then((res) => {
  const $ = cheerio.load(res.data);

  var baseurl="https://www.coursera.org"


          const sectionTexts = [];
          const artBody = $(".ais-InfiniteHits-list").children();
  artBody.each((i, element) => {

          const title = $(element).find(".color-primary-text").text();
          const partner_name = $(element).find(".partner-name").text();
          const img = $(element).find("img").attr('src');
          const difficulty = $(element).find(".difficulty").text();
          const link = baseurl+$(element).find(".color-primary-text").attr('href');
          const rating=$(element).find(".ratings-text").text();
          

            sectionTexts.push({

            title:title,
            partner_name:partner_name,
            img:img,
            difficulty:difficulty,
            link:link,
            rating:rating,
            });


 

    });




          const artFinal = JSON.stringify(sectionTexts);
          const filename ="coursera.json";
          fs.writeFileSync(filename, artFinal);





    });