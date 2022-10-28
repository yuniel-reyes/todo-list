export default class _Storage {

    static getAllProjects() {

        const allProjects = JSON.parse(localStorage.getItem("allProjects") || "[]"); //  
        // console.log(allProjects)

        return allProjects;

    }

}