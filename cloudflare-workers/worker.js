import { DateTime } from "./luxon.js";


export default {
  async scheduled(event, env, ctx) {
    async function getfood() {
      const url = "https://script.google.com/macros/s/AKfycbzUe-kVJmPLHRvF-ePH_IYlfWQd8o-oX0H1f3NTIygSrug_fiv_7jniyFBTjnUd9zdx/exec"
      let response = await fetch(url);
      const list = await response.json();
      const day = ["mon","tue","wed","thu","fri","sat"];
      let food = {};
      for(let i = 0; i < day.length; i++){
          let daylist = []; // 建立陣列儲存單日的餐點
          for(let j = 1; j < list.length-1; j++){
              let obj = [list[j]["data"][0],list[j]["data"][1+(2*i)],list[j]["data"][1+1+(2*i)]];
               //api叫出來的是[1,"星期一的餐點","星期一的價格","星期二的餐點","星期二的價格"...]所以每次遍歷都要+2
               //價格欄位是餐點欄位+1 => [1+1+(2*i)]
               //其實這邊也可以寫for，可是會很難維護
              daylist.push(obj); //儲存單個餐點到陣列中
          food[day[i]] = daylist; //將陣列儲存到物件
          };
      };
      console.log(food);
      return food;
    };

    async function getform() {
      const url = "https://script.google.com/macros/s/AKfycbxwgKVwnnRKiJqPexq7YWafNlz7FZVNTQ6GSHdyYAWvgthkcZdeEqTGeaIy11iwbTelTQ/exec?type=form"
      let response = await fetch(url);
      const data = await response.json();
      console.log(data);
      return data;
    };

    async function getstatistic(){
      const url = "https://script.google.com/macros/s/AKfycbw9QbAFvVKi3IuWbyJF0TA-bpsN9AyVv3ZZ3P5N3siG577BP6fMK_I1M_CvcwZBbMS5fQ/exec"
      let response = await fetch(url);
      const data = await response.json();

      function sortdata(day, element){
        // 一組data有六天共360項
        // 將資料處理成60項一組，便於單日讀取
        let list = [];
        for (let i = 1+60*(day-1); i < 60*day+1; i++) {
            list.push(data[element]["data"][i])
        };
        return list;
    }

    let result = {};
    let days = ["mon","tue","wed","thu","fri","sat"]
    for (let day = 1; day < 6+1; day++) {
        let obj = {};
        for (let classn = 0; classn < 60; classn++) {
            let list = [];
            for (let element = 2; element < 22+1; element++){
                list.push(sortdata(day, element)[classn]);
            };
            obj[sortdata(1,1)[classn]] = list;
        };
        result[days[day-1]] = obj;
    };
      console.log(result)
      return result;
    }

    const table = await getfood();
    const form = await getform();
    const statistic = await getstatistic();
    await env.foodcache.put("table", JSON.stringify(table));
    await env.foodcache.put("form", JSON.stringify(form));
    await env.foodcache.put("statistic", JSON.stringify(statistic));
    let updatetime = new Date(event.scheduledTime);
    let lastupdate = DateTime
    .fromISO(updatetime.toISOString())
    .setZone('Asia/Taipei')
    .toFormat('yy/MM/dd HH:mm:ss');
    await env.foodcache.put("lastupdate", lastupdate);
    console.log(event.scheduledTime);
  },

  async fetch(request, env, ctx) {
    let result;
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    if (type!=null){
    const data = await env.foodcache.get(type, { type: "json" });
    result = JSON.stringify(data);
    }
    else{
      result = await env.foodcache.get("lastupdate", { type: "text" });
    };

    return new Response(result, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      }
    });
  },
};
