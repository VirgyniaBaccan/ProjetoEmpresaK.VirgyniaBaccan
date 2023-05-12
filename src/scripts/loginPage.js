import { bodyLogin } from "./requests.js"

function loginChangePages() {
    const buttonHome = document.querySelector(".button__home")
    buttonHome.addEventListener('click', () => {
        window.location.replace("/index.html")
    })

    
    const buttonRegister = document.querySelectorAll("#button__register")
    buttonRegister.forEach((button) => {
    button.addEventListener('click', () => {
        window.location.replace("./registerPage.html")
    })
})
}

loginChangePages()

bodyLogin()