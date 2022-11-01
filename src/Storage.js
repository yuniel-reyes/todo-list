import {format, compareAsc} from 'date-fns'

export default class _Storage {

    static getAllProjects() {

        const allProjects = JSON.parse(localStorage.getItem("allProjects") || "[]"); //  
        // console.log(allProjects)

        return allProjects;

    }

    static getNotDefaultProjects() {
        const notDefaulProjects = JSON.parse(localStorage.getItem("allProjects"));

        let thisProjects = [];

       notDefaulProjects.forEach(project => {

            if ((project.project_name != "inbox") &&
               (project.project_name != "today") && 
               (project.project_name != "this_week"))  {
                thisProjects.push(project);
               }

        });
        return thisProjects;
    }

    // initialization of the app storage
    static initStorage(inbox, today, week) {

        const allProjects = _Storage.getAllProjects();

        if (allProjects.length == 0) {

            allProjects.push(inbox, today, week);
            localStorage.setItem("allProjects", JSON.stringify(allProjects));
        }
        return;

    }

    static saveProject(project) {
    
        const allProjects = _Storage.getAllProjects();

        // console.log(allProjects);
        // console.log(allProjects.length);

        allProjects.push(project);

        localStorage.setItem("allProjects", JSON.stringify(allProjects));
    }


    static saveToDo(newTask) {

        const allProjects = _Storage.getAllProjects();

        // save todo to its project
        allProjects.forEach(element => {
                if (element.project_name == newTask.project_name) {
                    element.project_todos.push(newTask);
                }
            })

         localStorage.setItem("allProjects", JSON.stringify(allProjects));
         // console.log(newTask.project_name);
    }

    // get todos of a project
    static getProjectTodos(project_name) {

        const allProjects = _Storage.getAllProjects();
        let thisTodos = [];

        allProjects.forEach(eachArray => {
                if (project_name == "inbox" && (eachArray.project_name !== "today" && 
                    eachArray.project_name !== "this_week")) {
                    eachArray.project_todos.forEach(element => {
                        thisTodos.push(element);
                    });
                } else if (eachArray.project_name == project_name) {
                    eachArray.project_todos.forEach(element => {
                        thisTodos.push(element);
                    });
                }
        })
        
        return thisTodos;

    }

    // remove project
    static removeProject(project_name) {

        const allProjects = _Storage.getAllProjects();

        const ProjectIndex = allProjects.findIndex(element => element.project_name == project_name);
        allProjects.splice(ProjectIndex, 1);

        localStorage.setItem("allProjects", JSON.stringify(allProjects));
    }

    // update content of todo
    static updateToDoContent(id, content, project) {
        const allProjects = _Storage.getAllProjects();
        // console.log(allProjects)

        allProjects.forEach(element => {
            if (element.project_name == project) {
                element.project_todos.forEach(todo => {
                    if (todo.id == Number(id)) {
                        todo.title = content;
                    }
                });
            }
        });

        localStorage.setItem("allProjects", JSON.stringify(allProjects));
    }

    static deleteTodo(id, project_name) {
        const allProjects = _Storage.getAllProjects();

        // find project
        allProjects.forEach(eachProject => {
            if (eachProject.project_name == project_name) {
                const thisIndex = eachProject.project_todos.findIndex(eachTodo => eachTodo.id == Number(id));
                eachProject.project_todos.splice(thisIndex, 1);
            }
        })

        localStorage.setItem("allProjects", JSON.stringify(allProjects));
    }

    static updateTodoDate(id, date, project) {
        const allProjects = _Storage.getAllProjects();
        // date = format(new Date(date), 'MM/dd/yyyy');
 
        allProjects.forEach(element => {
            if (element.project_name == project) {
                element.project_todos.forEach(todo => {
                    if (todo.id == Number(id)) {
                        todo.dueDate = date;
                    }
                });
            }
        });

        localStorage.setItem("allProjects", JSON.stringify(allProjects));
    }

    static todaysTodos(){

        const allProjects = _Storage.getAllProjects();
        let thisTodos = [];

        const today = format(new Date(), 'yyyy-MM-dd');
        allProjects.forEach(eachProject => {
            eachProject.project_todos.forEach(eachTodo => {
                if (eachTodo.dueDate == today) {
                    thisTodos.push(eachTodo);
                }
            });
        });

        return thisTodos;
    }



}