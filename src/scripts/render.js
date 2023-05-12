import { getAllCategories,  getAllCompanies, getEmployeesProfile, getDepartmentById} from "./requests.js";

const baseUrl = `http://localhost:3333/`

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