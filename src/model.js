import {format, compareAsc} from 'date-fns'

// model
export default class ToDos {
    
    constructor(title, project_name, id, dueDate=format(new Date(), 'yyyy-MM-dd'), week=format(new Date(), 'w')) {
        this.title = title;
        this.project_name = project_name; 
        this.id = id;
        this.dueDate = dueDate;
        this.week = week;
    }
}