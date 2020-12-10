import "dotenv/config"
import express from "express"
import bodyParser from "body-parser"
import handleMessage from "./handleMessage"
import mongoose from "mongoose"

mongoose
  .connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connection) => console.log(connection.connection.port))

const app = express()

app.use(bodyParser.json())

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`)
})

app.post(`/${process.env.BOT_TOKEN}`, handleMessage)
