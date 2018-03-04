

# Infer the data-type of your variables
Sometimes you want to dynamically infer/guess the best datatype to allocate to a variable. 

This module was written as a part of a CMS that guesses the most appropriate data-type to save data in where the user has not defined it.

# Getting started

```
npm install --save typize
```

OR if you fancy *yarn*

```
yarn add typize
```

## Start Checking Types

```javascript
const  typize = require('typize');

var values = ["http://www.ietf.org/rfc/rfc2732.txt", '💯', new Date(), '2015-1-11 13:57:24'];

values.forEach(function (value) {

    var res = typize(value);
    console.log(JSON.stringify(res, 0, 4));
    
})

```

This will output:

```json
{
    "value": {
        "original": "http://www.ietf.org/rfc/rfc2732.txt",
        "inferred": "http://www.ietf.org/rfc/rfc2732.txt"
    },
    "schema": {
        "type": "text",
        "format": "remote_file"
    }
}
{
    "value": {
        "original": "💯",
        "inferred": "💯"
    },
    "schema": {
        "type": "text",
        "format": "emoji"
    }
}
{
    "value": {
        "original": "2018-02-09T20:21:05.295Z",
        "inferred": "2018-02-09T20:21:05.295Z"
    },
    "schema": {
        "type": "date"
    }
}
{
    "value": {
        "original": "2015-1-11 13:57:24",
        "inferred": "2015-01-11T10:57:24.000Z"
    },
    "schema": {
        "type": "date_time"
    }
}                                                                  
```

## Understanding the results
First, I wrote this module for a project I was working on to be able to detect data-types but also attempt to infer what type of strings I had.

So I added two properties: 
- **value.inferred** : This property holds the value of the data as converted to the inferred datatype. For example, a value of *"1"* will be inferred to as an *"integer"* datatype and thus *"value.inferred"* will be the numeral 1.
- **schema.format** : This value indicates whether any more detailed data-types can be inferred from strings. The example above tells us that *"http://www.ietf.org/rfc/rfc2732.txt"* is not only a string but also a "*remote_file*". 
Formats include:
  - emoji
  - email
  - url
  - list (for comma delimited values such as "man,woman,child")
  - color
  - file
  - remote_file
  - markup

## Check out the tests
Install dev dependencies & check out the various tests by running:
```
npm test
```


## Disclaimer

***NOTE: This module attempts to best guess the user data-type and will not be accurate 100% of the time. Use cautiously.***
