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
        this.view = new UI(this.handlers()); // Project.projects

        // initialize the storage and pass default projects
        localStorage.clear()
        _Storage.initStorage(this.inbox_project, this.today_project, this.week_project);

    }

    handlers() {
        return {

            // createTask gets the value pass into it (the
            // title of the task entered by the user, the 
            // current project and create a new todo)
            // it them add that todo to the corresponding project
            createTaskUI(title, project_name) {
                const newTask = new ToDos(title, project_name, Math.trunc(Math.random()*1000));
                _Storage.saveToDo(newTask);
                return newTask.id;
            },

            getNotDefaultProjectsUI: _Storage.getNotDefaultProjects,

            getProjectTodosUI: _Storage.getProjectTodos,

            createNewProjectUI(project_name) {
                const newProject = new Project(project_name);
                _Storage.saveProject(newProject);
                // Project.addNewProjectToArray(newProject);
                // console.log(Project.projects);
            },

            removeProjectUI: _Storage.removeProject,
        }


    }

}




