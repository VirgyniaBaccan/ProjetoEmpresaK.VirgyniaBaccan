
//baseado na Demo, com permissão do Rafa
export function toast(message, color) {
    const body = document.querySelector("body")
    const toast = document.createElement("div")
    const text = document.createElement('p')

    toast.classList.add("toast__container", "toast__add")
    toast.style.backgroundColor = color

    text.innerText = message

    toast.appendChild(text)
    body.appendChild(toast)

    setTimeout(() => {
        toast.classList.add('toast__remove')
    }, 3000)

    setTimeout(() => {
        body.removeChild(toast)
    }, 4900);
}