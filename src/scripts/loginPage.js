import { bodyLogin } from "./requests.js"


authenticationUser()

loginChangePages()

bodyLogin()

function authenticationUser() {
    const token = localStorage.getItem("@kenz.emp:token")
    const adm = JSON.parse(localStorage.getItem("isAdm"))

    if (token) {
        window.location.replace("./userPage.html");
        if (adm) {
            location.replace("./adminPage.html")
        }
    }
}

function loginChangePages() {
    const buttonHome = document.querySelector(".button__home")
    buttonHome.addEventListener('click', () => {
        window.location.replace("index.html")
    })

    
    const buttonRegister = document.querySelectorAll("#button__register")
    buttonRegister.forEach((button) => {
    button.addEventListener('click', () => {
        window.location.replace("./registerPage.html")
    })
})
}