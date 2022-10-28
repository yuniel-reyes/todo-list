import listicon from './img/list.png';

export default class UI {
    
    static pageState = {
        inbox: false,
        today: false,
        thisWeek: false,
    };

    static nodeRef = {
        content: document.getElementById('content'),
        theInboxTab:  document.querySelector('.inbox'),
        theTodayTab:  document.querySelector('.today'),
        theWeekTab: document.querySelector('.this-week'), 
        theSideBar: document.querySelector('.sidebar'),
        titleHeaders: document.querySelector('.title-headers'),
        newProjects: document.querySelector('.new-projects'),
        ProjectSeparator: document.querySelector('.for-projects-separator')
    };

    constructor() { 

        this.listeners = (() => {
            UI.nodeRef.theInboxTab.addEventListener('click', UI.inbox);
            UI.nodeRef.theTodayTab.addEventListener('click', UI.today);
            UI.nodeRef.theWeekTab.addEventListener('click', UI.thisWeek);
        })();

        UI.inbox();
    }
    
   // create add task button 
   static newToDoBtn(){
        const btnDiv = document.createElement('div');
        btnDiv.id = 'new-todo-btn-container';
        const btnForNewTodo = document.createElement('input');
        btnForNewTodo.type = 'button';
        btnForNewTodo.id = 'btn-for-new-todo';
        btnForNewTodo.value = '+ Add task';
        btnForNewTodo.addEventListener('click', (e) => {
            const removeThisBtn = document.getElementById('new-todo-btn-container');
            removeThisBtn.remove();
            UI.addNewTask();
        });
        btnDiv.appendChild(btnForNewTodo);
        UI.nodeRef.content.appendChild(btnDiv)
        return
    }

    static addNewTask() {

        const newTaskContainer = document.createElement('div');
        newTaskContainer.classList.add('new-todo-container')

        // create object to get the id value
        newTaskContainer.addEventListener('blur', UI.setToDo, true);
    
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.addEventListener('change', UI.removeTodo);
        input.type = 'checkbox';
        input.id = "X";
        label.appendChild(input);
        
        const editableTaskSpan = document.createElement('span');
        editableTaskSpan.contentEditable = "true";
        editableTaskSpan.classList.add('editable-span');
        newTaskContainer.appendChild(label);
        newTaskContainer.appendChild(editableTaskSpan);
        UI.nodeRef.content.appendChild(newTaskContainer)

    }
            
    // if editing a task, a button for a new on
    //  will be there. So always check if a button
    // for new task is there. If it isn't, add it
    static checkForNewTaskBtn() {
        const checkForBtn = document.getElementById('new-todo-btn-container');
        if (checkForBtn == null) {
            UI.newToDoBtn();
            return;
        }
    }

    // select tab
    static inbox(event) {

        // this will get me the current state of the
        // inbox tab / page. It will be false at first
        const inboxState = UI.pageState.inbox;
        const currentPage = 'inbox';
    
        // run if only tab is not open 
        if (inboxState == false) {

            // this could be a function: remove selected
            for (const eachChild of UI.nodeRef.theSideBar.children) {
                if (eachChild.classList.contains('selected')) {
                    eachChild.classList.toggle('selected');
                }
            }

            // update the state of the current page
            UI.updateState(currentPage);

            // show inbox tab as selected 
            UI.nodeRef.theInboxTab.classList.toggle('selected');

            // call show project header function
            UI.showHeader(currentPage);
        
            // render the new task button
            if (UI.nodeRef.content.children.namedItem('new-todo-btn-container') == null) {
                UI.newToDoBtn();
            }

            return UI.nodeRef.theSideBar;
        } 

    }
    
    // show project header   
    static showHeader(currentPage) {
        for (const titleChildren of UI.nodeRef.titleHeaders.children) {
            if (titleChildren.className.includes(currentPage)) {
                titleChildren.style.visibility = 'visible';
            } else {
                titleChildren.style.visibility = 'hidden';
            }
        }
    }

    // the today method will render todos according to 
    // its due date. 
    static today() {

        // this will get me the current state of the
        // today tab / page. It will be false at first
        const todayState = UI.pageState.today;
        const currentPage = 'today';
    
        if (todayState == false) {
    
            // this could be a function: remove selected
            for (const eachChild of UI.nodeRef.theSideBar.children) {
                if (eachChild.classList.contains('selected')) {
                    eachChild.classList.toggle('selected');
                }
            }
        }

        // // show inbox tab as selected 
        UI.nodeRef.theTodayTab.classList.toggle('selected');

        // call show project header function
        UI.showHeader(currentPage);

        // remove all content node children
        Array.from(UI.nodeRef.content.children).forEach(eachContentChild => {
            eachContentChild.remove();
        });

        // // update the state of the current page
        UI.updateState(currentPage);
        return UI.nodeRef.theSideBar;
    }

    // thisWeek(event) {
    // }


    static updateState(currentPage) {
        for (const eachState in UI.pageState) {
            if (eachState == currentPage) {
                UI.pageState[eachState] = true;
            } else {
                UI.pageState[eachState] = false;
            }
        }
    }

    static getCurrentPage () {
        for (const eachPage in UI.pageState) {
            if (UI.pageState[eachPage] == true) {
                return eachPage;
            }
        }
    }
}