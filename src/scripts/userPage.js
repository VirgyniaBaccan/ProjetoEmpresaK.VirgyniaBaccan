import { renderUser, renderDepartment } from "./render.js"
// import { getEmployeesProfile, getDepartmentById } from "./requests.js"

function authenticationToken() {
    const token = localStorage.getItem("@kenz.emp:token")

    if (!token) {
        window.location.replace("/homePage.html");
    }
}
authenticationToken()



function homeReturn() {
    const buttonLogout = document.querySelector(".button__logout")
    buttonLogout.addEventListener('click', () => {
        localStorage.removeItem("@kenz.emp:token")
        localStorage.removeItem("isAdm")
        window.location.replace("/homePage.html")
    })
}

homeReturn()

renderUser()

await renderDepartment()