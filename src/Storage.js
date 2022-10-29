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


    

}