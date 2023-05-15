import { bodyRegister } from "./requests.js"

authenticationUser()

registerChangePages()

bodyRegister()

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

function registerChangePages() {
    const buttonHome = document.querySelectorAll(".button__home")
    buttonHome.forEach((button) => {
        button.addEventListener('click', () => {
            window.location.replace("/index.html")
        })
    })

    const buttonLogin = document.querySelector(".button__login")
    buttonLogin.addEventListener('click', () => {
        window.location.replace("./loginPage.html")
    })
}

