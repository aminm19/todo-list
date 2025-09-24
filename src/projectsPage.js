// projectsPage.js - Main logic for the projects page
import { createProjectsPageHTML, setupModalEventListeners } from './projectsPageDOM.js';
import { format, formatDistanceToNow, isAfter, isBefore, parseISO } from 'date-fns';

let projects = [
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
    
    for(const project of projects) {
        // TODO implementation of addProjectCard
        // addProjectCard(project);
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