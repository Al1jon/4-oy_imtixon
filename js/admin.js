let elCards = document.querySelector('.cards');
let elForm = document.querySelector('.add-form');
var elTitle = document.querySelector('.title');
var elAuthor = document.querySelector('.author');
var elPublishedDate = document.querySelector('.publishedDate');
let elSum = document.querySelector('.result');
let elBtnHome = document.querySelector('.btn-home');
let elBtnAdd = document.querySelector('.btn-add');


let token = localStorage.getItem('token');

if (!token || token == typeof undefined) {
    window.location.href = 'login.html';
}



function renderData(array) {

    elCards.innerHTML = '';

    array.forEach(element => {

        elCards.innerHTML += `
    <div class="card">
        <div class="img-box">
            <img class="card-img" src="${element.volumeInfo.imageLinks.smallThumbnail}" alt="box-img">
        </div>
        <div class="card-body d-flex flex-column justify-content-between">
            <div>
                <h4 class="card-title">${element.volumeInfo.title}</h4>
                <p class="card-text">${typeof (element.volumeInfo.authors) == "object" ? element.volumeInfo.authors[0] : 'Muallif aniqlanmagan!'}</p>
                <p class="card-year">${element.volumeInfo.publishedDate ? element.volumeInfo.publishedDate.substring(0, 4) : 'Nashr yili aniqlanmagan'}</p>
            </div>
            <div>
                <div class="buttons">
                    
                </div>                
                <a href="${element.volumeInfo.previewLink}"><button class="btn btn-Read">Read</button></a>
            </div>
        </div>
    </div>
        `
    })
    elSum.innerHTML = `
    Showing <b>${(array.length) ? array.length : 0}</b> Result(s)`;
}

fetch("https://www.googleapis.com/books/v1/volumes?q=search+terms=java&startIndex=1")
    .then((res) => res.json())
    .then((data) => {
        console.log(data.items);
        renderData(data.items)
    })
// .catch((err) => {
//     console.log('error')
//     alert('xato aniqlandi!')
// })

console.log(elForm)
elForm.addEventListener('submit', (event) => {
    console.log('ishladi')
    event.preventDefault();

    let post = {
        title: elTitle.value,
        authors: elAuthor.value,
        publishedDate: elPublishedDate.value,
    }
    console.log(post)
    fetch("https://63d8d9c474f386d4efdf0611.mockapi.io", {
        method: 'POST',
        // headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),

    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            alert(`ma'lumot muvafaqiyatli qo'shildi`)
        })
        .catch((err) => {
            console.log('error')
            alert(`qo'shishda xato aniqlandi!`)
        })

    console.log(JSON.stringify(post),);

})

elBtnAdd.addEventListener('click', () => {
    elTitle.value = '';
    elAuthor.value = '';
    elPublishedDate.value = '';
})


elBtnHome.addEventListener('click', () => {
    window.location.href = 'home.html';
})








































