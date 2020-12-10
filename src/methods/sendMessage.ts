import axios from "axios"

export default async function sendMessage(
  id: string,
  text: string,
  reply_markup?: any,
  change?: "input" | "target"
) {
  let data: any = {
    chat_id: id,
    text: text,
    parse_mode: "MarkdownV2",
  }
  if (reply_markup) data.reply_markup = reply_markup
  axios
    .post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      data
    )
    .catch((err) => console.error(err))
}
