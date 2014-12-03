var fs = require('fs');

function buildIndexJs() {
  var writeStream = fs.createWriteStream('index.js', { flags: 'w' });
  var serverShimReader = fs.createReadStream('servershim.js');
  var highchartsReader = fs.createReadStream('highcharts.js');
  serverShimReader.pipe(writeStream, { end: false });
  serverShimReader.on('end', function() {
    highchartsReader.pipe(writeStream, { end: false });
  });
  highchartsReader.on('end', function() {
    writeStream.write("module.exports = window.Highcharts;");
    writeStream.end();
  });
}

function buildBrowserJs() {
  var writeStream = fs.createWriteStream('browser.js', { flags: 'w' });
  var highchartsReader = fs.createReadStream('highcharts.js');

  writeStream.write("var $ = require('jquery');");
  highchartsReader.pipe(writeStream, { end: false });
  highchartsReader.on('end', function() {
    writeStream.write("module.exports = window.Highcharts; module.exports.$ = $;");
    writeStream.end();
  });
}

buildIndexJs();
buildBrowserJs();
