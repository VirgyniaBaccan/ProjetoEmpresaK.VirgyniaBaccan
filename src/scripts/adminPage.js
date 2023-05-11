

// function authentication() {
//     const token = localStorage.getItem('@kenz.emp:token')

//     if(!token) {
//         location.replace('./loginPage.html')
//     }
// }

// authentication()

function homeReturn() {
    const buttonLogout = document.querySelector(".button__logout")
    buttonLogout.addEventListener('click', () => {
        localStorage.removeItem("@kenz.emp:token")
        window.location.replace("/homePage.html")
    })
}
homeReturn()