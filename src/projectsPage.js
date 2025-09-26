// projectsPage.js - Main logic for the projects page
import { createProjectsPageHTML, setupModalEventListeners, createProjectCardDOM, setupTasksModalEventListeners } from './projectsPageDOM.js';
import { format, formatDistanceToNow, isAfter, isBefore, parseISO } from 'date-fns';
import { createProject } from './Project.js';

let testProjects = [
    {
        id: 1,
        title: "Website Redesign",
        description: "Complete overhaul of company website with modern design and improved UX",
        color: "#667eea",
        tasks: [],
        dueDate: "2025-03-15"
    },
    {
        id: 2,
        title: "Mobile App Development", 
        description: "Native iOS and Android app for task management",
        color: "#f093fb",
        tasks: [],
        dueDate: "2025-04-20"
    },
    {
        id: 3,
        title: "Marketing Campaign",
        description: "Q2 digital marketing strategy and implementation", 
        color: "#48cae4",
        tasks: [],
        dueDate: "2025-05-01"
    }
];

export function loadProjectsPage() {
    // Get the HTML and append it to the body
    const htmlContent = createProjectsPageHTML();
    document.body.innerHTML = htmlContent;
    
    for(const project of testProjects) {
        // TODO implementation of addProjectCard
        createProject(project.title, project.description, project.color, project.tasks.length, project.dueDate);
    }
    setupModalEventListeners();
}