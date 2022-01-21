const getPokemonDb = require("./getPokemonDb")
const getPokemonsApi = require("./getPokemonApi")


const getAllPk = async () => {
    const api = await getPokemonsApi()
    const db = await getPokemonDb()
    const all = api.concat(db)
    return all
}
module.exports = getAllPk;