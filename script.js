const toDoForm = document.querySelector('.to-do-form');
const inputText = document.querySelector('input');
const toDos = document.querySelector('.to-do-list');

const paintToDo = (toDo) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerHTML = toDo;
    li.appendChild(span);
    toDos.appendChild(li);
};

const createToDo = (event) => {
    event.preventDefault();
    const toDo = inputText.value;
    paintToDo(toDo);
    inputText.value = '';
};

const init = () => {
    toDoForm.addEventListener('submit', createToDo);
};
init();
