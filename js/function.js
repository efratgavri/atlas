import Country from "./classCountries.js";


export const declareEvents = (doApi2) => {
    let search_btn = document.querySelector("#search_btn");
    let id_input = document.querySelector("#id_input");



    id_input.addEventListener("keydown", (e) => {
        console.log(e.key)
        // e.key => מכיל על איזה מקש לחצנו במקלדת ובדקנו שזה אנטר
        if (e.key == "Enter") {
            doApi2(id_input.value);
        }
    })

    search_btn.addEventListener("click", () => {
        doApi2(id_input.value);
    })
}
let allCountries_ar = [];
export const createCountryByCode = (_input) => {
    document.querySelector("#id_row").innerHTML = "";

    let arr = allCountries_ar.filter((item) =>
        item.cca3.toLowerCase().includes(_input.toLowerCase())
    );
    if (_input === "" || _input === " ") {
        alert("empty");
    } else if (arr.length > 0) {
        arr.forEach((item) => {
            let country = new Country("#id_parent", item);
            country.render();
        });
    } else {
        document.querySelector(
            "#id_parent"
        ).innerHTML = `<h2>The Country ${_input} is  not found </h2>`;
    }
    document.querySelector("#id_load").classList.add("d-none");
};

// func bring full name
export const getNameByCode = async (code) => {
    let url = `https://restcountries.com/v3.1/alpha/${code}`;
    let resp = await fetch(url);
    console.log(resp.json)
    let data = await resp.json();
    console.log(data);
    console.log(data[0].name.common);
    return data[0].name.common;
  }

export const createCcountryByLink = (doApi2) => {

    let israel_li = document.querySelector("#id_israel_li");
    let USA_li = document.querySelector("#id_USA_li");
    let France_li = document.querySelector("#id_France_li");
    let UK_li = document.querySelector("#id_UK_li");
    let thailand_li = document.querySelector("#id_thailand_li");
    let parent = document.querySelector("#id_row");

    israel_li.addEventListener("click", () => {
        parent.innerHTML = "";
        doApi2("israel")

    })
    USA_li.addEventListener("click", () => {
        parent.innerHTML = "";
        doApi2("united states")

    })
    France_li.addEventListener("click", () => {
        parent.innerHTML = "";
        doApi2("france")

    })
    UK_li.addEventListener("click", () => {
        parent.innerHTML = "";
        doApi2("united kingdom")

    })
    thailand_li.addEventListener("click", () => {
        parent.innerHTML = "";
        doApi2("thailand")

    })
}