import {collectData, ToDos} from './logic.js';


// Get content node reference
const ContentRef = (() =>{

    const content = document.getElementById('content');
    return {content};

})();

// create div container for button and tasks 
const  BtnAndTaskConainer = (()=>{

    const toDoAndBtnContainerDiv = document.createElement('div');
    toDoAndBtnContainerDiv.id = 'todo-and-btn-container';
    ContentRef.content.appendChild(toDoAndBtnContainerDiv);
    
    return {toDoAndBtnContainerDiv}
    
})();


// create task container
const TaskContainer = (() => {

    const toDoContainerDiv = document.createElement('div');
    toDoContainerDiv.id = 'todo-container'
    BtnAndTaskConainer.toDoAndBtnContainerDiv.appendChild(toDoContainerDiv);

    return {toDoContainerDiv};

})();



// add new task
const addNewTask = () => {

    const newTaskContainer = document.createElement('div');
    newTaskContainer.classList.add('new-todo-container')
    newTaskContainer.addEventListener('blur', removeNewTaskIfEmpty, true);

    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.name = "X";
    input.id = "X";
    input.value = "X";
    label.appendChild(input);
    
    const editableTaskSpan = document.createElement('span');
    editableTaskSpan.contentEditable = "true";
    editableTaskSpan.classList.add('editable-span');

    newTaskContainer.appendChild(label);
    newTaskContainer.appendChild(editableTaskSpan);

    TaskContainer.toDoContainerDiv.appendChild(newTaskContainer);
}

// remove todo if empty
const removeNewTaskIfEmpty = (e) => {
    if (e.target.textContent == ""){
        e.target.parentElement.remove();
        checkForNewTaskBtn();
        return;
    } else {
        collectData(e.target.textContent);
        checkForNewTaskBtn();
        return;
    }
};


// if editing a task, a button for a new on
//  will be there. So always check if a button
// for new task is there. If it isn't, add it
const checkForNewTaskBtn = () => {
    const checkForBtn = document.getElementById('new-todo-btn-container');
    if (checkForBtn == null) {
        newToDoBtn();
        return;
    }
};


// remove btn
const removeBtn = (e) => {
    const removeThisBtn = document.getElementById('new-todo-btn-container');
    removeThisBtn.remove();
    addNewTask();
};



// create form
function newToDoBtn(){

    const btnDiv = document.createElement('div');
    btnDiv.id = 'new-todo-btn-container';
    const btnForNewTodo = document.createElement('input');
    btnForNewTodo.type = 'button';
    btnForNewTodo.id = 'btn-for-new-todo';
    btnForNewTodo.value = '+ Add task';
    btnForNewTodo.addEventListener('click', removeBtn);
    btnDiv.appendChild(btnForNewTodo);
    
    BtnAndTaskConainer.toDoAndBtnContainerDiv.appendChild(btnDiv);
    return ContentRef.content;

}


// create list to render todos
// function createList() {

//     const listDiv = document.createElement('div');
//     listDiv.setAttribute('class', 'list-container')
//     const list = document.createElement('ul');

//     list.setAttribute('id', 'list')
//     listDiv.appendChild(list)
//     content.appendChild(listDiv);   

//     return content;


// }

// render new todo on screen
// function renderNewTodos() {

//     // get list node reference
//     const list = document.getElementById('list');

//     // Get last item added to ToDos.todos
//     const lastTodo = ToDos.todos.slice(-1);
//     lastTodo.forEach(todoItem => {
//         const newTodo = document.createElement('li');
//         newTodo.setAttribute('class', `todo-item ${todoItem.title}`)
//         newTodo.textContent = todoItem.title;
//         list.appendChild(newTodo);
//         console.log(todoItem.title);
//     })
// }



export {
    newToDoBtn,
    removeNewTaskIfEmpty,
    // createList,
    // renderNewTodos,
}
