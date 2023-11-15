import axios from 'axios'
import * as cheerio from 'cheerio'
// 引入cheerio 執行 const $ = cheerio.load(data)

export default async (event) => {
  try {
    const { data } = await axios.get('https://wdaweb.github.io/')
    const $ = cheerio.load(data)
    // 套件規則
    const replies = []
    $('#fe .card-title').each(function () {
      replies.push($(this).text().trim())
      // each抓出來的資料放進陣列裡先放著
    })
    event.reply(replies)
    // event.reply 只會運作一次，要放each迴圈外執行(避免bot出錯)
  } catch (error) {
    console.log(error)
  }
}
// 借助套件在node.js裡解析html (postman有時看不到JS)
// 用jq解析html -> cheerio
