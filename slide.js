const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const url = "https://www.mirraw.com/";

axios.get(url).then((res) => {
const $ = cheerio.load(res.data);




        const sectionTexts = [];
        const artBody = $(".bjqs").children();
artBody.each((i, element) => {

      
        const img = $(element).find("img").attr('data-original');
      

          sectionTexts.push({

          img:img,
        
          });




  });




        const artFinal = JSON.stringify(sectionTexts);
        const filename ="slide.json";
        fs.writeFileSync(filename, artFinal);





  });



  //first on is empty