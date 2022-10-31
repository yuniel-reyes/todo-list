import listicon from './img/list.png';
import removeIcon from './img/remove.png';

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

    constructor({createTaskUI, getProjectTodosUI, createNewProjectUI, 
        getNotDefaultProjectsUI, removeProjectUI}) {
        
        UI.prototype.createTaskUI = createTaskUI;
        UI.prototype.getProjectTodosUI = getProjectTodosUI;
        UI.prototype.createNewProjectUI = createNewProjectUI;
        UI.prototype.getNotDefaultProjectsUI = getNotDefaultProjectsUI;
        UI.prototype.removeProjectUI = removeProjectUI;

        this.listeners = (() => { // UI.inbox
            UI.nodeRef.theInboxTab.addEventListener('click', UI.renderProjectTodos); 
            UI.nodeRef.theTodayTab.addEventListener('click', UI.today);
            UI.nodeRef.theWeekTab.addEventListener('click', UI.thisWeek);
            UI.nodeRef.newProjects.addEventListener('click', UI.newProjects);
        })();

        // UI.inbox();
        UI.renderProjectTodos('inbox');
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

    // save todo to the storage
    static setToDo(e) {

        if (e.target.textContent == "") {
            e.target.parentElement.remove();
            UI.checkForNewTaskBtn();
        } else {
            if (e.currentTarget.firstChild.firstChild.id == "X") {
                const todoId = UI.prototype.createTaskUI(e.target.textContent, UI.getCurrentPage());
                UI.updateId(todoId);
                UI.checkForNewTaskBtn();
            } else { 
                UI.prototype.updateContentUI(e.currentTarget.firstChild.firstChild.id, e.currentTarget.lastChild.textContent);
                UI.checkForNewTaskBtn();    
            }
        }
        return
    }

    static updateId(todoId) {
        const updadeThisId = document.querySelectorAll('.new-todo-container');
        updadeThisId[updadeThisId.length - 1].firstChild.firstChild.id = todoId
        return;
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

    // remove content when loading projects
    static removeContentChildren() {
        for (const eachChildren of Array.from(UI.nodeRef.content.children)) {
            if (eachChildren.className == 'new-todo-container') {
                eachChildren.remove();
            }
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
        console.log(UI.nodeRef.titleHeaders)
        const div = document.createElement('div');
        div.setAttribute('class', `title ${currentPage}`);
        div.textContent = `${currentPage}`;
        UI.nodeRef.titleHeaders.appendChild(div);
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


    // ======PROJECTS======
    static removeNewProjectDiv() {
        UI.nodeRef.newProjects.style.visibility = 'hidden';
    }

    // render projects on input
    static renderNewProject(projectName) {

        UI.renderProjectBox(projectName);           
    }

    // render todos of current project
    static renderProjectTodos(thisPage) {

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

        const thisTodos = UI.prototype.getProjectTodosUI(currentPage);

        if (thisTodos.length !== 0) {
            thisTodos.forEach(eachTodo => {

                const newTaskContainer = document.createElement('div');
                newTaskContainer.classList.add('new-todo-container')
                newTaskContainer.addEventListener('blur', UI.addOrCall, true);
            
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.id = eachTodo.id;
                label.appendChild(input);
                
                const editableTaskSpan = document.createElement('span');
                editableTaskSpan.contentEditable = "true";
                editableTaskSpan.classList.add('editable-span');
                editableTaskSpan.textContent = eachTodo.title;
                newTaskContainer.appendChild(label);
                newTaskContainer.appendChild(editableTaskSpan);
                UI.nodeRef.content.insertAdjacentElement('afterbegin', newTaskContainer);
            });
        }

        // render the new task button
        if (UI.nodeRef.content.children.namedItem('new-todo-btn-container') == null) {
            UI.newToDoBtn();
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
    static removeProjectfromSideBar(project) {
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
        ProjectContainer.addEventListener('click', UI.renderProjectTodos);
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
            UI.removeProjectfromSideBar(e.target.id);
            // remove project from state
            UI.removeProjectState(project);
            // UI.renderProjectTodos('inbox');
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