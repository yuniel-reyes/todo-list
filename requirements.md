# todo-list

Todo list app created with HTML, CSS and JS

#### Design
> You have to create a todo-list app.  
  -> The user should be able to add todo items.   
  --> Each todo-item will have a title, a description, a dueDate, 
      a priority, notes and a checklist.   
  -> The app should allow the users to add projects. 
     Projects are list of todo-items.  
  -> When an user opens the app, there should be a 'default' 
     project to which all the todos are put (inbox). Users should be able. 
    to create new projects and choose which project their todos go into.  
  **App logic**: app should allow:    
  --> creation of new todos, 
  --> setting todos as complete, 
  --> changing priority, etc.) 
  **UX-UI**: Users should be able to:   
  --> view all projects  
  --> view all todos in each project (title, duedate, changing color 
      for priority)  
  --> expand a single todo to see/edit the details  
  --> delete a todo  
  **TIPS**: `DOM-related stuff and logics should be separated`. 
          - DOM(View): user interactions
          - Logic(Controller): 

          


### Components(any component implementation will have the logic and the UX-UI parts) 
1. Add new task (todo)

### Functional requirements  
**Logic**
1. Add new task
The core of the project is how todo-items are going to be designed:  
    a. Possible data implementations: (clasess, arrays)
    - Classes: todo-items
        - option to check todo as completed 
        - title
        - description
        - dueDate: fecha de vencimiento
        - priority
        - notes/checklist  


**UX-UI (DOM)** 
1. Add new task
    - create a div for button component
    - add event listener to the button
    - when button is clicked:
      - remove button container 
      - add new todo-item
    - when new todo-item lose focus:
      - check if item is empty
      - if empty
       - remove item
       - add button

The app will have a static/fixed UI
 - A sidebar to the left with:  
    a. *inbox* : 
      - When a user opens the app, the inbox
       (default project) will appear as selected. 
        So it will be like the home.
      - Here will be rendered all todos from memory  
      `TODO`: 
        - create `inbox()`:
         - This function will be called a) when the 
          user opens the app, b) when the user clicks
          on *inbox*. 
         - So, add event listener to *inbox* div:
           - check if open app or comming from
             another tab. If open app, the event object
             will be undefined(no click).
             Comming from another tab:
              -  remove selected class from any other tab/div
             And:
              - toggle the selected class for the inbox
              div.
              - toggle the visible value for inbox visibility
              - check if todos in memory (see localstorage)
              - render todos from memory if any
              - render `newToDoBtn()`
              - call `updateStatus()`

 
    b. *today*
    c. *thisweek*
    d. *projects* - add projects button
 - A footer



### Non-Functional requirements | 
1. Set css up to remove margins and make the body to take the 
available height in the page
2. Set css up to make the body a grid with 3 colums and 2 rows 

                    
*Discoveries* : 
 - Span tags can be editable: contanteditable=true
 - In order to render images using the the template 
   option of the of the html-webpack-plugin, you have to
   use: <%= require() %>. The <%=%> means this is a 
   lodash template. The require() allows to call the 
   specific file loader on the img(path)
 - Searching for a way to organize the code
   1. MVC
   2. Web components  
*Questions* :
  - Can a module function (module pattern)
    take another function or a class as an argument 


Lets implement it using the MVC pattern
Model: Reponsible for getting and manipulating the data
       CRUD interaction
       Communicates with the controller
       Some say can sometimes update the View, some say it never touches

View: What the end user see(UI)
      Commnicates with the controller
      Can be passed dynamic values from the controller
      Usually relies on a template engine: dynamic data
      The view never touches the model

Controller: Receives input (from view, url)
            Processes request (GET POST PUT DELETEs)    
            Request/Get data through the model
            Updates de view in most cases
            Passes data to the view
 



