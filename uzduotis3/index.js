const taskForm = document.querySelector("form")
const createTaskButton = document.querySelector("form button")
let taskStorage = JSON.parse(localStorage.getItem("tasks")) || []

const toggleListVisibility = (listElement) => {
    const taskCount = listElement.querySelectorAll(".task-main").length

    if (taskCount == 0) {
        listElement.classList.add("hidden")
        return
    } 
    
    listElement.classList.remove("hidden")
}

const createTaskElement = (name, priority, completed) => {
    const priorityElement = document.querySelector(`.todo-list.${priority}`)
    const parent = priorityElement.querySelector(".list")
    const task = document.createElement("div")
    const p = document.createElement("p")
    const remove = document.createElement("button")
    const checkbox = document.createElement("button")

    remove.innerHTML = "❌"
    p.innerHTML = name

    checkbox.classList.add("check")
    remove.classList.add("remove")
    task.classList.add("task-main")

    if (completed) {
        checkbox.classList.add("checked")
        task.classList.add("completed")
    }

    task.appendChild(checkbox)
    task.appendChild(p)
    task.appendChild(remove)
    parent.appendChild(task)

    toggleListVisibility(priorityElement)

    checkbox.addEventListener("click", () => {
        checkbox.classList.toggle("checked")
        task.classList.toggle("completed")
        updateTaskInStorage(name, task.classList.contains("completed"))
    })

    remove.addEventListener("click", () => {
        parent.removeChild(task)
        removeTaskFromStorage(name)
        toggleListVisibility(priorityElement)
    })

    return task
}

const createTask = (e) => {
    e.preventDefault()

    const formData = new FormData(taskForm)
    const taskName = formData.get("task-name")
    const priority = formData.get("priority")

    if (taskName && priority) {
        createTaskElement(taskName, priority, false)
        taskStorage.push({ 
            name: taskName, 
            priority, 
            completed: false
        })
        
        localStorage.setItem("tasks", JSON.stringify(taskStorage))
    }
}

const loadTasks = () => {
    taskStorage.forEach(task => createTaskElement(task.name, task.priority, task.completed))
}

const updateTaskInStorage = (name, completed) => {
    const taskIndex = taskStorage.findIndex(task => task.name === name)
    if (taskIndex !== -1) {
        taskStorage[taskIndex].completed = completed
        localStorage.setItem("tasks", JSON.stringify(taskStorage))
    }
}

const removeTaskFromStorage = (name) => {
    taskStorage = taskStorage.filter(task => task.name !== name)
    localStorage.setItem("tasks", JSON.stringify(taskStorage))
}

loadTasks()

createTaskButton.addEventListener("click", createTask)
