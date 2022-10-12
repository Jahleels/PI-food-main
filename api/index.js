//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Recipe, Diet, Mix } = require('./src/db.js');
const fs = require('fs')

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
  fs.readFile('foodComplexSearch.json', (error, data) => {
    if(error) throw error;
    let dietsSet = new Set()
    let json = JSON.parse(data)
    let arr = json.results.map( item => {
      
      item.diets?.forEach( diet => dietsSet.add(diet))

      return Recipe.create({
        id:item.id,
        name:item.title,
        summary:item.summary,
        healthScore:item.healthScore,
        procedure: item.analyzedInstructions[0]?.steps.map(item => {return {step:item.step}}),
        img: item.image,
        mixes: item.diets?.map( diet => {
          let diets = [...dietsSet]
          return ({dietId:diets.indexOf(diet)})
        })
      }, {include: Mix})
    })


    let counter = 0
    let diets = [...dietsSet].map(diet => Diet.create({id: counter++, name:diet}))
    Promise.all(arr)
    Promise.all(diets)
  })
});
