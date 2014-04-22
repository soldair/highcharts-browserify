
cat ./servershim.js > index.js
cat ./highcharts.js >> index.js
echo "console.log(window); module.exports = window.Highcharts;" >> index.js
cat ./highcharts.js > browser.js
echo "module.exports = window.Highcharts;" >> browser.js
