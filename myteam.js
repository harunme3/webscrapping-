const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const url = "https://www.kkr.in/players";


axios.get(url).then((res) => {
const $ = cheerio.load(res.data);

var baseurl="https://www.kkr.in"


        const sectionTexts = [];
        const artBody = $(".si-squadWrap").children();
artBody.each((i, element) => {

      
     
        const img =baseurl +$(element).find(".si-plyer img").attr('data-src');
      
       
        const name = $(element).find(".si-name").text()+" "+$(element).find(".si-surname").text();;
    const link =baseurl+ $(element).filter("a").attr('href');
    console.log(link);
        
        const role= $(element).find(".si-plyer-role").text();

          sectionTexts.push({

            name:name,
            link:link,
          img:img,
          role:role,
        
          });




  });




        const artFinal = JSON.stringify(sectionTexts);
        const filename ="myteam.json";
        fs.writeFileSync(filename, artFinal);





  });