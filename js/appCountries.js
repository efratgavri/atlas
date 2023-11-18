import VODClass from "./classCountries.js";
import { declareEvents, createCcountryByLink, getNameByCode } from "./function.js";
// import { declareEvents2 } from "./event.js";

// אם נרצה להוציא פונקציה מהדף הראשי שלנו נייצא אותה בתור פרטמר בפונקציה אחרת
// מערך שיכיל את המערך האחרון של החיפוש שביצענו
let movies_ar = [];

const init = () => {
    doApi("lego");
    // showLoading();
    declareEvents(doApi2);
    // declareEvents2();
    createCcountryByLink(doApi2);
}

// יציג את הטעינה ויסתיר את הרשימה
const showLoading = () => {
    document.querySelector("#id_loading").style.display = "block";
    document.querySelector("#id_row").style.display = "none";
}
// יסתיר את הטעינה ויציג את הרשימה אחרי שהבקשה התקבלה
const hideLoading = () => {
    document.querySelector("#id_loading").style.display = "none";
    document.querySelector("#id_row").style.display = "flex";
}



const doApi = () => {
    showLoading();

    let url = `https://restcountries.com/v3.1/all`;

    fetch(url)

        .then(resp => resp.json())
        .then(data => {
            console.log(data);


            creatMoviesList(data)
            if(data=""){
                alert("Please enter another country");
            }
        })

}

const doApi2 = (_searchQuery) => {
    showLoading();
    console.log(_searchQuery)


    let url2 = `https://restcountries.com/v3.1/name/${_searchQuery}`;

    console.log(url2);
    fetch(url2)

        .then(resp => resp.json())
        .then(data => {
            console.log(data);


            creatMoviesList2(data)
            if(data=""){
                alert("Please enter another country");
            }
        })
        .catch(err => {
            alert("Error")
        })
}

const creatMoviesList2 = (_ar = movies_ar) => {
    hideLoading();

    movies_ar = _ar;

    document.querySelector("#id_row").innerHTML = "";
    // _ar.forEach(item => {
    //     let mov = new VODClass("#id_row", item, getNameByCode, doApi2);
    //     mov.render();
    // })
    
    let mov = new VODClass("#id_row", _ar[0], getNameByCode, doApi2,doApi);
        mov.render();
}

let allCountries_ar = [];
const firstCountries = [
    "israel",
    "united states",
    "france",
    "thailand",


];


const creatMoviesList = (_ar = movies_ar) => {
    hideLoading();
    movies_ar = _ar;
    console.log(_ar[0].name.common);

    let arr = _ar.filter((item) =>
        firstCountries.includes(item.name.common.toLowerCase())
    );

    console.log(arr);
    document.querySelector("#id_row").innerHTML = "";
    arr.forEach(item => {

        let mov = new VODClass("#id_row", item, getNameByCode, doApi2,doApi);
        mov.renderFirst();

    });
};




init();