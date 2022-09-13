const toDoForm = document.querySelector('.to-do-form');
const inputText = document.querySelector('input');
const toDos = document.querySelector('.to-do-list');
const Dones = document.querySelector('.done-list');
const closeButton = document.querySelector('.close-button');

const onClickCloseButton = (e) => {
    // let closeButton = document.querySelector('.close-button');
    // toDos.removeChild(closeButton.parentElement);
    let el = document.getElementsByClassName('close-button');
    // for (let i = 0; i < el.length; i++) {
    //     if (el[i].attributes[3].nodeValue)
    // }
    console.log(el[0].attributes[3].nodeValue);
};

const paintToDo = (toDo) => {
    const div = document.createElement('div');
    div.classList.add('to-do-content');
    div.innerHTML = `${toDo} <img class="close-button" onclick="onClickCloseButton()" src='../vanilla-todo-16th/close_button.svg' value='${toDo}' />`;
    toDos.appendChild(div);
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
