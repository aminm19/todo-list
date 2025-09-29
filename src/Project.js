import { createProjectCardDOM } from './projectsPageDOM.js';
import { format, parseISO, formatDistance } from 'date-fns';

let projects = [];

export function getProjectsLength() {
    return projects.length;
}

class Project {
    constructor(id, title, description, color, taskCount = 0, dueDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.color = color;
        this.taskCount = taskCount; // Keep the number for backward compatibility
        this.tasks = []; // Initialize as empty array for task objects
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
    addTask(Task) {
        this.tasks.push(Task);
    }
    removeTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
    setTasks(tasks) {
        if (Array.isArray(tasks)) {
            this.tasks = tasks;
        } else {
            this.taskCount = tasks; // If it's a number, store as taskCount
        }
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
        return this.tasks; // Returns the array of task objects
    }
    getTaskCount() {
        return this.taskCount; // Returns the number for display
    }
    getCompletedTasks() {
        return this.tasks.filter(task => task.isCompleted && task.isCompleted()).length;
    }
    getProgress() {
        if (this.tasks.length === 0) return 0;
        return (this.getCompletedTasks() / this.tasks.length) * 100;
    }
}

export function createProject(title, description, color, taskCount, dueDate) {
    const id = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    const newProject = new Project(id, title, description, color, taskCount, dueDate);
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
}

export function getAllProjects() {
    return projects;
}

export function addTaskToProject(projectId, task) {
    const project = getProjectById(projectId);
    if (project) {
        project.addTask(task);
    }
}

export function removeTaskFromProject(projectId, taskId) {
    const project = getProjectById(projectId);
    if (project) {
        project.removeTask(taskId);
    }
}

export function isOverdue(project) {
    if (!project.dueDate) return false;
    const due = new Date(project.dueDate);
    const now = new Date();
    return due < now;
}

export function formatDueDate(dueDate) {
    if (!dueDate) return "No due date";
    
    // Parse date in local timezone to avoid UTC conversion issues
    let date;
    if (typeof dueDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
        // YYYY-MM-DD format
        const [year, month, day] = dueDate.split('-').map(Number);
        date = new Date(year, month - 1, day); // month is 0-based, creates local midnight
    } else if (typeof dueDate === 'string' && /^\d{2}-\d{2}-\d{4}$/.test(dueDate)) {
        // MM-dd-yyyy format
        const [month, day, year] = dueDate.split('-').map(Number);
        date = new Date(year, month - 1, day); // month is 0-based, creates local midnight
    } else {
        date = new Date(dueDate);
    }
    
    // Create "now" at midnight for proper comparison
    const now = new Date();
    const nowAtMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Check if date is valid before formatting
    if (isNaN(date.getTime())) {
        return "No Deadline";
    }
    
    let dateStr = format(date, 'yyyy-MM-dd');
    let nowStr = format(nowAtMidnight, 'yyyy-MM-dd');

    if (dateStr === nowStr) {
        return "Due today!";
    }
    if (date < nowAtMidnight) {
        return `Overdue by ${formatDistance(date, nowAtMidnight)}`;
    } else {
        return `Due in ${formatDistance(nowAtMidnight, date)}`;
    }
} 