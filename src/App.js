import UI from './UI.js';
import Model from './model.js'

export default class App {
    constructor(root){
        this.ui = new UI(root, this.handlers);
        this.model = new Model();
    }

    handlers() {
        return {
            addTask: this.model.addTodos,

        }
    }

}



