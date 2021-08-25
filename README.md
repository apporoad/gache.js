# gache.js
global cache  for easy using


## how to use

```js
var GCH = require('lisa.gache.js')

var gch = GCH({
    cacheFilePath : '/yourPath/temp.json',
    interval : 100  // default value
})

// easy init file :  os.tmpdir() + temp.json
gch = GCH('temp.json')

//defaut config is  os.tmpdir() + / + gache.json
gch.config({
    cacheFilePath : '/yourPath/temp.json'
})

gch.set('key' , { yes : 'hello '})

// set map 
gche.set( {
    'key1' : 1,
    'key2' : { hello : 'world'}
}) 

var value = await gche.get('key')

//get value  Within time range   
var value = await gche.get('key1' , { timeout : 60*1000 , default : 'defaultValue' })

//get all

var map = await gche.getAll({ timeout : 60*1000 })
```