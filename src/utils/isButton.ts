import { emojiMap } from "../methods/generateReplyMarkup"

export default function isButton(message: string) {
  if (message === "🔄") {
    return "swap"
  } else {
    let lang = message.slice(4).toLowerCase()
    lang = Object.keys(emojiMap)
      .filter((x) => x === lang)
      .join("")
    return lang ? lang : null
  }
}
