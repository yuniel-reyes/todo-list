export default class _Storage {

    static getAllProjects() {

        const allProjects = JSON.parse(localStorage.getItem("allProjects") || "[]"); //  
        // console.log(allProjects)

        return allProjects;

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
        // console.log(allProjects)

        allProjects.forEach(eachArray => {
                if (project_name == "inbox" && (eachArray.project_name !== "today" && 
                    eachArray.project_name !== "this_week")) {
                    eachArray.project_todos.forEach(element => {
                        thisTodos.push(element);
                    });
                } else if (eachArray.project_name == project_name) {
                    thisTodos.push(project_todos);
                }
        })

        return thisTodos;

    }




    

}