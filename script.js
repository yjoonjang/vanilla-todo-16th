let todoList = [];
let doneList = [];

const todoForm = document.querySelector('.to-do-form');
const inputText = document.querySelector('input');
const todos = document.querySelector('.to-do-list');
const dones = document.querySelector('.done-list');
const todoCountText = document.querySelector('.to-do-count');
const doneCountText = document.querySelector('.done-count');

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

const todoCount = () => {
    todoCountText.innerHTML = `<span> (${todoList.length})</span>`;
};

const doneCount = () => {
    doneCountText.innerHTML = `<span> (${doneList.length})</span>`;
};

const drawTodo = (todoInfo) => {
    const todoText = todoInfo.todoText;
    const todoId = todoInfo.todoId;

    const todoContent = document.createElement('div');
    todoContent.className = `content to-do-content-${todoId}`;
    todoContent.innerHTML = `
    <span>${todoText}</span> 
    <div class="buttons">
        <img 
            class="close-button-${todoId}" 
            onclick="onClickTodoCloseButton(${todoId})" 
            src='../vanilla-todo-16th/icon/delete_button.svg'  
        />
        <img
            class="check-button-${todoId}"
            onclick="onClickCheckButton(${todoId})"
            src='../vanilla-todo-16th/icon/check_button.svg'
        />
    </div>
    `;
    todos.appendChild(todoContent);
};

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
    if (closeButton.parentNode.parentElement.className == `content to-do-content-${todoId}`) {
        todoList = todoList.filter((todoInfo) => todoInfo.todoId !== todoId);
        saveInTodoLocalStorage(todoList);
        closeButton.parentNode.parentElement.remove();
    }
    todoCount();
};

const onClickDoneCloseButton = (todoId) => {
    let closeButton = document.querySelector(`.close-button-${todoId}`);
    if (closeButton.parentNode.parentElement.className == `content done-content-${todoId}`) {
        doneList = doneList.filter((todoInfo) => todoInfo.todoId !== todoId);
        saveInDoneLocalStorage(doneList);
        closeButton.parentNode.parentElement.remove();
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
    <div class="buttons">
        <img
            class="close-button-${todoId}"
            onclick="onClickDoneCloseButton(${todoId})"
            src='../vanilla-todo-16th/icon/delete_button.svg'
        />
        <img
            class="error-button-${todoId}"
            onclick="onClickErrorButton(${todoId})"
            src='../vanilla-todo-16th/icon/error_button.svg'
        />
    </div>
    `;
    dones.appendChild(doneContent);
};

const todoItemsInLocalStorage = JSON.parse(localStorage.getItem('todo-list'));
if (todoItemsInLocalStorage) {
    todoItemsInLocalStorage.forEach((todoInfo) => {
        drawTodo(todoInfo);
        todoList.push(todoInfo);
    });
    todoCount();
}

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
    let checkButton = document.querySelector(`.check-button-${todoId}`);

    if (checkButton.parentNode.parentElement.className == `content to-do-content-${todoId}`) {
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
        checkButton.parentNode.parentElement.remove();
        saveInDoneLocalStorage(doneList);
        todoCount();
        doneCount();
    }

    drawDone(todoInfo);
};

const onClickErrorButton = (todoId) => {
    let todoText;
    let todoInfo;
    let errorButton = document.querySelector(`.error-button-${todoId}`);

    if (errorButton.parentNode.parentElement.className == `content done-content-${todoId}`) {
        doneList.map((todoInfo) => {
            if (todoInfo.todoId == todoId) {
                todoText = todoInfo.todoText;
            }
        });
        todoInfo = {
            todoId: todoId,
            todoText: todoText,
        };
        todoList.push(todoInfo);
        doneList = doneList.filter((todoInfo) => todoInfo.todoId !== todoId);
        saveInDoneLocalStorage(doneList);
        errorButton.parentNode.parentElement.remove();
        saveInTodoLocalStorage(todoList);
        todoCount();
        doneCount();
    }

    drawTodo(todoInfo);
};

const init = () => {
    todoForm.addEventListener('submit', addTodoList);
};
init();
