import {format, compareAsc} from 'date-fns'

// model
export default class ToDos {
    
    constructor(title, project_name, id, description = "", 
    dueDate=format(new Date(2014, 1, 11), 'MM/dd/yyyy'), priority=`priority['heigh']`,) {
        this.title = title;
        this.project_name = project_name; 
        this.id = id;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = {
            'heigh': false,
            'medium': false,
            'low': false
        };
    }



}