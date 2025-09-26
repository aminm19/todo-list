import { add } from 'date-fns';
import { getProjectById, getAllProjects } from './Project.js';
import { addTaskToDOM } from './tasksPageDOM.js';

export function createTask(projectId, title, description, completed = false) {
    const project = getProjectById(projectId);
    if (!project) {
        console.error('Project not found with ID:', projectId);
        return null;
    }
    
    // Generate unique ID - use timestamp + random to avoid collisions
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const newTask = new Task(id, title, description, completed, projectId);
    
    // Add to the project's tasks array
    project.tasks.push(newTask);
    console.log(project.tasks);
    
    // Update project task count
    project.taskCount = project.tasks.length;
    
    addTaskToDOM(newTask);
    return newTask;
}

export function getTasksByProject(projectId) {
    const project = getProjectById(projectId);
    return project ? project.tasks : [];
}

export function getAllTasks() {
    const allProjects = getAllProjects();
    return allProjects.flatMap(project => project.tasks);
}

export function deleteTask(projectId, taskId) {
    const project = getProjectById(projectId);
    if (project) {
        console.log('Before deletion:', project.tasks.map(t => ({id: t.id, title: t.title})));
        const initialLength = project.tasks.length;
        project.tasks = project.tasks.filter(task => task.id !== taskId);
        project.taskCount = project.tasks.length;
        console.log('After deletion:', project.tasks.map(t => ({id: t.id, title: t.title})));
        console.log(`Deleted ${initialLength - project.tasks.length} task(s)`);
        return true;
    }
    return false;
}

class Task {
    constructor(id, title, description, completed = false, projectId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.projectId = projectId; // Link to parent project
        this.createdAt = new Date().toISOString();
    }

    setID(id) {
        this.id = id;
    }
    setTitle(title) {
        this.title = title;
    }
    setDescription(description) {
        this.description = description;
    }
    setCompleted(completed) {
        this.completed = completed;
    }

    getID() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getDescription() {
        return this.description;
    }
    isCompleted() {
        return this.completed;
    }
}

function getTotalTasks() {
    const allProjects = getAllProjects();
    return allProjects.reduce((sum, project) => sum + project.tasks.length, 0);
}

function getCompletedTasks() {
    const allProjects = getAllProjects();
    return allProjects.reduce((sum, project) => 
        sum + project.tasks.filter(task => task.completed).length, 0);
}

function getPendingTasks() {
    const allProjects = getAllProjects();
    return allProjects.reduce((sum, project) => 
        sum + project.tasks.filter(task => !task.completed).length, 0);
}

export { getTotalTasks, getCompletedTasks, getPendingTasks };
