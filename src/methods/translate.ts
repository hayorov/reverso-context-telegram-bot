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
        input: text.replace(/.|!|-|(|)|,/, '\\$match'),
        from: from,
        to: to,
        format: "text",
        options: { origin: "reversodesktop", languageDetection: true },
      },
      {
        headers: {
          'Connection': 'keep-alive',
          'Pragma': 'no-cache',
          'Cache-Control': 'no-cache',
          'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'Content-Type': 'application/json; charset=UTF-8',
          'sec-ch-ua-mobile': '?0',
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.54 Safari/537.36',
          'sec-ch-ua-platform': '"Linux"',
          'Origin': 'https://www.reverso.net',
          'Sec-Fetch-Site': 'same-site',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Dest': 'empty',
          'Referer': 'https://www.reverso.net/',
          'Accept-Language': 'en-US,en;q=0.9,ru;q=0.8'
        }
      }
    )
    .then((res) => {
      return res.data.translation[0]
    })
    .catch((err) => console.error(err))
}
