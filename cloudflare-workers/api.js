export default {
    async fetch(request, env, ctx) {
      const url = new URL(request.url);
      const type = url.searchParams.get('type'); //取得url中的type
      const data = await env.foodcache.get(type, { type: "json" });//根據type取得使用者需要的資料

      return new Response(JSON.stringify(data), {
        headers: {
            //允許不同源請求
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      }
    });
    },
  };