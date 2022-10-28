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
    

}