import { renderSelectAdmin, renderDepCards, createEmployeeCard, handleCreateDepModal, renderUpdateModal } from "./render.js";
import { changeDepSelect, getAllEmployees } from "./requests.js";

homeReturn()

authentication()

await renderSelectAdmin()

renderDepCards(true)

await createEmployeeCard()

changeDepSelect()

function authentication() {
    const token = localStorage.getItem("@kenz.emp:token");
    const adm = JSON.parse(localStorage.getItem("isAdm"))


    if (!token) {
        location.replace("/index.html");
        if (adm !== true) {
            location.replace("./userPage.html")
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

    handleCreateDepModal()

    getAllEmployees()

    renderUpdateModal()