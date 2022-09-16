const todoList = [];
const doneList = [];

const todoForm = document.querySelector('.to-do-form');
const inputText = document.querySelector('input');
const todos = document.querySelector('.to-do-list');
const Dones = document.querySelector('.done-list');
const closeButton = document.querySelector('.close-button');

const enterTime = (e) => {
    if (e.keyCode == 13) {
        e.preventDefault();
        console.log(e.keyCode);
    }
};

const addTodoList = (e) => {
    e.preventDefault();
    const todoText = inputText.value;
    if (todoText) {
        createTodo(todoText);
    }
    window.alert('텍스트를 입력해 주세요.');
};

const saveOnTodoLocalStorage = (todoInfo) => {
    localStorage.setItem('todo-list', JSON.stringify(todoInfo));
};

const changeToDone = () => {};

const test = (todoText) => {
    const todoId = new Date().getTime();
    const todoInfo = {
        todoId: todoId,
        todoText: todoText,
    };
    const todoContent = document.createElement('div');

    todoContent.className = `to-do-content-${todoId}`;
    todoContent.innerHTML = `
    <span>${todoText}</span> 
    <img 
        class="close-button-${todoId}" 
        onclick="onClickCloseButton(${todoId})" 
        src='../vanilla-todo-16th/close_button.svg'  
    />
    `;
    todos.appendChild(todoContent);
    todoList.push(...todoList, todoInfo);
    saveOnTodoLocalStorage(todoList);

    inputText.value = '';
};

const onClickCloseButton = (todoId) => {
    let closeButton = document.querySelector(`.close-button-${todoId}`);
    if (closeButton.parentElement.className == `to-do-content-${todoId}`) {
        console.log(todoId);
    }
};

const paintToDo = (toDo) => {
    const div = document.createElement('div');
    div.classList.add(`to-do-content-${num}`);
    div.innerHTML = `
    <span class=${toDo}>${toDo}</span> 
    <img 
        class="close-button" 
        onclick="onClickCloseButton()" 
        src='../vanilla-todo-16th/close_button.svg'  
    />
    `;
    todos.appendChild(div);
    num += 1;
};

const createToDo = (event) => {
    event.preventDefault();
    const toDo = inputText.value;
    test(toDo);
    inputText.value = '';
    // enterTime();
};

const init = () => {
    todoForm.addEventListener('submit', createToDo);
};
init();
