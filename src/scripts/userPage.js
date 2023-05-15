import { renderUser, renderDepartment } from "./render.js"
// import { getEmployeesProfile, getDepartmentById } from "./requests.js"

authenticationUser()

homeReturn()

renderUser()

await renderDepartment()

function authenticationUser() {
    const token = localStorage.getItem("@kenz.emp:token")
    const adm = JSON.parse(localStorage.getItem("isAdm"))

    if (!token) {
        window.location.replace("/index.html");
        if (adm) {
            location.replace("./adminPage.html")
        }
    }
}

function homeReturn() {
    const buttonLogout = document.querySelector(".button__logout")
    buttonLogout.addEventListener('click', () => {
        localStorage.removeItem("@kenz.emp:token")
        localStorage.removeItem("isAdm")
        window.location.replace("/index.html")
    })
}