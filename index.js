import 'dotenv/config'
import linebot from 'linebot'
import fe from './commands/fe.js'
import be from './commands/be.js'
import anime from './commands/anime.js'
import { scheduleJob } from 'node-schedule'
import * as usdtwd from './data/usdtwd.js'

// https://crontab.guru/once-a-day
scheduleJob('0 0 * * *', () => {
  usdtwd.update()
})
usdtwd.update()

// 基本機器人架構
// 之後可以把帳號資訊放進.env
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

// 當收到訊息時執行一個fn
// 把太多指令拆掉，變成fe，再import呼叫指令回來
bot.on('message', event => {
  if (process.env.DEBUG === 'true') {
    console.log(event)
  }
  // console.log(123)
  if (event.message.type === 'text') {
    if (event.message.text === '前端') {
      fe(event)
    } else if (event.message.text === '後端') {
      // console.log(456)
      be(event)
    } else if (event.message.text.startsWith('動畫')) {
      // 動畫14882
      anime(event)
    } else if (event.message.text === '匯率') {
      event.reply(usdtwd.exrate.toString())
    }
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
// 上面'/'代表 賴裡面 Webhook URL 後面網址要接上什麼。
