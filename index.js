let number = 0

const container = document.createElement("div")
container.classList.add("container")
document.body.appendChild(container)

let p

const wrapper = (num) => {
    return () => {
        number += num
        p.innerHTML = number

        const isOdd = number % 2 !== 0

        if (isOdd) {
            p.classList.add("odd")
        } else {
            p.classList.remove("odd")
        }
    }
}

const createButton = (txt) => {
    const button = document.createElement("button")
    button.innerHTML = txt
    button.classList.add("btn")
    container.appendChild(button)

    return button
}

const increment = createButton("+")
increment.addEventListener("click", wrapper(1))

p = document.createElement("p")
p.classList.add("counter")
p.innerHTML = number
container.appendChild(p)

const decrement = createButton("-")
decrement.addEventListener("click", wrapper(-1))