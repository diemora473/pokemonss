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
const { conn } = require('./src/db.js');
const { Type } = require('../api/src/db')
const axios = require('axios')
// Syncing all the models at once.

//AGREGO TODOS LOS TIPOS DE LA API A LA DATABASE
const addTypeToDb = async () => {
  try {
    // console.log('entra')
    const typeFromApi = await axios.get('https://pokeapi.co/api/v2/type')
    // console.log(typeFromApi)
    const typesNames = typeFromApi.data.results
    // console.log(typesNames)
    typesNames.map(e => {
      Type.create({ name: e.name })
    })
  } catch (err) {
    console.error(err)
  }
}

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('funcionando'); // eslint-disable-line no-console
  });
});
