const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = getTodos();
updateTodoList();

// Form submit
todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
});

// Add new todo
function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length === 0) return;

    const todoObject = {
        id: Date.now(), // unique ID
        text: todoText,
        date: "",       // optional
        time: "",
        completed: false
    };

    allTodos.push(todoObject);
    saveTodos();
    updateTodoList();
    todoInput.value = "";
}

// Update UI
function updateTodoList() {
    todoListUL.innerHTML = "";
    allTodos.forEach(todo => {
        const todoItem = createTodoItem(todo);
        todoListUL.appendChild(todoItem);
    });
}

// Create each todo item
function createTodoItem(todo){
    const todoLI = document.createElement('li');
    todoLI.className = "todo";
    if(todo.completed) todoLI.classList.add('completed');

    todoLI.innerHTML = `
        <input type="checkbox" id="todo-${todo.id}" ${todo.completed ? "checked" : ""}>
        <label class="custom-checkbox" for="todo-${todo.id}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>
        </label>
        <span class="todo-text">${todo.text}</span>
        <span class="todo-datetime">${todo.date ? todo.date : ''} ${todo.time ? todo.time : ''}</span>
        <button class="edit-button">Edit</button>
        <button class="delete-button">Delete</button>
    `;

    // Toggle completed
    const checkbox = todoLI.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        todoLI.classList.toggle('completed', checkbox.checked);
        saveTodos();
    });

    // Delete task
    const deleteButton = todoLI.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        allTodos = allTodos.filter(t => t.id !== todo.id);
        saveTodos();
        updateTodoList();
    });

    // Edit task inline
    const editButton = todoLI.querySelector('.edit-button');
    editButton.addEventListener('click', () => {
        const textSpan = todoLI.querySelector('.todo-text');
        const datetimeSpan = todoLI.querySelector('.todo-datetime');

        // Create input fields
        const textInput = document.createElement('input');
        textInput.type = "text";
        textInput.value = todo.text;
        textInput.className = "edit-text";

        const dateInput = document.createElement('input');
        dateInput.type = "date";
        dateInput.value = todo.date;

        const timeInput = document.createElement('input');
        timeInput.type = "time";
        timeInput.value = todo.time;

        // Replace spans with inputs
        todoLI.replaceChild(textInput, textSpan);
        todoLI.replaceChild(dateInput, datetimeSpan);
        todoLI.insertBefore(timeInput, editButton);

        editButton.textContent = "Save";

        // Save changes
        editButton.onclick = () => {
            todo.text = textInput.value.trim() || todo.text;
            todo.date = dateInput.value;
            todo.time = timeInput.value;
            saveTodos();
            updateTodoList();
        };
    });

    return todoLI;
}

// Save todos to localStorage
function saveTodos(){
    localStorage.setItem("todos", JSON.stringify(allTodos));
}

// Load todos from localStorage
function getTodos(){
    return JSON.parse(localStorage.getItem("todos") || "[]");
}
