import { getEmployeesProfile, getDepartmentById } from "./requests.js"

function homeReturn() {
    const buttonLogout = document.querySelector(".button__logout")
    buttonLogout.addEventListener('click', () => {
        localStorage.removeItem("@kenz.emp:token")
        window.location.replace("/homePage.html")
    })
}
homeReturn()

async function renderUser() {
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
renderUser()


async function renderDepartment() {
    const userInfos = await getEmployeesProfile()
    const sectionCompany = document.querySelector(".section__company")

    if (!userInfos.company_id) { // ! substitui o == null ou o 0 - falsy
        const message = document.createElement("h1")
        // console.log(message)
        message.innerText = "Você ainda não foi contratado"

        sectionCompany.appendChild(message)

    } else {
        const depId = userInfos.department_id
        // console.log(depId)
        const department = await getDepartmentById(depId)
        console.log(department)
        // console.log(userInfos)
        const employeesList = department.employees
        console.log(employeesList)
       
        const divUserCompany = document.createElement("div")
        const companyDepName = document.createElement("h1")

        companyDepName.innerText = `${department.company.name}-${department.name}`

        divUserCompany.appendChild(companyDepName)
        sectionCompany.appendChild(divUserCompany)

        const list = document.createElement("ul")
        employeesList.forEach(employee => {
            const card = document.createElement("li")
            const name = document.createElement("h1")

            name.innerText = employee.name

            card.appendChild(name)
            list.appendChild(card)
            sectionCompany.appendChild(list)

        })
    }

}
await renderDepartment()