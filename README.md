# highcharts-browserify

Browserify bundle for [Highcharts](http://www.highcharts.com).

## Installation

```shell
$ npm install --save highcharts-browserify
```

## How to use

```js
var $ = require('jquery');
var HighCharts = require('highcharts-browserify');

new Highcharts.Chart({
  chart: {
    renderTo: $('#my-chart')
  },
  // ... more options - see http://api.highcharts.com/highcharts
});
```

## More graph types

Several extra graph types are included as modules.  By requiring the graph type you need, highcharts will be extended to support that graph type.

```js
var $ = require('jquery');
var HighCharts = require('highcharts-browserify/modules/solid-gauge');

new Highcharts.Chart({
  chart: {
    type: 'solidgauge',
    renderTo: $('#my-chart')
  },
  // ... more options - see http://www.highcharts.com/articles/2-news/46-gauges-ranges-and-polar-charts-in-beta
});
```

## Themes

Just `require` the theme you want to use.  Highcharts will automatically be configured to use that theme.  See [the themes documentation](http://www.highcharts.com/docs/chart-design-and-style/themes) for more information.

```js
var $ = require('jquery');
var HighCharts = require('highcharts-browserify');
require('highcharts-browserify/themes/dark-blue');

new Highcharts.Chart({
  chart: {
    renderTo: $('#my-chart')
  },
  // ... more options - see http://api.highcharts.com/highcharts
});
```

## Collaborators

highcharts-browserify is only possible due to the excellent work of the following collaborators:

 * [smh](https://github.com/smh)
 * [soldair](https://github.com/soldair)
 * [martinlindhe](https://github.com/martinlindhe)
 * [KenanY](https://github.com/KenanY)
 * [achingbrain](https://github.com/achingbrain)
