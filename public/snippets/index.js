// mkdir nodetest && cd nodetest
// npm init -y
// npm i express cors chalk
// echo >> index.js
// Write code below into 'index.js'

// Modules
const express = require("express")
const cors = require("cors")
const chalk = require("chalk")

// Constants
const PORT = 8080

// Application
const app = express()
app.use(express.json())
app.use(cors())

// Routes
app.get("/", (req, res) => {
    res.send("Hello, World!")
})

// Init
app.listen(PORT, () => console.log(chalk.blue.bold(`Server running on Port: ${PORT}`)))
