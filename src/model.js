import {format, compareAsc} from 'date-fns'

export default class ToDos {
    todos = [];
    
    constructor(title, description = "", 
    dueDate=format(new Date(2014, 1, 11), 'MM/dd/yyyy'), priority=`priority['heigh']`, ) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = {
            'heigh': false,
            'medium': false,
            'low': false
        };
        this.notes = [];
        this.checkList = [];
    }

    addTodos() {
        this.todos.push(this.title);
    }
    
    showTodos() {
        this.todos.forEach(todo => {
            console.log(todo);
        })
    }
}