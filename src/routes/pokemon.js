const { Router } = require('express');
const { Pokemon, Type } = require('../db')
const axios = require('axios')
const router = Router();
const getPokemonsApi = require('../controllers/getPokemonApi')
const getPokemonDb = require('../controllers/getPokemonDb');
const getAllPk = require('../controllers/getPkAll')
const createPokemon = require('../controllers/createPokemon')
const cors = require('cors')

const corsOptions = {
    origin: 'https://pokemon-40d1c.web.app',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//GET POKEMONS FROM API
router.get('/api', cors(corsOptions), async (req, res, next) => {
    try {
        const result = await getPokemonsApi()
        res.json({ msg: 'This is CORS-enabled for only example.com.' })
        return res.status(200).json(result)
    } catch (err) {
        next(err)
    }
})

router.get('/', async (req, res, next) => {
    try {
        const { name } = req.query
        const getAllPokemon = await getAllPk()
        if (name) {
            const result = getAllPokemon.find(e => e.name.toLowerCase() === name.toLowerCase())
            return res.json(result)
        } else {
            return res.json(getAllPokemon)
        }
    } catch (err) {
        return next(err)
    }
})

//GET POKEMON BY ID PASSED BY PARAMS (:)
// router.get('/:id', async (req, res, next) => {
//     try {
//         const { id } = req.params //el id viene cuando voy al detalle del pokemon, el id se agrega a la ruta 
//         const getAllPokemon = await getAllPk()
//         const result = getAllPokemon.find(e => e.id == id) // find, me devuelve el primer elemento del id que yo estoy buscando, findIndex no, porque me devuelve un numero, y yo quiero el elemento
//         return res.json(result)
//     } catch (err) {
//         next(err)
//     }
// })
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const allId = id.includes("-")
        if (allId) {
            const pokemon = await Pokemon.findByPk(id)
            res.send(pokemon)
        } else {
            const pokemonApi = await axios.get('https://pokeapi.co/api/v2/pokemon/' + id)
            res.send(pokemonApi)
        }
    } catch (err) {
        next(err)
    }
})
//POST CREATED POKEMONS BY BODY
router.post('/', async (req, res, next) => {
    try {
        const { name, height, weight, pkHp, pkAttack, pkDefense, pkSpeed, pkImg, type } = req.body;
        const respose = await createPokemon(name, height, weight, pkHp, pkAttack, pkDefense, pkSpeed, pkImg, type)
        res.send(respose)
    } catch (err) {
        next(err)
    }
})


module.exports = router;