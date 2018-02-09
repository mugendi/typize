var types = {
        data_types: {
            infinity: function (value) {
                var neginf = Number.NEGATIVE_INFINITY,
                    posinf = Number.POSITIVE_INFINITY;

                if (value === neginf || value === posinf) return value;
                return null;
            },
            date_time: function (value) {
                let p = /^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/,
                 val = types.data_types.date(value)

                if (types.data_types.date(value)) {
                    return p.test(value) ? val : null;
                }

                return null
            },
            date: function (value) {
                if (value instanceof Date) {
                    return value;
                }

                if (typeof value !== 'string') {
                    return null;
                }

                return ((value.length >= 6) && new Date(value) !== "Invalid Date") && !isNaN(new Date(value)) ? new Date(value) : null;
            },
            boolean: function (value) {
                if (value === true) {
                    return true;
                }
                if (value === false || value === null) {
                    return false;
                }

                var type = typeof value;

                if (type === 'string') {
                    if (['true', 'yes'].indexOf(value.toLowerCase().trim()) >= 0) {
                        return true
                    } else if (['no', 'false'].indexOf(value.toLowerCase().trim()) >= 0) {
                        return false
                    }
                }
                return null;
            },
            undefined: function (value) {
                if (typeof value === 'undefined') {
                    return undefined
                }
                return null;
            },
            integer: function (value) {
                if (Number.isInteger(value)) {
                    return value;
                }

                var num = Number(value),
                    int = Number.parseInt(value);

                // console.log(num,int, Number.isInteger(num));
                if (num == int && Number.isInteger(num)) {
                    return num;
                } else {
                    return null;
                }
            },
            float: function (value) {

                var num = Number(value),
                    float = Number.parseFloat(value);

                if (num == float) {
                    return num;
                } else {
                    return null;
                }
            },
            string: function (value) {
                return typeof value === 'string' ? value : null;
            }
        },
        string_types: {
            email: function (value) {
                var p = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return p.test(value) ? value : null;
            },
            url: function (value) {
                var p = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
                return p.test(value) ? value : null;
            },
            list: function (value) {
                if (typeof value !== 'string') {
                    return null
                }

                let o, arr2,
                    p = /^[\w]+\s*,\s*[\w]+/i;

                if (p.test(value)) {
                    var arr = value.split(',').map(v => type(v).type);
                    arr = Array.from(new Set(arr.map(a => a.data_type)));
                    // console.log(arr);
                    return arr.length == 1 ? value : null;
                }

                return null;

            },
            markup : function (value) {
              let p = /<([A-Z][A-Z0-9]*)\b[^>]*>(.*?)<\/\1>/i

              return p.test(value) ? value : null;
            },
            color: function (value) {
                let p = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/i

                return p.test(value) ? value : null;

            },
            emoji: function (value) {
                let p = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g

                return p.test(value) ? value : null;
            },
            remote_file: function (value) {
                return (types.string_types.url(value) && /\..{2,4}$/.test(value)) ? value : null
            },
            file: function (value) {
                var p = /\.[a-z0-9]{2,4}$/i;
                return p.test(value) ? value : null;
            }
        }
    },
    test_order = {
        data_types: ['undefined', 'infinity', 'integer', 'float', 'date_time', 'date', 'boolean', 'string'],
        string_types: [ 'remote_file', 'file', 'url', 'email', 'color', 'emoji', 'list', 'markup']
    }




function get(f, value){
    return (typeof value == 'string') ? f(value.trim()) : f(value);
}

function type(value) {

    let f, t, v, typeObj;

    for (var i in test_order.data_types) {

        t = test_order.data_types[i];
        f = types.data_types[t];
        v = get(f, value);

        if (v !== null) {
            // console.log('object');
            typeObj = {
                value: {
                    original: value,
                    inferred: v
                },
                type: {
                    data_type: t
                }
            }
            break;
        }

    }

    if (!typeObj) {
        typeObj = {
            value: {
                original: value.toString(),
                inferred: null
            },
            type: 'string'
        }
    }


    return typeObj;
}

function string_type(value, typeObj) {
    if (typeof value !== 'string') {
        return typeObj;
    }

    let f, t, v;


    for (var i in test_order.string_types) {

        t = test_order.string_types[i];
        f = types.string_types[t];
        v = get(f, value);

        if (v !== null) {
            typeObj.type['string_type'] = t;
            break;
        }

    }

    return typeObj;
}



module.exports = function (value) {
    return string_type(value, type(value))
};