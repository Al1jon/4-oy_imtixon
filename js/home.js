let elCards = document.querySelector('.cards');
let elBookList = document.querySelector('.list');
let elCard = document.querySelector('.card');
let elSum = document.querySelector('.result');
let elmodal = document.querySelector('.offcanvas-body');
let elmodalTitle = document.querySelector('.offcanvas-title');
let elmodalfooter = document.querySelector('.offcanvas-footer');
let elSearch = document.querySelector('#search');
let elBtnLogout = document.querySelector('.btn-logout');
let elBtnAdmin = document.querySelector('.btn-admin');
let elBtnOrder = document.querySelector('.btn-order');
let elCarousel = document.querySelector('.carousel-inner');


let token = localStorage.getItem('token');

if (!token || token == typeof undefined) {
    window.location.href = 'login.html';
}


var BookArray = [];

function renderData(array) {

    BookArray = array;
    // console.log(array.length)
    if (array == undefined) {
        elCards.innerHTML = `
        <h1>Ma'lumot topilmadi !<h1>
        `
    }
    else {
        console.log(array)
        elCards.innerHTML = '';
        elCarousel.innerHTML = '';
        let num = 0;
        array.forEach(element => {

            elCards.innerHTML += `
    <div class="card">
        <div class="img-box">
            <img class="card-img" src="${element.volumeInfo.imageLinks ? element.volumeInfo.imageLinks.smallThumbnail : '/images/Group193.svg'}" alt="book-img">
        </div>
        <div class="card-body d-flex flex-column justify-content-between">
            <div>
                <h4 class="card-title">${element.volumeInfo.title}</h4>
                <p class="card-text">${typeof (element.volumeInfo.authors) == "object" ? element.volumeInfo.authors[0] : 'Muallif aniqlanmagan!'}</p>
                <p class="card-year">${element.volumeInfo.publishedDate ? element.volumeInfo.publishedDate.substring(0, 4) : 'Nashr yili aniqlanmagan'}</p>
            </div>
            <div>
                <div class="buttons">
                    <button data-id="${element.id}" class="btn btn-Bookmark">Bookmark</button>
                    <button data-id="${element.id}" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight" class="btn btn-More">More Info</button>
                </div>                
                <a href="${element.volumeInfo.previewLink}"><button class="btn btn-Read">Read</button></a>
            </div>
        </div>
    </div>
        `


            if (num == 0) {
                num = num + 1;
                elCarousel.innerHTML += `
        <div data-bs-interval="3000" class="active carousel-item">
        <div class="d-flex justify-content-evenly align-items-center">
            <div class="d-flex">
                <img style="height: 195px; width:130px !importanr" src="${element.volumeInfo.imageLinks ? element.volumeInfo.imageLinks.smallThumbnail : '/images/Rectangle 356.png'}" class="d-block" alt="book-img">
                <img style="margin-left:-75px; margin-top:9px; height: 195px; width:130px !importanr" src="${element.volumeInfo.imageLinks ? element.volumeInfo.imageLinks.smallThumbnail : '/images/Rectangle 356.png'}" class="d-block" alt="book-img">
            </div>
            <div class="w-50">
                <h1>${element.volumeInfo.title}</h1>
                <h3>${typeof (element.volumeInfo.authors) == "object" ? element.volumeInfo.authors[0] : 'Muallif aniqlanmagan!'}</h3>
            </div>
            </div>
        </div>
        `}
            else if (num != 0) {
                num = num + 1;
                elCarousel.innerHTML += `
        <div data-bs-interval="3000" class=" carousel-item">
        <div class="d-flex justify-content-evenly align-items-center">
            <div class="d-flex">
                <img style="height: 195px; width:130px !importanr" src="${element.volumeInfo.imageLinks ? element.volumeInfo.imageLinks.smallThumbnail : '/images/Rectangle 356.png'}" class="d-block" alt="carusel-img">
                <img style="margin-left:-75px; margin-top:9px; height: 195px; width:130px !importanr" src="${element.volumeInfo.imageLinks ? element.volumeInfo.imageLinks.smallThumbnail : '/images/Rectangle 356.png'}" class="d-block" alt="carusel-img">
            </div>
            <div class="w-50">
                <h1>${element.volumeInfo.title}</h1>
                <h3>${typeof (element.volumeInfo.authors) == "object" ? element.volumeInfo.authors[0] : 'Muallif aniqlanmagan!'}</h3>
            </div>
            </div>
        </div>
        `
            }

        });

        elSum.innerHTML = `
    Showing <b>${(array.length) ? array.length : 0}</b> Result(s)`;
    }
}


function renderBookmark(books) {
    // console.log(books, Bookmarks)
    elBookList.innerHTML = '';

    books.forEach(book => {
        elBookList.innerHTML += `
                <li class="list-item">
                    <div class="item-text">
                        <h4>${book.volumeInfo.title}</h4>
                        <p>${typeof (book.volumeInfo.authors) == "object" ? book.volumeInfo.authors[0] : 'Muallif aniqlanmagan!'}</p>
                    </div>
                    <div class="btn-box">
                    <a href="${book.volumeInfo.previewLink}"><img data-id="${book.id}" class="btn-read" src="/images/book-open.svg"></a>
                    <img data-id="${book.id}" class="btn-delet" src="/images/delete.svg" alt="delet">
                    </div>
                </li>
                `
    });
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

var Bookmarks = [];

elCards.addEventListener('click', (evt) => {
    elmodal.innerHTML = `
    <div class="d-flex justify-content-center my-1">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
    </div>
    `;
    const target = evt.target;

    if (target.className.includes('btn-More')) {
        const id = target.dataset.id;

        BookArray.forEach(element => {
            if (id == element.id) {
                elmodalTitle.textContent = element.volumeInfo.title;
                elmodal.innerHTML = `
                        <img class="modal-img mx-auto d-block" src="${element.volumeInfo.imageLinks ? element.volumeInfo.imageLinks.smallThumbnail : '/images/Group193.svg'}" alt="book-img">
                        <p class="modal-description">${element.volumeInfo.description}</p>
                        <ul class="modal-list">
                            <li class="modal-item">Author : <span> ${typeof (element.volumeInfo.authors) == "object" ? element.volumeInfo.authors[0] : 'Muallif aniqlanmagan!'}</span></li>
                            <li class="modal-item">Published : <span> ${element.volumeInfo.publishedDate.substring(0, 4)}</span></li>
                            <li class="modal-item">Publishers: <span> ${element.volumeInfo.publisher}</span></li>
                            <li class="modal-item">Categories: <span> ${typeof (element.volumeInfo.categories) == "object" ? element.volumeInfo.categories[0] : 'kategoriya aniqlanmagan'}</span></li>
                            <li class="modal-item">Pages Count: <span> ${element.volumeInfo.pageCount}</span></li>
                        </ul>
                        `
                elmodalfooter.innerHTML = `
                        <a class="w-25 me-4" href="${element.volumeInfo.previewLink}">
                           <button class="btn m-2 btn-Read">Read</button>
                        </a>
                        `
            }
        })
    }

    if (target.className.includes('btn-Bookmark')) {
        const id = target.dataset.id;

        BookArray.forEach(element => {
            if (id == element.id) {
                Bookmarks.push(element);
            }

            // console.log(Bookmarks)
            // localStorage.setItem('bookMarks', JSON.stringify(Bookmarks))
            // Bookmarks = JSON.parse(localStorage.getItem('bookMarks'))
            console.log(Bookmarks)
            renderBookmark(Bookmarks);
        })

    }

})

elBookList.addEventListener('click', (evt) => {

    const target = evt.target;
    if (target.className.includes('btn-delet')) {
        const id = target.dataset.id;

        let deletArray = [];
        Bookmarks.forEach(element => {
            if (element.id !== id) {
                deletArray.push(element)
            }
        });
        Bookmarks = deletArray;
        renderBookmark(Bookmarks);

    }
})

elSearch.addEventListener('change', () => {

    let value = elSearch.value;
    console.log(elSearch.value);


    fetch(`https://www.googleapis.com/books/v1/volumes?q=search+terms=${value}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.items);
            renderData(data.items)
        })
    elSearch.value = '';
})

elBtnLogout.addEventListener('click', () => {
    window.location.href = 'login.html';
    localStorage.removeItem('token')
})

elBtnAdmin.addEventListener('click', () => {
    if (token && token != typeof undefined) {
        window.location.href = 'admin.html';
    }
})


elBtnOrder.addEventListener('click', () => {
    fetch("https://www.googleapis.com/books/v1/volumes?q=flowers&orderBy=newest")
        .then((res) => res.json())
        .then((data) => {
            console.log(data.items);
            renderData(data.items)
        })
    // .catch((err) => {
    //     console.log('error')
    //     alert('xato aniqlandi!')
    // })
})


























