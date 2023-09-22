import { renderSelectAdmin, renderDepCards, createEmployeeCard, handleCreateDepModal} from "./render.js";
import { changeDepSelect, getAllEmployees } from "./requests.js";

homeReturn()

authentication()

await renderSelectAdmin()

await renderDepCards(true)

await createEmployeeCard()


function authentication() {
    const token = localStorage.getItem("@kenz.emp:token");
    const adm = JSON.parse(localStorage.getItem("isAdm"))
    
    
    if (!token) {
        location.replace("/");
    } else if (adm !== true) {
        location.replace("./userPage.html")
    }
}

function homeReturn() {
    const buttonLogout = document.querySelector(".button__logout")
    buttonLogout.addEventListener('click', () => {
        localStorage.removeItem("@kenz.emp:token")
        localStorage.removeItem("isAdm")
        window.location.replace("/")
    })
}

handleCreateDepModal()

getAllEmployees()


changeDepSelect()
