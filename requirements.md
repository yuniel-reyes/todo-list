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
 a. inbox
 b. today
 c. thisweek
 d. projects
 e. add projects button



### Non-Functional requirements | 
1. Set css up to remove margins and make the body to take the 
available height in the page
2. Set css up to make the body a grid with 3 colums and 2 rows 

                    
*Discoveries*: 
 - Span tags can be editable: contanteditable=true



