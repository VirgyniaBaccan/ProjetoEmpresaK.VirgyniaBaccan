import { renderCards, renderSelect } from "./render.js"

renderSelect()

renderCards(true)

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

homeChangePages()




