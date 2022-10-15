// import { inPage } from "./pageState";
// import updateStatus from './updateStatus.js';
// import { newToDoBtn, renderToDosFromArray } from './domWork.js'
// import { ToDos } from "./logic";

// function inbox(e) {


//     // this will get me the current state of the
//     // inbox tab / page. It will be false at first
//     const inboxState = inPage.statePage.inbox;
//     const currentPage = 'inbox';

//     if (inboxState == false && e !== undefined) {

//         // this could be a function: remove selected
//         for (const eachChild of theSideBar.children) {
//             if (eachChild.classList.contains('selected')) {
//                 eachChild.classList.toggle('selected');
//             }
//         }
//     }
    
//     // show inbox tab as selected 
//     theInboxTab.classList.toggle('selected');

//     // check if todos in array
//     if (ToDos.todos.length == 0) {
//         // renderToDosFromArray();
//         console.log('Inbox')
//     }

//     // render the new task button
//     newToDoBtn();

//     // update the state of the current page
//     updateStatus(currentPage);
//     return theSideBar;
// }

// export {
//     inbox,
// }