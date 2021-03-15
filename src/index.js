import {displayProjects, displayProject} from "./Menu";
let todoLists = []

function removeAllChildNodes(parent) {
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

function openNav () {
    document.querySelector(".sidebar").style.width = "300px";
    menuButton.style.zIndex = -1;
}

function closeNav () {
    document.querySelector(".sidebar").style.width = "0px";
    menuButton.style.zIndex = 1;
}

// Menu buttons
const menuButton = document.querySelector(".menuButton");
const closeButton = document.querySelector(".closeBtn");
const projects = document.querySelector(".projects");
const newProject = document.querySelector(".new_project-input");
const newProjectBtn = document.querySelector(".add-btn");
// Menu events
menuButton.addEventListener("click", openNav);
closeButton.addEventListener("click", closeNav);
newProjectBtn.addEventListener("click", ()=>{
    if(newProject.value != ""){
        // add new project to todoLists
        todoLists.push(listFactory(newProject.value, "default", []));
        // add new project to local storage
        localStorage.setItem("todoLists", JSON.stringify(todoLists));
        // display new project
        displayProject(todoLists[todoLists.length-1]);
    }
})

// Todos
const todosTitle = document.querySelector(".project_title");


// List and todo factory functions
const listFactory = (name, color, todos) => {
    return { name, color,  todos };
};

const todoFactory = (title, description, dueDate, priority, checklist, notes) => {
    return { title, description, dueDate, priority, checklist, notes };
}

window.onload = function() {
    if(localStorage.todoLists){
        if(localStorage.todoLists.length > 0){
            const listsStorage = JSON.parse(localStorage.getItem("todoLists"));
            todoLists = listsStorage;
            // Load lists from storage
            projects.appendChild(displayProjects(todoLists));
            // TODO: Write logic to load todos
            // display first project name
            todosTitle.textContent = todoLists[0].name; 
        }
    } else { // Runs if books storage doesn't exist yet
        todoLists.push(listFactory("Project To Be Determined If You Can See This I Am Not Sure How", "default",[]));
        todoLists.push(listFactory("Project 2", "default", []));
        removeAllChildNodes(projects);
        projects.appendChild(displayProjects(todoLists));
        // display first project name
        todosTitle.textContent = todoLists[0].name;
    }
}