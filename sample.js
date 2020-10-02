const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const url = "https://www.16personalities.com/intj-personality";
axios.get(url).then((res) => {
  const $ = cheerio.load(res.data);
const artTitle = $(".type-info").find("h1").text();
  const artDescription = $(".definition").find("p").next();
  const heroBanner = $("header[class='type-header']").find("img");
  const artIntro = artDescription;
const getSections = function () {
    const sectionTexts = [];
const artBody = $("article").children();
artBody.each((i, element) => {
      const heading = $(element).filter("h2").text().trim();
      const text = $(element).filter("p").text().trim();
      const img = $(element).filter("img");
      const quote = $(element).find(".description - pullout").first();
if (text) {
        sectionTexts[i] = {
          text: text,
        };
      } else if (heading) {
        sectionTexts[i] = {
          heading: heading,
        };
      } else if (img) {
        sectionTexts[i] = {
          image: img.attr("src"),
          altText: img.attr("alt"),
        };
      } else if (quote) {
        sectionTexts[i] = {
          quote: quote,
        };
      }
    });
return sectionTexts;
  };
// Our JSON output
const contentJSON = {
    title: artTitle.trim(),
    description: artDescription.text().trim(),
    heroBanner: {
      url: heroBanner.attr("src"),
      altText: heroBanner.attr("alt"),
    },
    introText: artIntro.text().trim(),
    artBody: getSections(),
  };
const artFinal = JSON.stringify(contentJSON);
  const filename = artTitle.slice(0, 9).trim() + ".json";
  fs.writeFileSync(filename, artFinal);
});