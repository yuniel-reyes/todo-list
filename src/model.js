import {format, compareAsc} from 'date-fns'

// model
export default class ToDos {
    
    constructor(title, project_name, id, dueDate=format(new Date(), 'MM/dd/yyyy')) {
        this.title = title;
        this.project_name = project_name; 
        this.id = id;
        this.dueDate = dueDate;
    }



}