var randomColor = require('randomColor');

const createProject = (list) => {
    const project = document.createElement("span");
    project.classList.add("project");
    project.style.cursor="pointer";
    project.style.whiteSpace = "nowrap";
    const circle = document.createElement("div");
    circle.classList.add("circle");
    if(list.color == "default"){ //only sets to random color if a color has not been set
        list.color = randomColor();
        circle.style.borderColor = list.color;
    } else {
        circle.style.borderColor = list.color;
    }
    project.appendChild(circle);
    const projectName = document.createElement("p");
    projectName.classList.add("project-name");
    projectName.style.display = "inline";
    if(list.name.length < 20){
        projectName.innerText = list.name;
    } else { //adjusts the length of list name so that it will properly display
        const tempName = list.name.slice(0, 20);
        projectName.innerText = tempName + "...";
    }
    
    project.appendChild(projectName);

    return project;
}

const displayProjects = (lists) => {
    const projects = document.createElement("div");
    projects.classList.add("projects-container");
    projects.style = "max-height: 70vh; overflow-y: scroll;";
    lists.forEach(list => {
        projects.appendChild(createProject(list));
    });
    localStorage.setItem("todoLists", JSON.stringify(lists));
    return projects;
}

const displayProject = (project) => {
    const projectsContainer = document.querySelector(".projects-container");
    projectsContainer.appendChild(createProject(project));
}

export {displayProjects, displayProject}