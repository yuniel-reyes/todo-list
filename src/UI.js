export default class UI {
    constructor(root, handlers) {
        this.app = root;
        this.handlers = handlers;
        this.content = document.getElementById('content');
        this.newToDoBtn();  // run 
    }
    
   // create add task button 
   newToDoBtn(){
        const btnDiv = document.createElement('div');
        btnDiv.id = 'new-todo-btn-container';
        const btnForNewTodo = document.createElement('input');
        btnForNewTodo.type = 'button';
        btnForNewTodo.id = 'btn-for-new-todo';
        btnForNewTodo.value = '+ Add task';
        btnForNewTodo.addEventListener('click', (e) => {
            const removeThisBtn = document.getElementById('new-todo-btn-container');
            removeThisBtn.remove();
            this.addNewTask();
        });
        btnDiv.appendChild(btnForNewTodo);
        this.content.appendChild(btnDiv)
        return
    }

    addNewTask() {

        const newTaskContainer = document.createElement('div');
        newTaskContainer.classList.add('new-todo-container')
        newTaskContainer.addEventListener('blur', (e) => {
            if (e.target.textContent == "") {
                e.target.parentElement.remove();
                this.checkForNewTaskBtn();
                console.log(e)
                return;
            } else {
                console.log(e)
                this.handlers.addTask();
                this.checkForNewTaskBtn();
                return;
            }
        }, true);
    
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
        this.content.appendChild(newTaskContainer)

        return
    }   
    
    
    // if editing a task, a button for a new on
    //  will be there. So always check if a button
    // for new task is there. If it isn't, add it
     checkForNewTaskBtn() {
        const checkForBtn = document.getElementById('new-todo-btn-container');
        if (checkForBtn == null) {
            this.newToDoBtn();
            return;
        }
};
}

