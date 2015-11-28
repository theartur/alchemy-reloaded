var cheerio = require("cheerio");
var fs = require("fs");

var body = fs.readFileSync("raw/D_MEGA.HTM");

var $ = cheerio.load(body);

var history = [];

console.log(" ( " + body.length + " bytes ) RAFFLES: ", $('body > table > tr').length);

$('body > table > tr').each(function(i, tr) {
    var hasNumber = 9;
    var raffle = [];
    
    // 8 to 3 ( 6 symbols )
    while (--hasNumber >= 3) {
        $(tr).find("td:nth-child(" + hasNumber + ")").each(function(i, td){
            var symbol = parseInt($(td).text(), 10);
            raffle.push(symbol);
        });
    }
    
    raffle.sort(function(a,b){return a-b;});
    
    if (raffle.length == 6) {
        console.log(raffle.join(","));
        history.push(raffle);
    }
});

var output = "alchemy.data = " + JSON.stringify(history, null, "\t");

console.log("\nAlchemy updated to: ", history.length, "\n");

fs.writeFileSync("alchemy-data.js", output);