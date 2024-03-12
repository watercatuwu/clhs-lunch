async function selectday(){
    let select = document.querySelector("#dayselect").value; // get select value
    document.getElementById("dayselect").disabled = true; //disable select
    document.getElementById("spinner").classList.remove("visually-hidden")
    document.getElementById("form").classList.add("disabled")

    let t = document.querySelector("#table-row");
    let td = t.content.querySelectorAll("td");
    let th = t.content.querySelector("th");
    let tb = document.querySelector("#foodtablebody");
    tb.innerHTML=""; //clean tbody

    let formdata = await getdata("form")
    document.getElementById("form").href = formdata[select];

    // table-genarator
    let data = await getfood();
    data[select].push(["+","加飯", 0])
    data[select].push(["＋","加麵", 0])
    for(let i = 0; i < data[select].length ; i++){
    th.textContent = data[select][i][0];
    td[0].textContent = data[select][i][1];
    td[1].textContent = data[select][i][2];
    let clone = document.importNode(t.content, true);
    tb.appendChild(clone);
    } // 逐行寫入
    document.getElementById("dayselect").disabled = false;
    document.getElementById("spinner").classList.add("visually-hidden")
    if (select !== "uwu"){
        document.getElementById("form").classList.remove("disabled")
    }
}


async function getdata(type) {
    const url = `https://script.google.com/macros/s/AKfycbxwgKVwnnRKiJqPexq7YWafNlz7FZVNTQ6GSHdyYAWvgthkcZdeEqTGeaIy11iwbTelTQ/exec?type=${type}`
    let response = await fetch(url);
    let responsejson = await response.json();
    console.log(responsejson)
    return responsejson

}
async function getfood() {
    const url = "https://clhslunchapi.watercat0330.workers.dev/"
    let response = await fetch(url);
    return await response.json()
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function choose(){
    let main = ["1","2","3","4","5","6","7","8","①","②","③"]
    let drinks = ["A","B","C","水","手搖"]
    document.getElementById("choosebtn").classList.add("disabled")
    for (let i = 0; i < 5; i++) {
    document.getElementById("choice").innerText = (`吃${main[Math.floor(Math.random() * main.length)]}喝${drinks[Math.floor(Math.random() * drinks.length)]}`)
    await sleep(100)
    }
    await sleep(500)
    document.getElementById("choosebtn").classList.remove("disabled")
    document.getElementById("choosebtn").innerHTML = `<i class="bi bi-arrow-clockwise"></i>再選一次?`
}