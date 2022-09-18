let todoList = [];
let doneList = [];

const todoForm = document.querySelector('.to-do-form');
const inputText = document.querySelector('input');
const todos = document.querySelector('.to-do-list');
const dones = document.querySelector('.done-list');
const todoCountText = document.querySelector('.to-do-count');
const doneCountText = document.querySelector('.done-count');

const todoCount = () => {
    todoCountText.innerHTML = `<span> (${todoList.length})</span>`;
};

const doneCount = () => {
    doneCountText.innerHTML = `<span> (${doneList.length})</span>`;
};

const addTodoList = (e) => {
    e.preventDefault();
    const todoText = inputText.value;
    if (todoText) {
        createTodo(todoText);
    } else {
        window.alert('텍스트를 입력해 주세요.');
    }
};

const saveInTodoLocalStorage = (todoInfo) => {
    localStorage.setItem('todo-list', JSON.stringify(todoInfo));
};

const saveInDoneLocalStorage = (todoInfo) => {
    localStorage.setItem('done-list', JSON.stringify(todoInfo));
};

const getDoneFromLocalStorage = () => {
    localStorage.getItem('done-list');
};

const drawTodo = (todoInfo) => {
    const todoText = todoInfo.todoText;
    const todoId = todoInfo.todoId;

    const todoContent = document.createElement('div');
    todoContent.className = `content to-do-content-${todoId}`;
    todoContent.innerHTML = `
    <span>${todoText}</span> 
    <img 
        class="close-button-${todoId}" 
        onclick="onClickTodoCloseButton(${todoId})" 
        src='../vanilla-todo-16th/close_button.svg'  
    />
    <img
        class="check-button-${todoId}"
        onclick="onClickCheckButton(${todoId})"
        src='../vanilla-todo-16th/Check.svg'
    />
    `;
    todos.appendChild(todoContent);
};

const todoItemsInLocalStorage = JSON.parse(localStorage.getItem('todo-list'));
if (todoItemsInLocalStorage) {
    todoItemsInLocalStorage.forEach((todoInfo) => {
        drawTodo(todoInfo);
        todoList.push(todoInfo);
    });
    todoCount();
}

const createTodo = (todoText) => {
    const todoId = new Date().getTime();
    const todoInfo = {
        todoId: todoId,
        todoText: todoText,
    };

    todoList.push(todoInfo);
    saveInTodoLocalStorage(todoList);

    drawTodo(todoInfo);
    todoCount();

    inputText.value = '';
};

const onClickTodoCloseButton = (todoId) => {
    let closeButton = document.querySelector(`.close-button-${todoId}`);
    if (closeButton.parentElement.className == `content to-do-content-${todoId}`) {
        todoList = todoList.filter((todoInfo) => todoInfo.todoId !== todoId);
        saveInTodoLocalStorage(todoList);
        closeButton.parentElement.remove();
    }
    todoCount();
};

const onClickDoneCloseButton = (todoId) => {
    let closeButton = document.querySelector(`.close-button-${todoId}`);
    if (closeButton.parentElement.className == `content done-content-${todoId}`) {
        doneList = doneList.filter((todoInfo) => todoInfo.todoId !== todoId);
        saveInDoneLocalStorage(doneList);
        closeButton.parentElement.remove();
    }
    doneCount();
};

const drawDone = (todoInfo) => {
    const todoId = todoInfo.todoId;
    const todoText = todoInfo.todoText;

    const doneContent = document.createElement('div');
    doneContent.className = `content done-content-${todoId}`;
    doneContent.innerHTML = `
    <span class="done-text">${todoText}</span>
    <img
        class="close-button-${todoId}"
        onclick="onClickDoneCloseButton(${todoId})"
        src='../vanilla-todo-16th/close_button.svg'
    />
    `;
    dones.appendChild(doneContent);
};

const doneItemsInLocalStorage = JSON.parse(localStorage.getItem('done-list'));
if (doneItemsInLocalStorage) {
    doneItemsInLocalStorage.forEach((todoInfo) => {
        drawDone(todoInfo);
        doneList.push(todoInfo);
    });
    doneCount();
}

const onClickCheckButton = (todoId) => {
    let todoText;
    let todoInfo;
    let closeButton = document.querySelector(`.close-button-${todoId}`);
    let checkButton = document.querySelector(`.check-button-${todoId}`);
    if (checkButton.parentElement.className == `content to-do-content-${todoId}`) {
        todoList.map((todoInfo) => {
            if (todoInfo.todoId == todoId) {
                todoText = todoInfo.todoText;
            }
        });
        todoInfo = {
            todoId: todoId,
            todoText: todoText,
        };
        doneList.push(todoInfo);
        todoList = todoList.filter((todoInfo) => todoInfo.todoId !== todoId);
        saveInTodoLocalStorage(todoList);
        closeButton.parentElement.remove();
        saveInDoneLocalStorage(doneList);
        todoCount();
        doneCount();
    }

    drawDone(todoInfo);
    todoCount();
};

const init = () => {
    todoForm.addEventListener('submit', addTodoList);
};
init();
