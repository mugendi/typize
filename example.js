const typize = require('.');

var values = ["http://www.ietf.org/rfc/rfc2732.txt", '💯', new Date(), '2015-1-11 13:57:24', 'ngurumugz@gmail.com', '1-100', 'a,b,c,d,e,1,2'];

values.forEach(function (value) {

    var res = typize(value);
    console.log(JSON.stringify(res, 0, 4));
    
})