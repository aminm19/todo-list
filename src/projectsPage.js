// projectsPage.js - Main logic for the projects page
import { createProjectsPageHTML, setupModalEventListeners, createProjectCardDOM, setupTasksModalEventListeners } from './projectsPageDOM.js';
import { add, format, formatDistanceToNow, isAfter, isBefore, parseISO, setDate } from 'date-fns';
import { createProject, loadProjectsFromLocalStorage } from './Project.js';
import { updateTaskCount } from './tasksPageDOM.js';


// // Calculate dates manually to avoid timezone issues
// const todayDate = new Date();
// const todayStr = String(todayDate.getMonth() + 1).padStart(2, '0') + '-' + 
//     String(todayDate.getDate()).padStart(2, '0') + '-' + 
//     todayDate.getFullYear();

// const yesterdayDate = new Date();
// yesterdayDate.setDate(yesterdayDate.getDate() - 1);
// const yesterdayStr = String(yesterdayDate.getMonth() + 1).padStart(2, '0') + '-' + 
//     String(yesterdayDate.getDate()).padStart(2, '0') + '-' + 
//     yesterdayDate.getFullYear();

// const futureDate = new Date();
// futureDate.setDate(futureDate.getDate() + 3);
// const futureStr = String(futureDate.getMonth() + 1).padStart(2, '0') + '-' + 
//     String(futureDate.getDate()).padStart(2, '0') + '-' + 
//     futureDate.getFullYear();

// let today = todayStr;
// let yesterday = yesterdayStr;
// let future = futureStr;
// let testProjects = [
//     {
//         id: 1,
//         title: "Website Redesign",
//         description: "Complete overhaul of company website with modern design and improved UX",
//         color: "#667eea",
//         tasks: [],
//         dueDate: today
//     },
//     {
//         id: 2,
//         title: "Mobile App Development", 
//         description: "Native iOS and Android app for task management",
//         color: "#f093fb",
//         tasks: [],
//         dueDate: yesterday // 1 day ago
//     },
//     {
//         id: 3,
//         title: "Marketing Campaign",
//         description: "Q2 digital marketing strategy and implementation", 
//         color: "#48cae4",
//         tasks: [],
//         dueDate: future // 3 days from now
//     }
// ];

export function loadProjectsPage() {
    // Get the HTML and append it to the body
    const htmlContent = createProjectsPageHTML();
    document.body.innerHTML = htmlContent;
    
    // for(const project of testProjects) {
    //     //createProjectCardDOM(project);
    //     //createProject(project.title, project.description, project.color, project.tasks.length, project.dueDate);
    // }

    // Load user projects from localStorage
    const storedProjects = loadProjectsFromLocalStorage();
    for (const project of storedProjects) {
        createProjectCardDOM(project);
    }
    updateTaskCount();
    setupModalEventListeners();
    setupTasksModalEventListeners();
}