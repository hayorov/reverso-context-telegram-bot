import axios from "axios"

export default async function translate(
  text: string,
  from: string,
  to: string
) {
  return axios
    .post(
      "https://api.reverso.net/translate/v1/translation",
      {
        from: from,
        to: to,
        input: text,
        format: "text",
        options: { origin: "contextweb", languageDetection: true },
      },
      { headers: { "Content-Type": "application/json" } }
    )
    .then((res) => {
      return res.data.translation[0]
    })
    .catch((err) => console.error(err))
}
