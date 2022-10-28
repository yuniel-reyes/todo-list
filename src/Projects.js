export default class Project {

    // lets store projects here for now
    static projects = [];

    constructor(project_name) {
        this.project_name = project_name;
        this.project_todos = [];
    }
}
