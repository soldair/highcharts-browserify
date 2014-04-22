
// define browser obejcts so require doesnt blow up in tests

var document = {createElement:function(name){ return {getContext:function(){}} },documentElement:{}};
var navigator = {userAgent:'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.3 Safari/537.36'};
var window = {navigator:navigator};
