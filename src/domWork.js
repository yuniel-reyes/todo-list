// import {collectData, ToDos} from './logic.js';
// import {inbox} from './inbox.js'
// import { today } from './today.js';


// // // Get content node reference
// // const ContentRef = (() =>{

// //     const content = document.getElementById('content');
// //     return {content};

// // })();

// // // create div container for button and tasks 
// // const  BtnAndTaskContainer = (()=>{

// //     const toDoAndBtnContainerDiv = document.createElement('div');
// //     toDoAndBtnContainerDiv.id = 'todo-and-btn-container';
// //     ContentRef.content.appendChild(toDoAndBtnContainerDiv);
    
// //     return {toDoAndBtnContainerDiv}
    
// // })();


// // // create task container
// // const TaskContainer = (() => {

// //     const toDoContainerDiv = document.createElement('div');
// //     toDoContainerDiv.id = 'todo-container'
// //     BtnAndTaskContainer.toDoAndBtnContainerDiv.appendChild(toDoContainerDiv);

// //     return {toDoContainerDiv};

// // })();

// // add event listeners to sidebar
// ((inbox, today) => {

//     // const PAGES = {
//     //     'inbox': inbox,
//     // };

//     // get inbox node reference and add event listener
//     const inboxRef = document.querySelector('.inbox');
//     inboxRef.addEventListener('click', inbox);

//     // get inbox node reference and add event listener
//     const todayRef = document.querySelector('.today');
//     todayRef.addEventListener('click', today)

// })(inbox, today);


// // ADD TASK
// // add new task when button is clicked
// const addNewTask = () => {

//     const newTaskContainer = document.createElement('div');
//     newTaskContainer.classList.add('new-todo-container')
//     newTaskContainer.addEventListener('blur', removeNewTaskIfEmpty, true);

//     const label = document.createElement('label');
//     const input = document.createElement('input');
//     input.type = 'checkbox';
//     input.name = "X";
//     input.id = "X";
//     input.value = "X";
//     label.appendChild(input);
    
//     const editableTaskSpan = document.createElement('span');
//     editableTaskSpan.contentEditable = "true";
//     editableTaskSpan.classList.add('editable-span');

//     newTaskContainer.appendChild(label);
//     newTaskContainer.appendChild(editableTaskSpan);

//     TaskContainer.toDoContainerDiv.appendChild(newTaskContainer);
// }

// // remove todo if empty
// const removeNewTaskIfEmpty = (e) => {
//     if (e.target.textContent == ""){
//         e.target.parentElement.remove();
//         checkForNewTaskBtn();
//         return;
//     } else {
//         collectData(e.target.textContent);
//         checkForNewTaskBtn();
//         return;
//     }
// };


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


// // remove btn
// const removeBtn = (e) => {
//     const removeThisBtn = document.getElementById('new-todo-btn-container');
//     removeThisBtn.remove();
//     addNewTask();
// };



// // create form
// function newToDoBtn(){

//     const btnDiv = document.createElement('div');
//     btnDiv.id = 'new-todo-btn-container';
//     const btnForNewTodo = document.createElement('input');
//     btnForNewTodo.type = 'button';
//     btnForNewTodo.id = 'btn-for-new-todo';
//     btnForNewTodo.value = '+ Add task';
//     btnForNewTodo.addEventListener('click', removeBtn);
//     btnDiv.appendChild(btnForNewTodo);
    
//     BtnAndTaskContainer.toDoAndBtnContainerDiv.appendChild(btnDiv);
//     return ContentRef.content;

// }


// // render new todo on screen
// const renderToDosFromArray = () => {
    
//     ToDos.todos.forEach(todoItem => {

//         const newTaskContainer = document.createElement('div');
//         newTaskContainer.classList.add('new-todo-container')
//         // newTaskContainer.addEventListener('blur', removeNewTaskIfEmpty, true);
    
//         const label = document.createElement('label');
//         const input = document.createElement('input');
//         input.type = 'checkbox';
//         input.name = "X";
//         input.id = "X";
//         input.value = "X";
//         label.appendChild(input);
        
//         const editableTaskSpan = document.createElement('span');
//         editableTaskSpan.contentEditable = "true";
//         editableTaskSpan.classList.add('editable-span');
//         editableTaskSpan.textContent = todoItem.title;
    
//         newTaskContainer.appendChild(label);
//         newTaskContainer.appendChild(editableTaskSpan);
    
//         TaskContainer.toDoContainerDiv.appendChild(newTaskContainer);
//     })


// }


// export {
//     newToDoBtn,
//     removeNewTaskIfEmpty,
//     renderToDosFromArray,
// }
