
function authentication() {
    const token = localStorage.getItem("@kenz.emp:token");

    if (!token) {
        location.replace("/homePage.html");
    }
}
authentication()

function authenticationAdm() {
    const adm = JSON.parse(localStorage.getItem("isAdm"))

    if(adm !== true) {
        location.replace("./userPage.html")
    }
}
authenticationAdm()

function homeReturn() {
    const buttonLogout = document.querySelector(".button__logout")
    buttonLogout.addEventListener('click', () => {
        localStorage.removeItem("@kenz.emp:token")
        localStorage.removeItem("isAdm")
        window.location.replace("/homePage.html")
    })
}
homeReturn()