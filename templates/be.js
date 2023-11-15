export default () => {
  return {
    type: 'bubble',
    hero: {
      type: 'image',
      url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
      size: 'full',
      aspectRatio: '20:13',
      aspectMode: 'cover'
      // action: {
      //   type: 'uri',
      //   uri: 'http://linecorp.com/'
      // }
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: 'Brown Cafe',
          weight: 'bold',
          size: 'xl'
        }
      ]
    }
  }
}
// 來自line開發頁的 FLEX MESSAGE SIMULATOR 的回覆項目，以 json 形式作為此機器人公版。
// export default 用來處理 json 檔結構(雙引號(json)->單引號(js))
// 直接貼->變數，如果在其他檔案引用時，修改指定值會影響 be.js(傳值傳址)，因此 export default 要轉() => {}，並 return 確保每次給出都是預設格式。
