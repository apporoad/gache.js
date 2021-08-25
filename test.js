var GCH = require('./index')

var testSet = async()=>{
    var gch = GCH('hello.json')
    gch.set('hello', { yes : 'world'})

    gch.set({
        hello : 'world',
        yes : { hello : 'world'},
        type : 1
    })
}

var testSet2 = async()=>{
    var gch = GCH('hello.json')
    gch.set('hello', { yes : 'world'})
}

var testGet = async()=>{
    var gch = GCH('hello.json')
    var one =  await gch.get('hello' , { timeout : 6000})
    console.log('hello:'  + one)
    var all = await gch.getAll({timeout : 6000})
    console.log('all :' + JSON.stringify(all))
}

// testSet()

// setTimeout(() => {
//     testSet2()
// }, 6000);

// setTimeout(() => {
//     testGet()
// }, 3000);

// setTimeout(() => {
//     testGet()
// }, 7000);
testGet()