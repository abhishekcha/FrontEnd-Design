import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
const PORT = 5111;

app.all("/", (req, res) => {
  // console.log(`REQUEST`,req);
  // console.log(`RESPONSE`,res);
  res.send(`Hello from express server`);
});

const todos = [
  { id: 1, task: "Learn NodeJS" },
  { id: 2, task: "Learn ExpressJS" },
];
// READ
app.get("/todos", (req, res) => {
    res.json(todos);
});

// CREATE
app.post("/todos", (req, res) => {
    const newTodo = req.body;
    todos.push(newTodo);
    res.json({
        message: "Todo added successfully",
    });
});

// UPDATE
app.put("/todos/:id", (req, res) => {
    const { id } = req.params;
    const updatedTodo = req.body;
    const index = todos.findIndex((todo) => todo.id === parseInt(id));
    if (index !== -1) {
        todos[index] = updatedTodo;
        res.json({
            message: "Todo updated successfully",
        });
    } else {
        res.status(404).json({
            message: "Todo not found",
        });
    }
});

// DELETE
app.delete("/todos/:id", (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((todo) => todo.id === parseInt(id));
    if (index !== -1) {
        todos.splice(index, 1);
        res.json({
            message: "Todo deleted successfully!",
        });
    } else {
        res.status(404).json({
            message: "Todo not found",
        });
    }
})
    

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
