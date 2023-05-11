import { getAllCategories,  getAllCompanies} from "./requests.js";

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
    const list = document.querySelector(".list")

    list.innerHTML = ''

    if (firstTime) {
        const companies = await getAllCompanies()

        companies.forEach(async (company) => {
            const card = await createCard(company)
            list.appendChild(card)
        })

    } else {
   
    // const companies = await getCompanyByCategory()
        console.log(array)
    array.forEach(async (element) => {
        const card = await createCard(element)
        console.log(card)
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
