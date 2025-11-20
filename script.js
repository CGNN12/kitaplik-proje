const nameInput = document.getElementById("nameİnput");
const yazarInput = document.getElementById("yazarİnput");
const checkInput = document.getElementById("checkİnput");
const ekleBtn = document.getElementById("ekleBtn");
const bookList = document.getElementById("bookList");
const deleteBtn = document.getElementById("deleteBtn");



class Kitap {
    constructor(ad, yazar, okunduMu) {
        this.ad = ad;
        this.yazar = yazar;
        this.okunduMu = okunduMu;        
}}

let kitaplık = JSON.parse(localStorage.getItem("kütüphanem")) || [];

ekleBtn.addEventListener("click", function() {
    let ad = nameInput.value;
    let yazar = yazarInput.value;
    let okunduMu = checkInput.checked;

    let yeniKitap = new Kitap(ad, yazar, okunduMu);
    kitaplık.push(yeniKitap);
    localStorage.setItem("kütüphanem", JSON.stringify(kitaplık));
    
    kitapListele();
})

function kitapListele() {
    bookList.innerHTML = "";

    kitaplık.forEach( (kitap, index)=> {
        let durumYazısı = kitap.okunduMu ? "Okundu" : "Okunmadı";
        let durumClass = kitap.okunduMu ? "durum-okundu" : "durum-okunmadı";

        let li = document.createElement("li");
        li.innerHTML = `<span class="book-name">${kitap.ad} - ${kitap.yazar}</span> 
        <span class="${durumClass}">${durumYazısı}</span><button onclick="kitapSil(${index})" id="deleteBtn">❌️</button>`;
        bookList.appendChild(li);
    } )
}

function kitapSil(index) {
    kitaplık.splice(index, 1);

    localStorage.setItem("kütüphanem", JSON.stringify(kitaplık));
    kitapListele();
}

kitapListele();

const dialog = document.getElementById("dialog");
const açbtn = document.getElementById("açbtn");

açbtn.addEventListener("click", function() {
    dialog.showModal();
})



