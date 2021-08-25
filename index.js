
var utils = require('lisa.utils')
var os = require('os')
var path = require('path')
var Type = utils.Type
var lsync = require('lisa.sync')

function GACHE(config){
    var _this = this
    _this._config = config

    this.config = (yourConfig) =>{
        _this._config = yourConfig
    }

    this.set = (keyOrMap , value) =>{
        var syncObj = lsync(_this._config.cacheFilePath)
        var now = Date.now()
        if(Type.isString(keyOrMap)){
            syncObj.sync(data=>{
                data = data || {}
                data[keyOrMap] = {
                    value : value,
                    time : now
                }
                return data
            })
        }else if(Type.isObject(keyOrMap)){
            syncObj.sync(data=>{
                data = data || {}
                for(var key in keyOrMap){
                    data[key] = {
                        value : keyOrMap[key],
                        time : now
                    }
                }
                return data
            })
            
        }
    }

    this.get = async (key, options) =>{
        options = options || {}
        var syncObj = lsync(_this._config.cacheFilePath)
        var now = Date.now()
        var valueObj =await syncObj.get(key)
        if(valueObj && valueObj[key]){
            valueObj = valueObj[key]
            if(options.timeout){
                if(now - valueObj.time < options.timeout){
                    return valueObj.value
                }
            }else{
                return valueObj.value
            }
        }
        return null
    }

    this.getAll = async(options) =>{
        options = options || {}
        var syncObj = lsync(_this._config.cacheFilePath)
        var now = Date.now()
        var valueObj =await syncObj.get()
        if(valueObj){
            var newObj = {}
            for(var key in valueObj){
                var one = valueObj[key]
                if(options.timeout){
                    if(now - one.time < options.timeout){
                        newObj[key] = one.value
                    }
                }else{
                    newObj[key] = one.value
                }
            }
            return newObj
        }
        return null
    }
}


module.exports = config=>{
    if(Type.isString(config)){
        config = {
            cacheFilePath :  path.resolve(os.tmpdir() , config)
        }
    }
    config = config || {
        cacheFilePath : path.join(os.tmpdir() , 'gache.json')
    }

    lsync(config.cacheFilePath , { internal : config.interval ||100})
    return new GACHE(config)
}