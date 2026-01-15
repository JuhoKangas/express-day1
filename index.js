import express from 'express'
const app = express()
const port = 3000

app.get('/todos', (req, res) => {
    res.send('Hello from the server!')
})

app.listen(port, () => {
    console.log(`Server running now in port ${port}!!!`)
})