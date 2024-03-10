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
    let data = await getdata("table")
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
    const url = `https://script.google.com/macros/s/AKfycby_-Z5qWZO62q9O6vES2x5BmyyWLAN2JVTeFRksleKroAbTvJyfjLifysYLEV2Ly2n06g/exec?type=${type}`
    let response = await fetch(url);
    responsejson = await response.json();
    console.log(responsejson)
    return responsejson
} // read json from googlesheet