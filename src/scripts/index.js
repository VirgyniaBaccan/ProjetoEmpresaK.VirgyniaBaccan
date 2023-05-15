import { renderCards, renderSelect } from "./render.js"
import { changeSelect } from "./requests.js"

authenticationUser()

renderSelect()

renderCards(true)


homeChangePages()

changeSelect()


function authenticationUser() {
    const token = localStorage.getItem("@kenz.emp:token")
    const adm = JSON.parse(localStorage.getItem("isAdm"))

    if (token) {
        window.location.replace("./src/htmlPages/userPage.html");
        if (adm) {
            location.replace("./src/htmlPages/adminPage.html")
        }
    }
}

function homeChangePages() {
    const buttonLogin = document.querySelector(".button__login")
    buttonLogin.addEventListener('click', () => {
        window.location.replace("./src/htmlPages/loginPage.html")
    })

    const buttonRegister = document.querySelector(".button__register")
    buttonRegister.addEventListener('click', () => {
        window.location.replace("./src/htmlPages/registerPage.html")
    })
}
