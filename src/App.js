import UI from './UI.js';
import ToDos from './model.js';
import Project from './Projects.js';
import _Storage from './Storage.js';

// controller
export default class App {
    constructor() {
        this.inbox_project = new Project('inbox');
        this.today_project = new Project('today');
        this.week_project = new Project('this_week');

        // console.log(Project.projects);
        // instantiate the a UI object and pass...                      
        this.view = new UI(); // Project.projects
    }
}




