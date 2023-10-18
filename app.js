require("dotenv").config()

const express = require("express")
const app = express()
const PORT = process.env.PORT
const routers = require("./routers")
const env = process.env.NODE_ENV

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get("/", (req, res) => {
  res.send("Server from railway")
})

app.use("/", routers)

module.exports = app