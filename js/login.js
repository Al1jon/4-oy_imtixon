const elForm = document.querySelector('.form');
const inputEmail = document.querySelector('#user');
const inputPassword = document.querySelector('#password');
const errorEmail = document.querySelector('.error-user');
const errorPassword = document.querySelector('.error-password');


elForm.addEventListener(('submit'), (evt) => {

    evt.preventDefault();

    if (inputEmail.value.length == 0) {
        errorEmail.textContent = 'Emailni kiriting !';
        const timer = setTimeout(() => {
            errorEmail.textContent = '';
            clearTimeout(timer);
        }, 3000);
    }
    else if (inputPassword.value.length < 6) {
        errorPassword.textContent = `6 ta dan ko'proq simvol kiriting !`;
        const timer = setTimeout(() => {
            errorPassword.textContent = '';
            clearTimeout(timer);
        }, 3000);
    }
    let user = {
        email: inputEmail.value,
        password: inputPassword.value
    }
    fetch("https://reqres.in/api/login", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            localStorage.setItem('token', data.token)
            if (data.token && data.token != typeof undefined) {
                window.location.href = 'home.html';
            }
        })
        .catch(data => alert('xato bor'))

});
























