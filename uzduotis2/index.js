const container = document.createElement("div")
container.classList.add("container")
document.body.appendChild(container)

const ulInput = document.createElement("input")
ulInput.type = "number"
ulInput.placeholder = "ul amount"
container.appendChild(ulInput)

const olInput = document.createElement("input")
olInput.type = "number"
olInput.placeholder = "ol amount"
container.appendChild(olInput)

const displayButton = document.createElement("button")
displayButton.innerHTML = "Create LIST"
container.appendChild(displayButton)

const ulElement = document.createElement("ul")
container.appendChild(ulElement)

displayButton.addEventListener("click", () => {
    const ulAmount = parseInt(ulInput.value, 10)
    const olAmount = parseInt(olInput.value, 10)

    olInput.value = undefined 
    ulInput.value = undefined

    ulElement.innerHTML = ""

    for (let ulCount = 0; ulCount < ulAmount; ulCount++) {
        const ulListItem = document.createElement("li")
        ulListItem.textContent = `unordered`

        const olElement = document.createElement("ol")

        for (let olCount = 0; olCount < olAmount; olCount++) {
            const olListItem = document.createElement("li")
            olListItem.textContent = "ordered"

            olElement.appendChild(olListItem)
        }

        ulListItem.appendChild(olElement)
        ulElement.appendChild(ulListItem)
    }
})
