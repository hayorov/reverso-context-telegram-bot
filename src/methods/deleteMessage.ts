import axios from "axios"

export default function deleteMessage(message_id: string, chat_id: string) {
  return axios
    .post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/deleteMessage`,
      {
        chat_id: chat_id,
        message_id: message_id,
      }
    )
    .catch((err) => console.error(err))
}
