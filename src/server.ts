import express from "express"
import axios from "axios"
import dotenv from "dotenv"
import bodyParser from "body-parser"

dotenv.config()

const app = express()

app.use(bodyParser.json())

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`)
})

app.post(`/${process.env.BOT_TOKEN}`, async (req, res) => {
  res.status(200).end()

  let translate = await axios
    .post(
      "https://api.reverso.net/translate/v1/translation",
      {
        from: "eng",
        to: "rus",
        input: req.body.message.text,
        format: "text",
        options: { origin: "contextweb", languageDetection: true },
      },
      { headers: { "Content-Type": "application/json" } }
    )
    .then((res) => {
      return res.data.translation[0]
    })
    .catch((err) => console.error(err))

  axios.post(
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
    { chat_id: req.body.message.from.id, text: translate }
  )
})
