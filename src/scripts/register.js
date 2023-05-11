import { registerRequest } from "./requests.js"

function registerChangePages() {
    const buttonHome = document.querySelectorAll(".button__home")
    buttonHome.forEach((button) => {
        button.addEventListener('click', () => {
            window.location.replace("/homePage.html")
        })
    })

    const buttonLogin = document.querySelector(".button__login")
    buttonLogin.addEventListener('click', () => {
        window.location.replace("./loginPage.html")
    })
}
registerChangePages()

registerRequest()
