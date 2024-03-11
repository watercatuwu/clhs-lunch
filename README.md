# CLHS Lunch by watercatuwu

先附上來源
[CLHS午餐訂餐系統](https://sites.google.com/view/clhs-lunch/v-2-0)

因為學校的訂餐系統介面手機太難操作+不直覺

所以自己用還學不多的爛爛js還有bootstrap寫了個好看一點的前端

表單以及資料仍是CLHS午餐訂餐系統所有

# 預覽圖
<img src="https://cdn.discordapp.com/attachments/1046603288251990099/1216188996191780945/Screenshot_2024-03-10-09-00-39-54_e4424258c8b8649f6e67d283a50a2cbc.jpg?ex=65ff7b44&is=65ed0644&hm=5444f9a740961d801c8f95caf3e73a4f7382a18ac8beeae5ba56f2009a27be99&" width=300px>

# 特點

- 操作直覺:沒有多餘的按鈕
- 介面整潔:能不放的資訊就不放
- 保護眼睛:字體更大，還預設黑背景，而且不給你改白背景的按鈕(其實是我不會寫lmao)

希望大家多多支持學校的午餐訂餐系統uwub

期待有生之年熱食部可以電子化

減少紙張和時間的浪費並且成為地球超人

# 午餐資料api

這邊提供想要自己寫前端的同學api使用

資料都是開發CLHS午餐訂餐系統的同學手key而來

我只是用爬蟲抓下來並輸出成json方便使用

都是以GET的方式去取得資料

## 每日午餐表格

`https://script.google.com/macros/s/AKfycby_-Z5qWZO62q9O6vES2x5BmyyWLAN2JVTeFRksleKroAbTvJyfjLifysYLEV2Ly2n06g/exec?type=table`

```
{
"mon":[["1","品項名稱","價格"],["2","品項名稱","價格"]],
"tue":[["1","品項名稱","價格"],["2","品項名稱","價格"]]
}
```

## 表單連結

`https://script.google.com/macros/s/AKfycby_-Z5qWZO62q9O6vES2x5BmyyWLAN2JVTeFRksleKroAbTvJyfjLifysYLEV2Ly2n06g/exec?type=form`

```
{
"mon":"https://docs.google.com/forms/d/e/...",
"tue":"https://docs.google.com/forms/d/e/..."
}
```

# 感謝

[CLHS午餐訂餐系統](https://sites.google.com/view/clhs-lunch/v-2-0)
