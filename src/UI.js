import listicon from './img/list.png';
import removeIcon from './img/remove.png';
import deleteIcon from './img/delete.png';

export default class UI {
    
    static pageState = {
        'inbox': false,
        'today': false,
        'this-week': false,
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

    constructor({createTaskUI, getProjectTodosUI, createNewProjectUI, 
        getNotDefaultProjectsUI, removeProjectUI, updateContentUI, deleteTodoUI,
        updateTodoDateUI, todaysTodosUI}) {
        
        UI.prototype.createTaskUI = createTaskUI;
        UI.prototype.getProjectTodosUI = getProjectTodosUI;
        UI.prototype.createNewProjectUI = createNewProjectUI;
        UI.prototype.getNotDefaultProjectsUI = getNotDefaultProjectsUI;
        UI.prototype.removeProjectUI = removeProjectUI;
        UI.prototype.updateContentUI = updateContentUI;
        UI.prototype.deleteTodoUI = deleteTodoUI;
        UI.prototype.updateTodoDateUI = updateTodoDateUI;
        UI.prototype.todaysTodosUI = todaysTodosUI;

        this.listeners = (() => { // UI.inbox
            UI.nodeRef.theInboxTab.addEventListener('click', UI.prepareTodosRendering); 
            UI.nodeRef.theTodayTab.addEventListener('click', UI.prepareTodosRendering);
            UI.nodeRef.theWeekTab.addEventListener('click', UI.prepareTodosRendering);
            UI.nodeRef.newProjects.addEventListener('click', UI.newProjects);
        })();

        // UI.inbox();
        UI.prepareTodosRendering('inbox');
        UI.renderProjectsOnReload();
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
        newTaskContainer.classList.add('new-todo-container');
    
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.addEventListener('change', (e) => {
            UI.prototype.deleteTodoUI(e.target.id, e.target.dataset['project']);
            UI.removeTodoFromPage(e.target.id);
        });
        input.type = 'checkbox';
        input.id = "X";
        label.appendChild(input);
        
        const spanDiv = document.createElement('div');
        spanDiv.setAttribute('class', 'span-container')
        const editableTaskSpan = document.createElement('span');
        editableTaskSpan.contentEditable = "true";
        editableTaskSpan.classList.add('editable-span');
        spanDiv.addEventListener('blur', UI.setToDo, true);
        spanDiv.appendChild(editableTaskSpan);

        const dateDiv = document.createElement('div');
        dateDiv.setAttribute('class', 'date-container');
        const dateInput = document.createElement('input')
        dateInput.setAttribute('type', 'date');
        dateInput.addEventListener('change', (e) => {
            UI.prototype.updateTodoDateUI(e.target.id, e.target.value, e.target.dataset['project']);
        });
        dateInput.id = "X";
        dateInput.setAttribute('data-project', 'X');

        const removeDiv = document.createElement('div');
        removeDiv.setAttribute('class', 'remove-icon-container');
        const removeIcon = document.createElement('img');
        removeIcon.addEventListener('click', (e) => {
            UI.prototype.deleteTodoUI(e.target.id, e.target.dataset['project']);
            UI.removeTodoFromPage(e.target.id);
        });
        removeIcon.setAttribute('src', deleteIcon);
        removeIcon.setAttribute('id', 'X');
        removeIcon.setAttribute('data-project', 'X');
        removeDiv.appendChild(removeIcon);


        dateDiv.appendChild(dateInput);
        newTaskContainer.appendChild(label);
        newTaskContainer.appendChild(spanDiv);
        newTaskContainer.appendChild(dateDiv);
        newTaskContainer.appendChild(removeDiv);
        UI.nodeRef.content.appendChild(newTaskContainer)

        editableTaskSpan.focus();

    }

    // save todo to the storage
    static setToDo(e) {

        // console.log(e.currentTarget.parentElement.lastChild.firstChild);
        // console.log(e.target.parentElement);
        // console.log(e.currentTarget.previousSibling.firstChild);
        if (e.target.textContent == "") {
            e.currentTarget.parentElement.remove();
            UI.checkForNewTaskBtn();
        } else {
            if (e.currentTarget.previousSibling.firstChild.id == "X") {
                const newTask = UI.prototype.createTaskUI(e.target.textContent, UI.getCurrentPage());
                UI.updateTodoData(newTask.id, UI.getCurrentPage());
                UI.checkForNewTaskBtn();
            } else { 
                // id, content, project
                const id = e.currentTarget.parentElement.firstChild.firstChild.id;
                const project = e.currentTarget.parentElement.firstChild.firstChild.dataset['project'];
                const newContent = e.currentTarget.parentElement.firstChild.nextSibling.firstChild.textContent;
                UI.prototype.updateContentUI(id, newContent, project);
                UI.checkForNewTaskBtn(UI.getCurrentPage());    
            }
        }
        return
    }

    static updateTodoData(todoId, projectName) {
        const updadeThisId = document.querySelectorAll('.new-todo-container');
        updadeThisId[updadeThisId.length - 1].firstChild.firstChild.id = todoId;
        updadeThisId[updadeThisId.length - 1].firstChild.firstChild.setAttribute('data-project', projectName);
        updadeThisId[updadeThisId.length - 1].lastChild.firstChild.id = todoId;
        updadeThisId[updadeThisId.length - 1].lastChild.firstChild.setAttribute('data-project', projectName);
        // update date data
        updadeThisId[updadeThisId.length - 1].lastChild.previousSibling.firstChild.id = todoId;
        updadeThisId[updadeThisId.length - 1].lastChild.previousSibling.firstChild.setAttribute('data-project', projectName);
        return;
    }

    static removeTodoFromPage(id) {
        console.log(id)
        console.log(UI.nodeRef.content);
        for (const eachChild of Array.from(UI.nodeRef.content.children)){
            if (eachChild.className == 'new-todo-container'){
                if (eachChild.firstChild.firstChild.id == Number(id)) {
                    eachChild.remove();
                }
            }
        } 
    }

    // if editing a task, a button for a new on
    //  will be there. So always check if a button
    // for new task is there. If it isn't, add it
    static checkForNewTaskBtn(currentPage) {
        const checkForBtn = document.getElementById('new-todo-btn-container');
        if (checkForBtn == null && (currentPage != 'today') && (currentPage != 'this-week')) {
            UI.newToDoBtn();
            return;
        }
    }

    // remove content when loading projects
    static removeContentChildren() {
        for (const eachChildren of Array.from(UI.nodeRef.content.children)) {
            eachChildren.remove();
        }
    }

    // show project header   
    static showHeader(currentPage) {
        let headerExists = false;

        for (const titleChildren of UI.nodeRef.titleHeaders.children) {
            if (titleChildren.className.includes(currentPage)) {
                headerExists = true;
                titleChildren.style.visibility = 'visible';
            } else {
                titleChildren.style.visibility = 'hidden';
            } 
        }
        if (headerExists == false) {
                UI.addNewHeader(currentPage);
            }
    }

    // add new header 
    static addNewHeader(currentPage) {
        // console.log(UI.nodeRef.titleHeaders)
        const div = document.createElement('div');
        div.setAttribute('class', `title ${currentPage}`);
        div.textContent = `${currentPage}`;
        UI.nodeRef.titleHeaders.appendChild(div);
    }

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


    // ======PROJECTS======
    static removeNewProjectDiv() {
        UI.nodeRef.newProjects.style.visibility = 'hidden';
    }

    // render projects on input
    static renderNewProject(projectName) {

        UI.renderProjectBox(projectName);           
    }

    // render todos of current project
    static prepareTodosRendering(thisPage) {

        const currentPage = UI.cleanPageToJump(thisPage);

        let thisTodos = [];

        if (currentPage == 'today') {
            
            thisTodos = UI.prototype.todaysTodosUI();

        } else if (currentPage == 'this-week') {

            console.log('this_week');

        } else {

            thisTodos = UI.prototype.getProjectTodosUI(currentPage);
        }

        UI.renderThisTodos(thisTodos);

        // render the new task button
        if ((currentPage !== 'today') && (currentPage !== 'this-week')) {
            
            if (UI.nodeRef.content.children.namedItem('new-todo-btn-container') == null) {
                UI.newToDoBtn();
            }
        }

    }

    // clean page
    static cleanPageToJump(thisPage) {

        UI.removeContentChildren();

        let currentPage = '';

        if (Object.prototype.toString.call(thisPage) == '[object String]') {
            currentPage = thisPage;
        } else {
            // thisPage.stopPropagation();
            currentPage = thisPage.target.id;
        }

        let thisPageState = UI.pageState[currentPage];
        if (thisPageState == undefined) {
            thisPageState = false;
            currentPage = 'inbox';
        }

        if (thisPageState == false) {

            // this could be a function: remove selected
            for (const eachChild of UI.nodeRef.theSideBar.children) {
                if (eachChild.classList.contains('selected')) {
                    eachChild.classList.toggle('selected');
                }

                if (eachChild.id == currentPage) {
                    eachChild.classList.toggle('selected');
                }
            }

            // update the state of the current page
            UI.updateState(currentPage);

            // // call show project header function
            UI.showHeader(currentPage);            

        }

        return currentPage;

    }

    // render the returned todos on the page
    static renderThisTodos(todos) {

        if (todos.length !== 0) {
            todos.forEach(eachTodo => {

                const newTaskContainer = document.createElement('div');
                newTaskContainer.classList.add('new-todo-container')
            
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.addEventListener('change', (e) => {
                    // console.log(e);
                    UI.prototype.deleteTodoUI(e.target.id, e.target.dataset['project']);
                    UI.removeTodoFromPage(e.target.id);
                });
                input.type = 'checkbox';
                input.id = eachTodo.id;
                input.setAttribute('data-project', eachTodo.project_name);
                label.appendChild(input);
                

                const spanDiv = document.createElement('div');
                spanDiv.setAttribute('class', 'span-container')
                const editableTaskSpan = document.createElement('span');
                editableTaskSpan.contentEditable = "true";
                editableTaskSpan.classList.add('editable-span');
                spanDiv.addEventListener('blur', UI.setToDo, true);
                editableTaskSpan.textContent = eachTodo.title;
                spanDiv.appendChild(editableTaskSpan);

                const dateDiv = document.createElement('div');
                dateDiv.setAttribute('class', 'date-container');
                const dateInput = document.createElement('input');
                dateInput.setAttribute('type', 'date');
                dateInput.addEventListener('input', (e) => {
                    UI.prototype.updateTodoDateUI(e.target.id, e.target.value, e.target.dataset['project']);
                    // console.log('Works')
                });
                dateInput.id = eachTodo.id;
                dateInput.setAttribute('data-project', eachTodo.project_name);
                console.log(eachTodo.dueDate);
                dateInput.value = eachTodo.dueDate;
                dateDiv.appendChild(dateInput);

                const removeDiv = document.createElement('div');
                removeDiv.setAttribute('class', 'remove-icon-container');
                const removeIcon = document.createElement('img');
                removeIcon.addEventListener('click', (e) => {
                    // console.log(e);
                    UI.prototype.deleteTodoUI(e.target.id, e.target.dataset['project'])
                    UI.removeTodoFromPage(e.target.id);
                });
                removeIcon.setAttribute('src', deleteIcon);
                removeIcon.setAttribute('id', eachTodo.id);
                removeIcon.setAttribute('data-project', eachTodo.project_name);
                removeDiv.appendChild(removeIcon);
        
                newTaskContainer.appendChild(label);
                newTaskContainer.appendChild(spanDiv);
                newTaskContainer.appendChild(dateDiv);
                newTaskContainer.appendChild(removeDiv);
                UI.nodeRef.content.insertAdjacentElement('afterbegin', newTaskContainer);
            });
        }
    }

    // render projects when reloading page
    static renderProjectsOnReload() {

        const thisProjects = UI.prototype.getNotDefaultProjectsUI();
        // console.log(thisProjects);
        thisProjects.forEach(eachProject => {
            UI.renderProjectBox(eachProject.project_name);   
        })
    }

    // remove projects from sidebar
    static removeProjectFromSideBar(project) {
        for (const eachChild of UI.nodeRef.theSideBar.children) {
            if (eachChild.id.includes(project)) {
                eachChild.remove();
            }
        }
    }
    
    static removeProjectState(project) {
        delete UI.pageState[project];
        console.log(UI.pageState);
    }

    // show project box on sidebar
    static renderProjectBox(project) {
        const ProjectContainer = document.createElement('div');
        ProjectContainer.addEventListener('click', UI.prepareTodosRendering);
        ProjectContainer.setAttribute('id', `${project}`);
        ProjectContainer.setAttribute('class', 'project-container');
        
        const icon = document.createElement('img');
        icon.setAttribute('class', 'icon-list');
        icon.setAttribute('src', listicon);

        const removeProjectContainer = document.createElement('div');
        removeProjectContainer.setAttribute('class', 'remove-container');
        const removeProject = document.createElement('img');
        removeProject.setAttribute('class', 'icon-remove');
        removeProject.setAttribute('id', `${project}`);
        removeProject.setAttribute('src', removeIcon);
        removeProject.addEventListener('click', (e) => {
            UI.prototype.removeProjectUI(e.target.id);
            UI.removeProjectFromSideBar(e.target.id);
            // remove project from state
            UI.removeProjectState(project);
        });
        removeProjectContainer.appendChild(removeProject);

        const textContainer = document.createElement('div');
        textContainer.setAttribute('class', 'text-container')
        textContainer.setAttribute('id', `${project}`);
        const projectNameText = document.createElement('span');
        projectNameText.textContent = project;
        textContainer.appendChild(projectNameText);
        ProjectContainer.appendChild(icon);
        ProjectContainer.appendChild(textContainer);
        ProjectContainer.appendChild(removeProjectContainer)

        UI.nodeRef.ProjectSeparator.insertAdjacentElement('afterend', ProjectContainer);
    }

    static checkIfProject(e) {
        if (e.target.value == "") {
            // remove input-container
            e.target.parentElement.parentElement.remove();
            UI.nodeRef.newProjects.style.visibility = 'visible';
        } else {
            // create new project
            UI.prototype.createNewProjectUI(e.target.value);
            // render project on page
            UI.renderNewProject(e.target.value);

            // create page and state
            UI.pageState[e.target.value] = false;

            // remove input box
            e.target.parentElement.parentElement.remove();
            UI.nodeRef.newProjects.style.visibility = 'visible';


            // UI.newProjectsFunctions[e.target.value] = UI.addNewProject;
            // UI.newProjectsFunctions['Gym']();
            // UI.addNewProject();
        } 
    }

    //
    static addInputProjectName() {
        const inputProjectContainer = document.createElement('div');
        inputProjectContainer.setAttribute('class', 'input-container');
        const label = document.createElement('label');
        label.setAttribute('for', 'projec-name');

        const projectInput = document.createElement('input');
        projectInput.className = 'project-input';
        projectInput.addEventListener('blur', UI.checkIfProject);
        projectInput.type = 'text';
        // projectInput.id = 'prject-name';
        // projectInput.name = 'project-name';
        label.appendChild(projectInput);
        inputProjectContainer.appendChild(label);


        UI.nodeRef.ProjectSeparator.insertAdjacentElement('afterend', inputProjectContainer);
        projectInput.focus();
    }

    // 
    static newProjects() {
        // remove new project div
        UI.removeNewProjectDiv();
        // add input for project name
        UI.addInputProjectName();
    }
    
}