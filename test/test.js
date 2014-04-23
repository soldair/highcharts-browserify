var test = require('tape');


test("can require hc",function(t){

  var hc = require('../index');

  t.ok(hc,'should have export');
  t.end();
})
