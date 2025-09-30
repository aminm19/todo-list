import { updateProjectProgress, updateTasksBtn } from './projectsPageDOM.js';
import { deleteTask, getCompletedTasks, getTasksByProject, getTotalTasks, getID } from './Task.js';
import { saveProjectsToLocalStorage } from './Project.js';

export function refreshTasksList(projectId) {
    const tasksList = document.querySelector('.tasks-list');
    if (!tasksList) return;
    
    // Clear existing tasks from DOM
    tasksList.innerHTML = '';
    
    // Get current tasks for this project
    const tasks = getTasksByProject(projectId);
    console.log('Refreshing task list for project', projectId, 'with', tasks.length, 'tasks');
    
    // Add each task to DOM
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
}

export function addTaskToDOM(task) {
    const tasksList = document.querySelector('.tasks-list');
    if (!tasksList) return;

    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.setAttribute('data-task-id', task.getID());

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    checkbox.checked = task.isCompleted();
    checkbox.addEventListener('change', () => {
        task.setCompleted(checkbox.checked);
        updateStatus(task.getID());
        // Save changes to localStorage
        saveProjectsToLocalStorage();
    });
    taskItem.appendChild(checkbox);

    const title = document.createElement('h4');
    title.textContent = task.getTitle();
    title.classList.add('task-title');
    taskItem.appendChild(title);

    const description = document.createElement('p');
    description.textContent = task.getDescription();
    description.classList.add('task-description');
    taskItem.appendChild(description);

    const status = document.createElement('p');
    status.textContent = `Status: ${task.isCompleted() ? 'Completed!' : 'Pending'}`;
    status.classList.add('task-status');
    taskItem.appendChild(status);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-task-btn');
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.addEventListener('click', () => {
        const projectId = task.projectId;
        const taskId = task.getID();
        if (deleteTask(projectId, taskId)) {
            taskItem.remove();
        } else {
            alert('Failed to delete task.');
        }
        updateProjectProgress(); // Update project progress bar
        updateTaskCount();
        updateTasksBtn(); // Update tasks button state
    });
    taskItem.appendChild(deleteBtn);

    tasksList.appendChild(taskItem);
    updateProjectProgress(); // Update project progress bar
    updateTaskCount();
    updateTasksBtn(); // Update tasks button state
}

function updateStatus(taskId) {
    const tasks = document.querySelectorAll('.task-item');
    tasks.forEach(taskItem => {
        if (parseInt(taskItem.getAttribute('data-task-id')) === taskId) {
            const status = taskItem.querySelector('p:nth-of-type(2)');
            const checkbox = taskItem.querySelector('input[type="checkbox"]');
            status.textContent = `Status: ${checkbox.checked ? 'Completed!' : 'Pending'}`;
        }
    });
    updateProjectProgress(); // Update project progress bar
    updateTaskCount(); // Update total task counts at top of page
    updateTasksBtn(); // Update tasks button state on each project card to show number of tasks
}

export function updateTaskCount() {
    const totalTasks = getTotalTasks();
    const completedTasks = getCompletedTasks();
    const completedCountElem = document.getElementById('completed-tasks-count');
    const pendingTasks = totalTasks - completedTasks;
    const pendingCountElem = document.getElementById('pending-tasks-count');
    if (pendingCountElem) {
        pendingCountElem.textContent = pendingTasks;
    }
    if (completedCountElem) {
        completedCountElem.textContent = completedTasks;
    }
}

