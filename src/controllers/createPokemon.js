const { Pokemon, Type } = require('../db')



const createPokemon = async (name, height, weight, pkHp, pkAttack, pkDefense, pkSpeed, pkImg, type, contexto) => {
    const newPokemon = await Pokemon.create({
        name: name,
        height: height || 0,
        weight: weight || 0,
        hp: pkHp || '',
        attack: pkAttack || '',
        contexto: contexto || '',
        defense: pkDefense || '',
        speed: pkSpeed || '',
        img: pkImg || '',
    })
    let typeDb = await Type.findAll({
        where: { name: type }
    })
    newPokemon.addType(typeDb)

    return newPokemon

}
module.exports = createPokemon