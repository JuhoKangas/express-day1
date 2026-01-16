import express from 'express'
import cors from 'cors'
import pool from './db.js'
import dotenv from 'dotenv'
import usersRouter from './routes/users.routes.js'
const app = express()
const port = 3000

dotenv.config()

app.use(cors())
app.use(express.json())

function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`)
    next()
}

function sayHi(req, res, next) {
    console.log("Hi from middleware")
    req.helloMessage = "This is the hellomessage"
    next()
}

app.use(logger)

app.use('/users', usersRouter)

let todoData = [
    {id: 1, text: "First todo", completed: false },
    {id: 2, text: "Learn express", completed: false},
    {id: 3, text: "Make millions", completed: true}
]

app.get('/todos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM todos ORDER BY id ASC')
        
        res.json(result.rows)
    } catch (error) {
        console.log("Error fetching todos:", error)
    }
})

app.get('/todos/:id', sayHi, (req, res) => {
    const todoId = Number(req.params.id)
    const todo = todoData.find(t => t.id === todoId)
    console.log(req.helloMessage)
    res.json(todo)
})

app.post('/todos', async (req, res) => {
    try {
    const newTodoText = req.body.text
    const result = await pool.query(
        'INSERT INTO todos (text, completed) VALUES ($1, $2) RETURNING *', [newTodoText, false]
    )
    res.status(201).json(result.rows[0])
    } catch (error) {
        console.log("error creating a todo", error)
    }
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

app.delete('/todos/:id', (req, res) => {
    try {
    const todoId = Number(req.params.id)

    if (!todoData.find(t => t.id === todoId)) {
        throw new Error("Todo not found")
    }

    todoData = todoData.filter((todo) => todo.id !== todoId)
    res.json({message: "Todo deleted successfully"})
    } catch (error) {
        res.status(404).json({errorMessage: error.message})
    }
})

app.listen(port, () => {
    console.log(`Server running now in port ${port}!!!`)
})