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

        // instantiate the a UI object and pass...                      
        this.view = new UI(); // Project.projects

        // initialize the storage and pass default projects
        _Storage.initStorage(this.inbox_project, this.today_project, this.week_project);

    }
}




