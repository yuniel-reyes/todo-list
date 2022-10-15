// // Get content node reference
// const NodeRef = (() =>{

//     const content = document.getElementById('content');
//     const theSideBar = document.querySelector('.sidebar');
//     const theInboxTab = document.querySelector('.inbox');
//     const theTodayTab = document.querySelector('.today');
//     const theWeekTab = document.querySelector('.this-week');

//     return {
//         content,
//         theSideBar,
//         theInboxTab,
//         theTodayTab,
//         theWeekTab,
//     };

// })();

// // create div container for button and tasks 
// const  BtnAndTaskContainer = (()=> {

//     const toDoAndBtnContainerDiv = document.createElement('div');
//     toDoAndBtnContainerDiv.id = 'todo-and-btn-container';
//     ContentRef.content.appendChild(toDoAndBtnContainerDiv);
    
//     return {toDoAndBtnContainerDiv}
    
// })();


// // create task container
// const TaskContainer = (() => {

//     const toDoContainerDiv = document.createElement('div');
//     toDoContainerDiv.id = 'todo-container'
//     BtnAndTaskContainer.toDoAndBtnContainerDiv.appendChild(toDoContainerDiv);

//     return {toDoContainerDiv};

// })();


// export {
//     NodeRef,
//     BtnAndTaskContainer,
//     TaskContainer
// }