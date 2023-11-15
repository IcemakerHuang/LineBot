import axios from 'axios'

export let exrate = 30

export const update = async () => {
  try {
    const { data } = await axios.get('https://tw.rter.info/capi.php')
    // 資料來自postman
    exrate = data.USDTWD.Exrate
  } catch (error) {
    console.log(error)
  }
}
