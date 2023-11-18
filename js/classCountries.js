


export default class VODClass {
    constructor(_parent, _item, _getNameByCode, _doApi2, _doApi) {
        this.getNameByCode = _getNameByCode;
        this.doApi2 = _doApi2;
        this.doApi = _doApi;
        this.parent = _parent;
        // בודק אם יש פוסטר אם לא שם את התמונה של סימפסונס
        //   this.Poster = (_item.Poster != "N/A") ? _item.Poster : "https://m.media-amazon.com/images/M/MV5BMTgxMDczMTA5N15BMl5BanBnXkFtZTcwMzk1MzMzMw@@._V1_SX300.jpg";
        this.name = _item.name.common;
        this.capital = _item.capital;
        this.flags = _item.flags.png;
        this.lat = _item.latlng[0];
        this.lon = _item.latlng[1];
        this.countryCode = _item.cca3;
        this.borders = _item.borders;
        this.languages = _item.languages ? Object.values(_item.languages).join() : "none";
        this.pop = `${(Math.floor((_item.population / 1000000) * 100) / 100).toLocaleString()}M`;
        this.i = 0
    }
    // "vodSingle.html?id=${this.id}" שורת מעבר העמודים מוסיפה את האיידי


    render() {
        let div = document.createElement("div");
        div.className = "col-md-10 p-2";
        document.querySelector(this.parent).append(div);

        // נוסיף משתנה i כדי למערך הקלאסים של id_borders


    //     div.innerHTML = `
    //   <article class="p-2 shadow overflow-hidden h-100 row">
    //   <div >
    //   <img src="${this.flags}" alt="${this.name}"  class="w-25 float-end ms-2">
    //   <h2>${this.name}</h2>
    //   <div>capital:${this.capital}</div>
    //   <div>languages:${this.languages}</div>
    //   <div>pop:${this.pop}</div>
    //   <p class="card-text Mcard-text" id="id_borders"> This borders :</p>
    //   <button id="homebtn" class="btn btn-light my-3 ms-2">Home  <i class="fa fa-home" aria-hidden="true"></i></button>
    //   </div>
    //   <div class="restCardBody">
    //    <div class="Mymap">
    //   <iframe width="500px" height="500px" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
    //   src="https://maps.google.com/maps?q=${this.lat},${this.lon}&hl=es&z=14&amp;output=embed">
    //   </iframe>
    //            </div>
    //          </div>
           
    //   </article>
    //   `;

    div.innerHTML=`
    <div class="row_1">
  <div class="cantry ">
    
    <h2>${this.name}</h2>
    <div>capital:${this.capital}</div>
    <div>languages:${this.languages}</div>
    <div>pop:${this.pop}</div>
    <p class="card-text Mcard-text" id="id_borders"> This borders :</p>
    <button id="homebtn" class="btn btn-light my-3 ms-2">Home <i class="fa fa-home" aria-hidden="true"></i></button>
    <div class="my_flag overflow-hidden">
    <img src="${this.flags}" alt="${this.name}" class=" float-end ms-2 w-100 img_flag "></div>
  </div>
  <div class="restCardBody">
    <div class="Mymap">
      <iframe width="500px" height="500px" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
        src="https://maps.google.com/maps?q=${this.lat},${this.lon}&hl=es&z=14&amp;output=embed">
      </iframe>
    </div>
  </div>
</div>

    `


        if (this.borders) {
            let len = this.borders.length
            this.borders.forEach(async (item) => {
                let fullNmae = await this.getNameByCode(item);
                let span = document.createElement("span");

                span.className = "lank";

                span.innerHTML += `${fullNmae} `;
                this.i += 1;

                document.querySelector("#id_borders").append(span);
                span.addEventListener("click", () => {
                    this.doApi2(fullNmae);
                });


                console.log(this.i);
                // console.log(i)
                if (this.i == len) {
                    span.innerHTML += `.`;
                }
                else {
                    span.innerHTML += `, `;

                }

            });
        } else {
            document.querySelector("#id_borders").innerHTML += "none";
        }

        let btn = div.querySelector("#homebtn")
        btn.addEventListener("click", () => {
            this.doApi()
        })
    }


    renderFirst() {
        let div = document.createElement("div");
        div.className = "col-md-4 p-2";
        document.querySelector(this.parent).append(div);

        div.innerHTML = `
      <article class="p-2 shadow overflow-hidden h-100 col-md-12">
      <img src="${this.flags}" alt="${this.name}"  class="w-25 float-end ms-2">
      <h2>${this.name}</h2>
      
      </article>
       `
        div.addEventListener("click", async () => {
            document.querySelector("#id_row").innerHTML = "";
            let fullName = await this.name

            console.log(this.name)

            this.doApi2(fullName)

        });






    }

}


