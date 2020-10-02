const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { title } = require("process");
const url = "https://interestingengineering.com/17-inspiring-quotes-from-the-most-successful-tech-ceos";


axios.get(url).then((res) => {
const $ = cheerio.load(res.data);




        const sectionTexts = [];
        const sectionImg = [];
        const artBody = $(".content-text").children();

artBody.each((i, element) => {

      
     
        const img =$(element).find("img").attr('src');
        const title = $(element).filter(".content h2").text();
     
            if(title!="")
            sectionTexts.push(title);


            if(img!=null)
            sectionImg.push(img);





  });





            const createNewJson={

                    title:sectionTexts,
                    img:sectionImg,

            };



        const artFinal = JSON.stringify(createNewJson);
        const filename ="intrestingEngineering.json";
        fs.writeFileSync(filename, artFinal);





  });






  //use it based on the index match because we scraped it from post