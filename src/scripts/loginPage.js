
function loginChangePages() {
    const buttonHome = document.querySelector(".button__home")
    buttonHome.addEventListener('click', () => {
        window.location.replace("/homePage.html")
    })

    
    const buttonRegister = document.querySelectorAll(".button__register")
    buttonRegister.forEach((button) => {
    button.addEventListener('click', () => {
        window.location.replace("./registerPage.html")
    })
})
}
loginChangePages()