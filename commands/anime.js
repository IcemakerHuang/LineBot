// <div class="score-overall-number">5.0</div>
// <div class="data-file"> <img src alt

import axios from 'axios'
import * as cheerio from 'cheerio'
import animeTemplate from '../templates/anime.js'
import fs from 'node:fs'

export default async (event) => {
  try {
    const id = event.message.text.replace('動畫', '')
    const { data } = await axios.get(`https://ani.gamer.com.tw/animeVideo.php?sn=${id}`)
    const $ = cheerio.load(data)

    const template = animeTemplate()

    // 背景圖
    template.body.contents[0].url = $('.data-file img').attr('data-src')
    // Line 檢查出.attr('src') 錯誤，從 postman 發現 web 上顯示的 src 實際是 data-src，故回頭更改。

    // 動畫名稱
    template.body.contents[2].contents[0].contents[0].contents[0].text = $('.data-file img').attr('alt')

    // 星星
    const score = $('.score-overall-number').text()
    const totalStar = Math.round(parseFloat(score))
    // 金星
    for (let i = 0; i < totalStar; i++) {
      template.body.contents[2].contents[0].contents[1].contents[i].url = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
    }
    // 灰星
    for (let i = totalStar; i < 5; i++) {
      template.body.contents[2].contents[0].contents[1].contents[i].url = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'
    }
    // 分數
    template.body.contents[2].contents[0].contents[1].contents[5].text = score
    // 評分人數
    template.body.contents[2].contents[0].contents[2].contents[0].contents[0].text = $('.score-overall-people').text()

    if (process.env.DEBUG === 'true') {
      fs.writeFileSync('./dump/anime.json', JSON.stringify(template, null, 2))
    }
    // 用來 debug，讓 nodemon 建立 dump / anime.js ，好讓我們自己 copy to Line 檢查出 url 問題。

    // fs.writeFileSync('./dump/anime.json', JSON.stringify(template, null, 2))
    // 此 debug行為 有可能讓 linebot 一直偵測 dump 有物件而停止 -->進行忽略
    // 回 package.json 針對 script 修改 "dev": "nodemon index.js --ignore ./dump/*"

    const result = await event.reply({
      type: 'flex',
      altText: '查詢結果',
      contents: template
    })
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}
