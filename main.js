const express = require('express')
const bodyparser = require('body-parser')

const repository = require('./src/asvsRepository')

const app = express()

app.use(bodyparser.json())

app.get('/api/items', (req, res) => {
    res.json(repository.getAll())
})

app.post('/api/items', (req, res) => {
    repository.save(req.body)
    res.end()
})

app.delete('/api/items/:key', (req, res) => {
    console.log(req.params)
    res.end()
})

app.listen(3001)