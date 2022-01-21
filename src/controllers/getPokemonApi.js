const axios = require('axios')
const getPokemonsApi = async () => {
    const pokemonsApi = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40")
    const pk = pokemonsApi.data.results
    try {
        const res = pk.map(e => axios.get(e.url)) //devuelve un array nuevo, en este caso, devuelve un array de promesas
        let pokemons = Promise.all(res) //devuelve un array de todas las promesas resueltas (data de pokemon)
            .then(e => {
                let pokemon = e.map(e => e.data) //en cada iteracion guarda la data del pokemon
                let allData = pokemon.map(e => ({
                    id: e.id,
                    name: e.name,
                    pkHp: e.stats[0].base_stat, //es un array que tiene varios stats (metricas, puntaje) si puntaje es posicion 0, me trae la vida
                    pkAttack: e.stats[1].base_stat,
                    pkDefense: e.stats[2].base_stat,
                    pkSpeed: e.stats[5].base_stat,
                    height: e.height,
                    weight: e.weight,
                    pkImg: e.sprites.other.home.front_default,
                    type: e.types.length < 2 ? [e.types[0].type.name] : [e.types[0].type.name, e.types[1].type.name]
                }))

                return allData
            })
        return pokemons
    } catch (err) {
    }
}
module.exports = getPokemonsApi