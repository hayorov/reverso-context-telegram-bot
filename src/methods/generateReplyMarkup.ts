import { Lang } from "../../types"

let emojiMap = {
  eng: "🇺🇸",
  rus: "🇷🇺",
  ger: "🇩🇪",
  dut: "🇳🇱",
  fra: "🇫🇷",
  ita: "🇮🇹",
  pol: "🇵🇱",
  por: "🇵🇹",
  spa: "🇪🇸",
  tur: "🇹🇷",
}
export default async function generateReplyMarkup(
  markup: "inline" | "default",
  langs: {
    lang1: Lang
    lang2: Lang
  },
  type?: "input" | "target"
) {
  let list = [
    { text: emojiMap.eng + "ENG", callback_data: `${type}-eng` },
    { text: emojiMap.rus + "RUS", callback_data: `${type}-rus` },
    { text: emojiMap.fra + "FRA", callback_data: `${type}-fra` },
    { text: emojiMap.ita + "ITA", callback_data: `${type}-ita` },
    { text: emojiMap.ger + "GER", callback_data: `${type}-ger` },
    { text: emojiMap.dut + "DUT", callback_data: `${type}-dut` },
    { text: emojiMap.pol + "POL", callback_data: `${type}-pol` },
    { text: emojiMap.por + "POR", callback_data: `${type}-por` },
    { text: emojiMap.spa + "SPA", callback_data: `${type}-spa` },
    { text: emojiMap.tur + "TUR", callback_data: `${type}-tur` },
  ]
    .filter((entry) => {
      let lang = entry.callback_data.split("-")[1]
      if (lang === langs.lang1 || lang === langs.lang2) return false
      else return true
    })
    .map((x, i, arr) => {
      if (i === arr.length - 1) return ""
      if (i === 0 || (i + 1) % 2 === 0) {
        return [{ ...x }, { ...arr[i + 1] }]
      } else return ""
    })
    .filter((entry) => entry !== "")

  if (markup === "inline") {
    let replyMarkup = {
      inline_keyboard: list,
      resize_keyboard: true,
    }
    return replyMarkup
  } else {
    let input
    let target

    for (let lang in emojiMap) {
      if (lang === langs.lang1) {
        input = `${emojiMap[lang]}${langs.lang1.toUpperCase()}`
      }
      if (lang === langs.lang2) {
        target = `${emojiMap[lang]}${langs.lang2.toUpperCase()}`
      }
    }

    let replyMarkup = {
      keyboard: [[{ text: input }, { text: "🔄" }, { text: target }]],
      resize_keyboard: true,
    }
    return replyMarkup
  }
}

export { emojiMap }
