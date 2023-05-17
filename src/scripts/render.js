import { getAllCategories, getAllCompanies, getEmployeesProfile, getDepartmentById, getAllDepartments, createDepartments, getAllEmployees, updateDepartments, deleteDep } from "./requests.js";
import { toast } from "./toasts.js";

const baseUrl = `http://localhost:3333/`


const green = '#36B37E';
const red = '#FF5630';

export async function renderSelect() {
    const categories = await getAllCategories()
    const select = document.querySelector("#select")

    categories.forEach(element => {
        const option = document.createElement('option')

        option.value = element.name
        option.innerText = element.name

        select.appendChild(option)
    });
}

export async function renderCards(firstTime, array) {
    const list = document.querySelector(".list__home")

    list.innerHTML = ''

    if (firstTime) {
        const companies = await getAllCompanies()

        companies.forEach(async (company) => {
            const card = await createCard(company)
            list.appendChild(card)
        })

    } else {

        array.forEach(async (element) => {
            const card = await createCard(element)

            list.appendChild(card)
        })
    }
}

async function createCard(company) {
    const categories = await getAllCategories()
    const card = document.createElement("li")
    const cardName = document.createElement("h1")
    const cardSector = document.createElement("p")

    const sector = categories.filter(category => category.id == company.category_id)

    cardSector.innerText = sector[0].name
    cardName.innerText = company.name

    cardName.classList.add("businessName")
    cardSector.classList.add("businessSector")
    card.classList.add("card")

    card.append(cardName, cardSector)
    return card
}

export async function renderUser() {
    const userInfos = await getEmployeesProfile()

    const userSection = document.querySelector(".section__user")
    const username = document.createElement("h1")
    const userMail = document.createElement("p")

    username.innerText = userInfos.name
    userMail.innerText = userInfos.email

    username.classList.add("user__name")
    userMail.classList.add("user__mail")

    userSection.append(username, userMail)

}

export async function renderDepartment() {
    const userInfos = await getEmployeesProfile()
    const sectionCompany = document.querySelector(".section__company")

    if (!userInfos.company_id) {
        const message = document.createElement("h1")
        const divMessage = document.createElement("div")

        message.innerText = "Você ainda não foi contratado"

        message.classList.add("message__notHired")
        divMessage.classList.add("div__message")

        divMessage.appendChild(message)
        sectionCompany.appendChild(divMessage)

    } else {

        const depId = userInfos.department_id
        const department = await getDepartmentById(depId)
        const employeesList = department.employees

        const divUserCompany = document.createElement("div")
        const companyDepName = document.createElement("h1")

        companyDepName.innerText = `${department.company.name} - ${department.name}`

        divUserCompany.classList.add("header__company")
        companyDepName.classList.add("title__company")

        divUserCompany.appendChild(companyDepName)
        sectionCompany.appendChild(divUserCompany)

        const list = document.createElement("ul")
        list.classList.add("list__employees")
        employeesList.forEach(employee => {
            const card = document.createElement("li")
            const name = document.createElement("h1")

            name.innerText = employee.name

            card.classList.add("card__employee")
            name.classList.add("name__employee")

            card.appendChild(name)
            list.appendChild(card)
            sectionCompany.appendChild(list)

        })
    }

}

export async function renderSelectAdmin() {
    const companies = await getAllCompanies()
    const select = document.querySelector("#select__company")

    companies.forEach(element => {
        const option = document.createElement('option')

        option.value = element.name
        option.innerText = element.name

        select.appendChild(option)
    });
}

export async function createDepCard(department) {
    const companies = await getAllCompanies()
    // console.log(companies)

    const card = document.createElement("li")
    const divText = document.createElement("div")
    const cardDepName = document.createElement("h1")
    const cardDepDescription = document.createElement("p")
    const cardNameCia = document.createElement("p")
    const divButtons = document.createElement("div")
    const viewButton = document.createElement("img")
    const editButtonDep = document.createElement("img")
    const deleteButtonDep = document.createElement("img")

    const filterCompany = companies.filter(company => company.id == department.company_id)
    const companyName = filterCompany[0].name
    // console.log(companyName)

    cardDepName.innerText = department.name
    cardDepDescription.innerText = department.description
    cardNameCia.innerText = companyName
    viewButton.src = "../assets/eye.vector.svg"
    editButtonDep.src = "../assets/pencil.vector.svg"
    deleteButtonDep.src = "../assets/trash.vector.svg"

    card.classList.add("card__container")
    cardDepName.classList.add("card__dep-name")
    cardDepDescription.classList.add("card__dep-text")
    cardNameCia.classList.add("card__dep-text")
    divText.classList.add("div__text")
    divButtons.classList.add("div__buttons")
    viewButton.classList.add("view__button")
    editButtonDep.classList.add("edit__button-dep")
    deleteButtonDep.classList.add("delete__button-dep")
    editButtonDep.id = department.id
    viewButton.id = department.id
    deleteButtonDep.id = department.id


    card.append(divText, divButtons)
    divText.append(cardDepName, cardDepDescription, cardNameCia)
    divButtons.append(viewButton, editButtonDep, deleteButtonDep)
    viewButton.addEventListener('click', () => {
        const modalContainer = document.querySelector("#modal__view-dep")
        modalContainer.showModal()
        // modalView(department)
    })

    editButtonDep.addEventListener('click', () => {
        const modalContainer = document.querySelector("#modal__edit-dep")
        modalContainer.showModal()
        // modalView(department)
    })

    deleteButtonDep.addEventListener('click', () => {
        const modalContainer = document.querySelector("#modal__delete-dep")
        modalContainer.showModal()

        const depName = document.querySelector(".span__dep-name")
        depName.innerText = department.name

        const removeButton = document.querySelector(".modal__delete-button")
        removeButton.addEventListener('click', async () => {
            modalContainer.close()
            await deleteDep(deleteButtonDep.id)
          toast("Departamento deletado com sucesso", green)
            setTimeout(() => {
                window.location.replace("./adminPage.html")
            }, 900);
        })
    })

    return card
}

export async function renderDepCards(firstTime, array) {
    const list = document.querySelector(".list__departments")

    list.innerHTML = ''

    if (firstTime) {
        const departments = await getAllDepartments()

        departments.forEach(async (dep) => {
            const card = await createDepCard(dep)
            list.appendChild(card)
        })

    } else {

        array.forEach(async (element) => {
            // console.log(element)
            const card = await createDepCard(element)
            list.appendChild(card)
        })
    }

}

async function renderModalCreateSelect() {

    const companies = await getAllCompanies()
    const select = document.querySelector("#select__company-modal")

    companies.forEach(element => {
        const option = document.createElement('option')

        option.value = element.name
        option.innerText = element.name

        select.appendChild(option)
    });
}

export function handleCreateDepModal() {

    const buttonCreate = document.querySelector(".button__openCreateModal")
    const modalCreate = document.querySelector("#modal__create-dep")
    renderModalCreateSelect()

    buttonCreate.addEventListener("click", async () => {
        modalCreate.showModal()

        const inputDepName = document.querySelector("#input__dep-name")
        const inputDepDescription = document.querySelector("#input__dep-description")
        const buttonCreate = document.querySelector(".button__modal-create")
        const select = document.querySelector("#select__company-modal")
        let bodyNewDep = {}

        buttonCreate.addEventListener("click", async () => {

            const companies = await getAllCompanies()
            const filterCompany = companies.filter(element => element.name == select.value)
            const idCompany = filterCompany[0].id


            bodyNewDep = {
                name: inputDepName.value,
                description: inputDepDescription.value,
                company_id: idCompany
            }
            await createDepartments(bodyNewDep)
            modalCreate.close()
            location.replace("../htmlPages/adminPage.html")
        })

    })
}


export async function createEmployeeCard() {
    const companies = await getAllCompanies()
    const employees = await getAllEmployees()
    const list = document.querySelector(".list__employees")

    employees.forEach(element => {
        if (element.company_id == null) {
            const card = document.createElement("li")
            const divText = document.createElement("div")
            const cardEmployeeName = document.createElement("h1")
            const cardNameCia = document.createElement("p")
            const divButtons = document.createElement("div")
            const editButtonEmp = document.createElement("img")
            const deleteButton = document.createElement("img")


            cardNameCia.innerText = "Usuário não contratado"

            cardEmployeeName.innerText = element.name
            editButtonEmp.src = "../assets/pencil.vector.svg"
            deleteButton.src = "../assets/trash.vector.svg"

            card.classList.add("card__container")
            cardEmployeeName.classList.add("card__dep-name")
            cardNameCia.classList.add("card__dep-text")
            divText.classList.add("div__text")
            divButtons.classList.add("div__buttons")
            editButtonEmp.classList.add("edit__buttonEmp")
            deleteButton.classList.add("delete__button")
            editButtonEmp.id = element.id
            deleteButton.id = element.id

            card.append(divText, divButtons)
            divText.append(cardEmployeeName, cardNameCia)
            divButtons.append(editButtonEmp, deleteButton)
            list.appendChild(card)
            return card
        } else {
            const card = document.createElement("li")
            const divText = document.createElement("div")
            const cardEmployeeName = document.createElement("h1")
            const cardNameCia = document.createElement("p")
            const divButtons = document.createElement("div")
            const editButton = document.createElement("img")
            const deleteButton = document.createElement("img")


            const getCompanyName = companies.filter(company => company.id == element.company_id)
            const companyName = getCompanyName[0].name

            cardEmployeeName.innerText = element.name
            cardNameCia.innerText = companyName
            editButton.src = "../assets/pencil.vector.svg"
            deleteButton.src = "../assets/trash.vector.svg"

            card.classList.add("card__container")
            cardEmployeeName.classList.add("card__dep-name")
            cardNameCia.classList.add("card__dep-text")
            divText.classList.add("div__text")
            divButtons.classList.add("div__buttons")
            editButton.classList.add("edit__button")
            deleteButton.classList.add("delete__button")

            card.append(divText, divButtons)
            divText.append(cardEmployeeName, cardNameCia)
            divButtons.append(editButton, deleteButton)
            list.appendChild(card)
            return card
        }
    })
}


// export async function modalView(department, company) {
//     const modal = document.querySelector("#modal__view-dep")
//     const depName = document.querySelector(".dep__name")
//     const depDescription = document.querySelector(".dep__description")
//     const companyName = document.querySelector("company__name")
//     const selectUserOf = document.querySelector(".select__user-modal")
//     const option = document.createElement(option)

//     depName = department.name
//     depDescription = department.description
//     companyName = company.name
//     selectUserOf.innerHTML = ""
//     option.innerHTML = option.value
//     option.value = ""

// }