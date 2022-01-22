const { Router } = require('express');
const { Type, Pokemon } = require('../db')
const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const type = await Type.findAll()
        res.send(type)
    } catch (err) {
        next(err)
    }
})

router.post('/create', async (req, res, next) => {
    try {
        const type = await Type.create({
            name: req.body.newTypeName
        })
        res.send({ created: true })
    } catch (err) {
        next(err)
    }
})



module.exports = router;
