import express from 'express'
const app = express()
const port = 3000

app.use(express.json())

let todoData = [
    {id: 1, text: "First todo", completed: false },
    {id: 2, text: "Learn express", completed: false},
    {id: 3, text: "Make millions", completed: true}
]

app.get('/todos', (req, res) => {
    res.json(todoData)
})

app.get('/todos/:id', (req, res) => {
    const todoId = Number(req.params.id)
    const todo = todoData.find(t => t.id === todoId)
    res.json(todo)
})

app.post('/todos', (req, res) => {
    const newTodoText = req.body.text
    const todo = {
        id: Date.now(),
        text: newTodoText,
        completed: false
    }
    todoData.push(todo)
    res.json(todo)
})

// curl -X POST http://localhost:3000/todos \
//   -H "Content-Type: application/json" \
//   -d '{"text":"My new todo"}'

app.listen(port, () => {
    console.log(`Server running now in port ${port}!!!`)
})