export default {
    //scheduled函式是用來給Cron定時觸發
    async scheduled(event, env, ctx) {
    //從午餐系統取得餐點表格快取
    async function getfood() {
        const url = "https://script.google.com/macros/s/AKfycbzUe-kVJmPLHRvF-ePH_IYlfWQd8o-oX0H1f3NTIygSrug_fiv_7jniyFBTjnUd9zdx/exec"
        let response = await fetch(url);
        const list = await await response.json();
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

      //從google sheet取得表單連結快取
      async function getform() {
        const url = "https://script.google.com/macros/s/AKfycbxwgKVwnnRKiJqPexq7YWafNlz7FZVNTQ6GSHdyYAWvgthkcZdeEqTGeaIy11iwbTelTQ/exec?type=form"
        let response = await fetch(url);
        const data = await await response.json();
        console.log(data);
        return data;
      };

      //需要一個名為foodcache的KV空間來儲存資料
      const table = await getfood();
      const form = await getform();
      await env.foodcache.put("table", JSON.stringify(table));
      await env.foodcache.put("form", JSON.stringify(form))
      await env.foodcache.put("lastupdate", event.scheduledTime);
      console.log(event.scheduledTime);
    },

    //這個workers請求僅回傳最後更新時間
    async fetch(request, env, ctx) {
      let lastupdate = new Date(Number(await env.foodcache.get("lastupdate", { type: "text" })));
      return new Response(`Last update ${lastupdate.toISOString()}`);
    },
};
