// projectsPage.js - Main logic for the projects page
import { createProjectsPageHTML, setupModalEventListeners, createProjectCardDOM } from './projectsPageDOM.js';
import { format, formatDistanceToNow, isAfter, isBefore, parseISO } from 'date-fns';

let projects = [];
let testProjects = [
    {
        id: 1,
        title: "Website Redesign",
        description: "Complete overhaul of company website with modern design and improved UX",
        color: "#667eea",
        tasks: 8,
        completedTasks: 5,
        dueDate: "2025-03-15"
    },
    {
        id: 2,
        title: "Mobile App Development", 
        description: "Native iOS and Android app for task management",
        color: "#f093fb",
        tasks: 15,
        completedTasks: 4,
        dueDate: "2025-04-20"
    },
    {
        id: 3,
        title: "Marketing Campaign",
        description: "Q2 digital marketing strategy and implementation", 
        color: "#48cae4",
        tasks: 6,
        completedTasks: 5,
        dueDate: "2025-05-01"
    }
];

export function loadProjectsPage() {
    // Get the HTML and append it to the body
    const htmlContent = createProjectsPageHTML();
    document.body.innerHTML = htmlContent;
    
    for(const project of testProjects) {
        // TODO implementation of addProjectCard
        createProject(project.title, project.description, project.color, project.tasks, project.completedTasks, project.dueDate);
    }
    setupModalEventListeners();
}


class Project {
    constructor(id, title, description, color, tasks, completedTasks, dueDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.color = color;
        this.tasks = tasks;
        this.completedTasks = completedTasks;
        this.dueDate = dueDate;
    }

    setID(id) {
        this.id = id;
    }
    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }
    setTitle(title) {
        this.title = title;
    }
    setDescription(description) {
        this.description = description;
    }
    setColor(color) {
        this.color = color;
    }
    setTasks(tasks) {
        this.tasks = tasks;
    }
    setCompletedTasks(completedTasks) {
        this.completedTasks = completedTasks;
    }

    getID() {
        return this.id;
    }
    getDueDate() {
        return this.dueDate;
    }
    getTitle() {
        return this.title;
    }
    getDescription() {
        return this.description;
    }
    getColor() {
        return this.color;
    }
    getTasks() {
        return this.tasks;
    }
    getCompletedTasks() {
        return this.completedTasks;
    }
    getProgress() {
        return this.tasks === 0 ? 0 : (this.completedTasks / this.tasks) * 100;
    }
}

export function createProject(title, description, color, tasks, completedTasks, dueDate) {
    const id = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    const newProject = new Project(id, title, description, color, tasks, completedTasks, dueDate);
    projects.push(newProject);
    createProjectCardDOM(newProject);
    return newProject;
}

export function getProjectById(id) {
    return projects.find(project => project.id === id);
}

export function updateProject(id, updatedFields) {
    const project = getProjectById(id);
    if (project) {
        Object.keys(updatedFields).forEach(field => {
            if (field in project) {
                project[field] = updatedFields[field];
            }
        });
    }
    return project;
}

export function deleteProject(id) {
    projects = projects.filter(project => project.id !== id);
    console.log(projects);
}

export function getAllProjects() {
    return projects;
}