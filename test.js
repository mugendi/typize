const util = require('util'),
    chalk = require('chalk'),
    assert = require('assert');

var typize = require('.');

var tests = [

    {
        val: new Date(),
        type: {
            data_type: 'date'
        }
    },

    {
        val: "2018-02-09",
        type: {
            data_type: 'date'
        }
    },

    {
        val: "  2018-02-09  ",
        type: {
            data_type: 'date'
        }
    },

    {
        val: '  2015-1-11 13:57:24',
        type: {
            data_type: 'date_time'
        }
    },

    {
        val: '1',
        type: {
            data_type: 'integer'
        }
    },

    {
        val: -100,
        type: {
            data_type: 'integer'
        }
    },

    {
        val: 18764,
        type: {
            data_type: 'integer'
        }
    },

    {
        val: 18764.00,
        type: {
            data_type: 'integer'
        }
    },

    {
        val: 187.64,
        type: {
            data_type: 'float'
        }
    },

    {
        val: -653.90,
        type: {
            data_type: 'float'
        }
    },

    {
        val: true,
        type: {
            data_type: 'boolean'
        }
    },

    {
        val: 'true',
        type: {
            data_type: 'boolean'
        }
    },

    {
        val: false,
        type: {
            data_type: 'boolean'
        }
    },

    {
        val: 'false',
        type: {
            data_type: 'boolean'
        }
    },

    {
        val: 'TRUE',
        type: {
            data_type: 'boolean'
        }
    },

    {
        val: 'yes',
        type: {
            data_type: 'boolean'
        }
    },

    {
        val: 'NO',
        type: {
            data_type: 'boolean'
        }
    },

    {
        val: 'yes',
        type: {
            data_type: 'boolean'
        }
    },

    {
        val: Infinity,
        type: {
            data_type: 'infinity'
        }
    },

    {
        val: -Infinity,
        type: {
            data_type: 'infinity'
        }
    },

    {
        val: 'http://localhost:3000/sandbox/#editMe',
        type: {
            data_type: 'string',
            string_type: 'url'
        }
    },

    {
        val: 'https://www.npmjs.com/~nguru',
        type: {
            data_type: 'string',
            string_type: 'url'
        }
    },

    {
        val: 'http://en.wikipedia.org/wiki/ReDoS',
        type: {
            data_type: 'string',
            string_type: 'url'
        }
    },


    {
        val: 'http://www.foo.com/abc/def?a=2&b=3',
        type: {
            data_type: 'string',
            string_type: 'url'
        }
    },


    {
        val: 'https://www.google.com/search?safe=off&q=datetime+regex+javascript&oq=datetime+regex&gs_l',
        type: {
            data_type: 'string',
            string_type: 'url'
        }
    },


    {
        val: 'http://www.ietf.org/rfc/rfc2732.txt',
        type: {
            data_type: 'string',
            string_type: 'remote_file'
        }
    },

    {
        val: 'http://home.com/index.html',
        type: {
            data_type: 'string',
            string_type: 'remote_file'
        }
    },

    {
        val: 'https://www.w3schools.com/w3css/w3css_templates.asp',
        type: {
            data_type: 'string',
            string_type: 'remote_file'
        }
    },

    {
        val: 'w3css_templates.asp',
        type: {
            data_type: 'string',
            string_type: 'file'
        }
    },

    {
        val: 'kiprop-amin.HTML',
        type: {
            data_type: 'string',
            string_type: 'file'
        }
    },

    {
        val: 'test Image File.jPEg',
        type: {
            data_type: 'string',
            string_type: 'file'
        }
    },


    {
        val: '⚱️',
        type: {
            data_type: 'string',
            string_type: 'emoji'
        }
    },

    {
        val: '🍏',
        type: {
            data_type: 'string',
            string_type: 'emoji'
        }
    },

    {
        val: '😱',
        type: {
            data_type: 'string',
            string_type: 'emoji'
        }
    },

    {
        val: '💯',
        type: {
            data_type: 'string',
            string_type: 'emoji'
        }
    },

    {
        val: '#ffa',
        type: {
            data_type: 'string',
            string_type: 'color'
        }
    },

    {
        val: '#ff0000',
        type: {
            data_type: 'string',
            string_type: 'color'
        }
    },

    {
        val: '#ff00FF00',
        type: {
            data_type: 'string',
            string_type: 'color'
        }
    },

    {
        val: 'rgb(255,0,0)',
        type: {
            data_type: 'string',
            string_type: 'color'
        }
    },

    {
        val: 'hsla(30, 100%, 50%, .1)',
        type: {
            data_type: 'string',
            string_type: 'color'
        }
    },

    {
        val: 'pencil, PEN, ruler, blackboard',
        type: {
            data_type: 'string',
            string_type: 'list'
        }
    },

    {
        val: 'pencil, pen, ruler, black board',
        type: {
            data_type: 'string',
            string_type: 'list'
        }
    },

    {
        val: 'pencil, PEN, ruler, black-board',
        type: {
            data_type: 'string',
            string_type: 'list'
        }
    },

    {
        val: 'pencil, PEN, ruler, blackBoard',
        type: {
            data_type: 'string',
            string_type: 'list'
        }
    },

    {
        val: '<p>pencil, pen, ruler, black board</p>',
        type: {
            data_type: 'string',
            string_type: 'markup'
        }
    },



];



tests.forEach(function (test, i) {

    //infer datatype
    var res = typize(test.val);


    describe(util.format("Data type tests for %s", chalk.blue(test.val.toString())), function () {

        it(util.format("It should be a %s", test.type.data_type), function () {
            assert.equal(res.type.data_type, test.type.data_type);
        });


        describe(util.format("string_type test", test.type.string_type), function () {

            it(util.format("It's string_type should be %s", test.type.string_type), function () {

                assert.equal(res.type.string_type, test.type.string_type, res.type.string_type);

            })

        })

    });


})