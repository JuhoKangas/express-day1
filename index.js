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
    res.status(201).json(todo)
})

// curl -X POST http://localhost:3000/todos \
//   -H "Content-Type: application/json" \
//   -d '{"text":"My new todo"}'

app.patch('/todos/:id', (req, res) => {
    const todoId = Number(req.params.id)
    const updatedTodo = req.body

    if (!todoData.find(t => t.id === todoId)){
        res.status(404).json({ error: "Todo not found"})
        return
    }

    todoData = todoData.map((todo) => {
        if (todo.id === todoId) {
            return { ...todo, ...updatedTodo, id: todo.id}
        }
        return todo
    })

    res.json({ message: "Todo updated successfully"})
})

app.listen(port, () => {
    console.log(`Server running now in port ${port}!!!`)
})