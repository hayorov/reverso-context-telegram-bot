import { Request, Response } from "express"
import { IUser } from "../types"
import deleteMessage from "./methods/deleteMessage"
import generateReplyMarkup from "./methods/generateReplyMarkup"
import sendMessage from "./methods/sendMessage"
import translate from "./methods/translate"
import User from "./models/User"
import isButton from "./utils/isButton"

export default async function handleMessage(req: Request, res: Response) {
  res.status(200).end()

  if (req.body.callback_query) {
    // if user clicked on inline button (selected new language)
    let queryData: string = req.body.callback_query.data.split("-")
    let userId = req.body.callback_query.from.id

    let user: any = await User.findOne({ user_id: userId })
    if (!user) {
      user = await User.create<IUser>({
        user_id: userId,
        input_language: "eng", // to save prefered languages we'll use db
        target_language: "rus",
      })
    }
    user[`${queryData[0]}_language`] = queryData[1]
    await user.save()

    let markup = await generateReplyMarkup("default", {
      lang1: user.input_language,
      lang2: user.target_language,
    })

    await deleteMessage(
      req.body.callback_query.message.message_id,
      req.body.callback_query.message.chat.id
    )
    await sendMessage(userId, "*Done\\!*", markup)
  } else if (req.body.message) {
    // if user send text to translate or click on button under input area to swap or change languages
    let messageText: string = req.body.message.text
    let userId = req.body.message.from.id
    let buttonCheck = isButton(req.body.message.text)

    let user: any = await User.findOne({ user_id: userId })
    if (!user) {
      user = await User.create<IUser>({
        user_id: userId,
        input_language: "eng",
        target_language: "rus",
      })
    }

    if (messageText === "/start") {
      sendMessage(userId, "🤖 👋") //Hello there
    } else if (buttonCheck) {
      // user pressed one of the buttons under input area
      if (buttonCheck === "swap") {
        // if user pressed the swap button swap translate direction
        let inputLang = user.input_language
        let targetLang = user.target_language
        user.input_language = targetLang
        user.target_language = inputLang
        await user.save()

        let markup = await generateReplyMarkup("default", {
          lang1: user.input_language,
          lang2: user.target_language,
        })
        await sendMessage(userId, "*Done\\!*", markup)
      } else {
        // else user wants to select new language
        // determine which language to change
        let type: "input" | "target" =
          user.input_language === buttonCheck ? "input" : "target"
        let markup = await generateReplyMarkup(
          "inline",
          {
            lang1: user.input_language,
            lang2: user.target_language,
          },
          type
        )
        await sendMessage(userId, "*Select language:*", markup)
      }
    } else {
      // finally, none of the above tests passed - just translate text from user
      let markup = await generateReplyMarkup("default", {
        lang1: user.input_language,
        lang2: user.target_language,
      })
      let translated = await translate(
        messageText,
        user.input_language,
        user.target_language
      )
      await sendMessage(userId, translated, markup)
    }
  }
}
