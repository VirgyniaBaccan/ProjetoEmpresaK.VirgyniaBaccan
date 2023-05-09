import { renderCards } from "./render.js"


const baseUrl = `http://localhost:3333/`

export async function getAllCategories() {
        const categories = await fetch(`${baseUrl}categories/readAll`, {
                method: 'GET'
        })
                .then(response => response.json()) //quando promise se transforma em respose, passa para json
        return categories
}

export async function getAllCompanies() {
        const companies = await fetch(`${baseUrl}companies/readAll`, {
                method: 'GET'
        })
                .then(response => response.json())
        return companies
}

export async function getCompanyByCategory(value) {
        const companiesFiltered = await fetch(`${baseUrl}companies/readByCategory/${value}`, {
                method: 'GET'
        })
                .then(async (response) => { 
                const responseJson = await response.json()
                return responseJson
        })
       return companiesFiltered
}
getCompanyByCategory()


function changeSelect() {
        const select = document.querySelector("#select")

        select.addEventListener('change', async (event) => {
                const selectValue = event.target.value

                if (selectValue == "") {
                        renderCards(true)
                } else {
                        const filterCompanies = await getCompanyByCategory(selectValue)
                   
                        renderCards(false, filterCompanies)
                }
        })


}
changeSelect()




// export function getCompanyByCategory() {
//         const select = document.querySelector("#select")

//         select.addEventListener('change', async (e) => {
//                 const selectValue = e.target.value
//                 const companiesFiltered = await fetch(`${baseUrl}companies/readByCategory/${selectValue}`, {
//                         method: 'GET'
//         })
//         .then(response => response.json())
//         return companiesFiltered
// })

// }
// getCompanyByCategory()