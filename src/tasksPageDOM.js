import { updateProjectProgress } from './projectsPageDOM.js';
import { deleteTask, getTasksByProject } from './Task.js';

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
    });
    taskItem.appendChild(deleteBtn);

    tasksList.appendChild(taskItem);
    updateProjectProgress(); // Update project progress bar
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
}