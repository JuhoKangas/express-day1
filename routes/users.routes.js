import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.json(['alice', 'bob'])
})

router.get('/something', (req, res) => {
    res.json({message: "this is from /users/something"})
})

export default router