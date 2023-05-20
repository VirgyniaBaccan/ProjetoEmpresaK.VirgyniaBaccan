import { getAllCategories, getAllCompanies, getEmployeesProfile, getDepartmentById, getAllDepartments,
createDepartments, getAllEmployees, updateDepartments, deleteDep, deleteEmployee, updateEmployee,
getEmployeesOutOfWork, hireEmployee, dismissEmployee } from "./requests.js";

import { toast } from "./toasts.js";

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


    viewButton.addEventListener('click', async () => {
        const buttonCloseView = document.querySelector("#button__close-view")
        buttonCloseView.addEventListener('click', () => {
            modalContainer.close()
        })

        const modalContainer = document.querySelector("#modal__view-dep")
        modalContainer.showModal()

        const title = document.querySelector(".dep__name")
        const description = document.querySelector(".dep__description")
        const company = document.querySelector(".company__name")

        company.innerText = companyName
        title.innerText = department.name
        description.innerText = department.description


        renderSelectUsers()
        const select = document.querySelector("#select__user-modal")
        select.addEventListener('change', (event) => {
            const selectValue = event.target.value
          
            const bodyHire =
            {
                department_id: department.id
            }

            const buttonHire = document.querySelector(".button__modal-hire")
            buttonHire.addEventListener('click', async () => {
                await hireEmployee(selectValue, bodyHire)
                toast('Usuário contratado com sucesso', green)
                setTimeout(() => {
                    location.reload()
                }, 900);
                
            })
        })
        
        const departments = await getDepartmentById(viewButton.id)
        const employees = departments.employees
    
        if (employees.length !== 0) {
            
   
            const list = document.querySelector(".list__modalView")
            list.innerHTML = ""
            const filterCompany = companies.filter(company => company.id == department.company_id)
            const companyName = filterCompany[0].name
            
            employees.forEach( element => {
                
                const card = document.createElement("li")
                const username = document.createElement("h2")
                const nameCompany = document.createElement("p")
                const buttonOff = document.createElement("button")
                
                nameCompany.classList.add("card__companyName")

                card.classList.add("modal__view-card")
                username.classList.add("card__username")
                buttonOff.classList.add("card__button")

                buttonOff.innerText = "Desligar"
                username.innerText = element.name
                nameCompany.innerText = companyName
            
                card.append(username, nameCompany, buttonOff)
                list.appendChild(card)
                
                buttonOff.addEventListener('click', async () => {
                    modalContainer.close()
                    await dismissEmployee(element.id)
                    toast("Usuário desligado com sucesso", green)
                    setTimeout(() => {
                        location.reload()
                    }, 900);
                })
            })
        }
        

    })

    editButtonDep.addEventListener('click', () => {

        const buttonCloseEdit = document.querySelector("#button__close-edit")
        buttonCloseEdit.addEventListener('click', () => {
            modalContainer.close()
        })

        const modalContainer = document.querySelector("#modal__edit-dep")
        modalContainer.showModal()
   
        const editInput = document.querySelector("#input__newDescription")
        const buttonSaveEdit = document.querySelector(".button__modal-update")
        editInput.placeholder = department.description

        buttonSaveEdit.addEventListener('click', async () => {
            const bodyInput = {
                description: editInput.value,
                name: department.name
            }
            modalContainer.close()
            await updateDepartments(department.id, bodyInput)
            toast("Departamento editado com sucesso", green)
            setTimeout(() => {
                location.reload()
            }, 900);
        })

    })

    deleteButtonDep.addEventListener('click', () => {

        const buttonCloseDelete = document.querySelector("#button__close-delete")
        buttonCloseDelete.addEventListener('click', () => {
            modalContainer.close()
        })


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
                location.reload()
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

        const buttonCloseCreate = document.querySelector("#button__close-create")
        buttonCloseCreate.addEventListener('click', () => {
            modalCreate.close()
        })

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
            const removeButtonEmp = document.createElement("img")


            cardNameCia.innerText = "Usuário não contratado"

            cardEmployeeName.innerText = element.name
            editButtonEmp.src = "../assets/pencil.vector.svg"
            removeButtonEmp.src = "../assets/trash.vector.svg"

            card.classList.add("card__container")
            cardEmployeeName.classList.add("card__dep-name")
            cardNameCia.classList.add("card__dep-text")
            divText.classList.add("div__text")
            divButtons.classList.add("div__buttons")
            editButtonEmp.classList.add("edit__buttonEmp")
            removeButtonEmp.classList.add("modal__remove-buttonEmp")
            editButtonEmp.id = element.id
            removeButtonEmp.id = element.id

            card.append(divText, divButtons)
            divText.append(cardEmployeeName, cardNameCia)
            divButtons.append(editButtonEmp, removeButtonEmp)
            list.appendChild(card)


            removeButtonEmp.addEventListener('click', () => {
                
                const modalContainer = document.querySelector("#modal__delete-user")
                modalContainer.showModal()
                
                const buttonCloseDeleteUser = document.querySelector("#button__close-delete-user")
                buttonCloseDeleteUser.addEventListener('click', () => {
                    modalContainer.close()
                })

                const UserName = document.querySelector(".span__user-name")
                UserName.innerText = element.name
                
                const removeButton = document.querySelector(".modal__remove-button")
                removeButton.addEventListener('click', async () => {
                    modalContainer.close()
                    await deleteEmployee(removeButtonEmp.id)
                    toast("Usuário deletado com sucesso", green)
                    setTimeout(() => {
                        location.reload()
                    }, 900);
                })
            })
            

            editButtonEmp.addEventListener('click', () => {
                const modalContainer = document.querySelector("#modal__edit-user")
                modalContainer.showModal()
                
                const buttonCloseEditUser = document.querySelector("#button__close-edit-user")
                buttonCloseEditUser.addEventListener('click', () => {
                    modalContainer.close()
                })

                const editInputUserName = document.querySelector("#input__newNameUser")
                const editInputUserMail = document.querySelector("#input__newMailUser")
                const buttonSaveEditUser = document.querySelector(".button__modal-updateUser")


                buttonSaveEditUser.addEventListener('click', async () => {
                    modalContainer.close()
                    const bodyInputUser = {
                        name: editInputUserName.value,
                        email: editInputUserMail.value
                    }
                    await updateEmployee(editButtonEmp.id, bodyInputUser)
                    toast('Usuário editado com sucesso', green)
                    setTimeout(() => {
                        location.reload()
                    }, 900);
                })

            })

        } else {
            const card = document.createElement("li")
            const divText = document.createElement("div")
            const cardEmployeeName = document.createElement("h1")
            const cardNameCia = document.createElement("p")
            const divButtons = document.createElement("div")
            const editButtonEmp = document.createElement("img")
            const removeButtonEmp = document.createElement("img")


            const getCompanyName = companies.filter(company => company.id == element.company_id)
            const companyName = getCompanyName[0].name

            cardEmployeeName.innerText = element.name
            cardNameCia.innerText = companyName
            editButtonEmp.src = "../assets/pencil.vector.svg"
            removeButtonEmp.src = "../assets/trash.vector.svg"

            card.classList.add("card__container")
            cardEmployeeName.classList.add("card__dep-name")
            cardNameCia.classList.add("card__dep-text")
            divText.classList.add("div__text")
            divButtons.classList.add("div__buttons")
            editButtonEmp.classList.add("edit__buttonEmp")
            removeButtonEmp.classList.add("modal__remove-buttonEmp")
            removeButtonEmp.id = element.id
            editButtonEmp.id = element.id
            
            card.append(divText, divButtons)
            divText.append(cardEmployeeName, cardNameCia)
            divButtons.append(editButtonEmp, removeButtonEmp)
            list.appendChild(card)

            removeButtonEmp.addEventListener('click', () => {
                const modalContainer = document.querySelector("#modal__delete-user")
                modalContainer.showModal()

                const UserName = document.querySelector(".span__user-name")
                UserName.innerText = element.name

                const removeButton = document.querySelector(".modal__remove-button")
                removeButton.addEventListener('click', async () => {
                    modalContainer.close()
                    await deleteEmployee(removeButtonEmp.id)
                    toast('Usuário deletado com sucesso', green)
                    setTimeout(() => {
                        location.reload()
                    }, 900);
                })
            })

            editButtonEmp.addEventListener('click', () => {
                const modalContainer = document.querySelector("#modal__edit-user")
                modalContainer.showModal()
                
                const buttonCloseEditUser = document.querySelector("#button__close-edit-user")
                buttonCloseEditUser.addEventListener('click', () => {
                    modalContainer.close()
                })

                const editInputUserName = document.querySelector("#input__newNameUser")
                const editInputUserMail = document.querySelector("#input__newMailUser")
                const buttonSaveEditUser = document.querySelector(".button__modal-updateUser")


                buttonSaveEditUser.addEventListener('click', async () => {
                    modalContainer.close()
                    const bodyInputUser = {
                        name: editInputUserName.value,
                        email: editInputUserMail.value
                    }
                    await updateEmployee(editButtonEmp.id, bodyInputUser)
                    toast('Usuário editado com sucesso', green)

                    setTimeout(() => {
                        window.location.replace("./adminPage.html")
                    }, 900);
                })

            })
        }

    })
}

export async function renderSelectUsers() {
    const employeesOf = await getEmployeesOutOfWork()
    const select = document.querySelector("#select__user-modal")
    select.innerHTML =  `<select name="category" id="select__user-modal">
    <option value="">Selecionar Usuário</option>
</select>`

    employeesOf.forEach(element => {

        const option = document.createElement('option')

        option.innerText = element.name
        option.value = element.id

        select.appendChild(option)
    });
}