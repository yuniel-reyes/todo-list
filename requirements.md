todo-list: Todo list app created with HTML, CSS and JS (webpack, date-fns)
=========

# Design
> You have to create a todo-list app.  
  -> The user should be able to add todo items.   
  --> Each todo-item will have a title, a description, a dueDate, a priority, notes and a checklist.   
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
  **TIPS**:`DOM-related stuff and logics should be separated`. 
          - DOM(View): user interactions
          - Logic(Controller): 
          

## Picked design
+ Lets try to develop the app following something similar 
to the MVC pattern. There will be two more files
as part of the logic -- Storage and Projects


## Functional requirements
---------------------------  
**Logic | Controller and Model (Project + Storage): App.js and model.js files**

**App.js**
* The `App.js` file will be the controller. It will connect 
the model (model.js) witht the view (UI.js) appealing mostly to 
the _Storage class.
* The `App` class takes no arguments for its constructor. 
It will, however, instantiate an object 
of the `UI` class, passing all methods that allow
to work with the model and the localStorage API.
* The `handlers()` method will return an object
with all of the functions. This functions will be 
use to connect the model and the view, but allways
through the controller (App.js).
`createNewProjectUI()`: 
  
**model.js**
+ The `model.js` file will be the model.
+ The `ToDos` class will be the blueprint for
each todo. It will have: 
+ title
+ dueDate: fecha de vencimiento
+ a week: which week of the year 

**Projects**
+ The `Projects.js` file will contain the 
class `Project` for every default-created project
(*inbox*, *today*, *thisweek*), and future projects of the users.
+ As default projects, *inbox*, *today* and *this-week*, will 
never be deleted.
+ As instance properties, add project_name and project_todos

**_Storage**
+ The _Storage class will deal with the model and the
localStorage API. It can be seen as a kind of CRUD
implementation.  


**UX-UI (DOM)**
**UI.js** 
+ The `UI.js` file will be the view. All  buttons and event 
listeners will be added hier.
+ When the `UI` is instantiated in the `App` 
class, some components are immediately
rendered on the page. However, other components
are added using the template file of the html-webpack-pugin.   
This means that the app will have a static/fixed UI:
+ A `sidebar` to the left with:  
      a. *inbox*
      b. *today*
      c. *thisweek*
      d. *projects* - add projects button
+ And a footer
+ The three first options in the sidebar are
projects. A project is a list of todos  (see **Project**)

### Non-Functional requirements | 
1. Set css up to remove margins and make the body to take the 
available height in the page
2. Set css up to make the body a grid with 3 colums and 2 rows 

                    
*Discoveries* : 
- Span tags can be editable: contenteditable=true
- In order to render images using the the template 
option of the of the html-webpack-plugin, you have to
use: <%= require() %>. The <%=%> means this is a 
lodash template. The require() allows to call the 
specific file loader on the img(path)
- Searching for a way to organize the code
1. MVC
2. Web components
- Adding an event handler inside a class with 
a class-method as the callback can be tricky, 
as the `this` in the callback function will be
the element that fires the event:
Solution: make the object a static property
- Calling a constructor method/function from inside a static method
- Object destructuring | Destructuring assignment:
  Take the return object from the handlers method and desctructure it
- The content value of the display CSS property  

*Questions* :
- Can a module function (module pattern)
take another function or a class as an argument
- Can I return a value from an event handler function?
- How do I create functions dynamically?    
- How do I create variable names dynamically?
- Can't event object properties being copied? 
- Can list comprehensions be done in JS?  
- Does a function /method /static method has to allways return a value?


Lets implement it using the MVC pattern
Model: 
  Reponsible for getting and manipulating the data
  CRUD interaction
  Communicates with the controller
  Some say can sometimes update the View, some say it never touches

View: What the end user see(UI)
  Communicates with the controller
  Can be passed dynamic values from the controller
  Usually relies on a template engine: dynamic data
  The view never touches the model
  Event listeners are added in the view

Controller: 
  Receives input (from view, url)
  Processes request (GET POST PUT DELETEs)    
  Request/Get data through the model
  Updates de view in most cases
  Passes data to the view




