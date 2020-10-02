const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const url = "https://www.coursera.org/learn/it-security#reviews";
axios.get(url).then((res) => {
const $ = cheerio.load(res.data);




        const sectionTexts = [];
        const artBody = $(".rc-TopReviewsList").children();
artBody.each((i, element) => {

        const name= $(element).find(".rc-TopReviewsListItem__info span:nth-child(1) ").text();
        const review = $(element).find(".rc-TopReviewsListItem__comment").text();
      

          sectionTexts.push({

            name:name,
           review:review,
          });




  });




        const artFinal = JSON.stringify(sectionTexts);
        const filename ="courserareview.json";
        fs.writeFileSync(filename, artFinal);





  });