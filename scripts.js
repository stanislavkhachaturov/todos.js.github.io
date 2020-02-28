const formAddTodo = document.querySelector("#add");
const formSearch = document.querySelector("#search");
const todoListContainer = document.querySelector(".todo-list");

const generateTemplate = (value) => {
    const pattern = `
        <li class="todo-list-item">
            <span data-action="mark" class="icon-check"></span>
            <p class="todo-item-text">${value}</p>
            <button data-action="delete" class="btn-delete"></button>
        </li>`;
    todoListContainer.innerHTML += pattern;
}

const addTodo = (e) => {
    e.preventDefault();

    const textTodo = formAddTodo.addTodoField.value.trim();
    if (textTodo) {
        generateTemplate(textTodo);
    }

    formAddTodo.addTodoField.value = "";
}

const search = () => {
    const searchKey = formSearch.searchTodoField.value.toLowerCase();

    for (item of todoListContainer.querySelectorAll("li")) {
        if (!item.querySelector("p").innerText.toLowerCase().includes(searchKey)) {
            item.style.display = "none";
        } else {
            item.style.display = "flex";
        }
    }
}

formSearch.addEventListener("keyup", search);

formAddTodo.addEventListener("submit", addTodo);

todoListContainer.addEventListener("click", (e) => {

    const removeTodo = () => {
        e.target.parentElement.remove();
    }

    const markTodo = () => {
        const checkbox = e.target.parentElement.querySelector("span");
        const textTodo = e.target.parentElement.querySelector("p");

        if (checkbox.className == "icon-check") {
            checkbox.className = "icon-check-done";
            textTodo.className = "todo-item-text-complete";
        } else {            
            textTodo.className = "todo-item-text";
            checkbox.className = "icon-check";
        }
    }

    switch (e.target.dataset.action) {
        case "delete":
            removeTodo();
            break;      
        case "mark":
            markTodo();
            break;  
        default:
            break;
    }
});


