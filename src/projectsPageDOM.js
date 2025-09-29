// projectsPageDOM.js - DOM manipulation for the projects page
import { format, formatDistanceToNow, isAfter, isBefore, parseISO, set } from 'date-fns';
import { deleteProject, getProjectsLength, createProject, getProjectById, updateProject } from './Project.js';
import { createTask } from './Task.js';
import { refreshTasksList, updateTaskCount } from './tasksPageDOM.js';

export function createProjectsPageHTML() {
    return `<div class="app-container">
            <!-- Header Section -->
            <header class="app-header">
                <div class="header-content">
                    <div class="app-title">
                        <i class="fas fa-clipboard-check"></i>
                        <h1>My Projects</h1>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-primary new-project-btn">
                            <i class="fas fa-plus"></i>
                            New Project
                        </button>
                        <button class="btn btn-secondary settings-btn">
                            <i class="fas fa-cog"></i>
                        </button>
                    </div>
                </div>
            </header>

            <!-- Main Content -->
            <main class="main-content">
                <!-- Stats Overview -->
                <section class="stats-overview">
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-tasks"></i>
                            </div>
                            <div class="stat-content">
                                <h3 id="active-projects-count">${getProjectsLength()}</h3>
                                <p>Active Projects</p>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div class="stat-content">
                                <h3 id="completed-tasks-count">0</h3>
                                <p>Completed Tasks</p>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="stat-content">
                                <h3 id="pending-tasks-count">0</h3>
                                <p>Pending Tasks</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Projects Grid -->
                <section class="projects-section">
                    <div class="section-header">
                        <h2>Your Projects</h2>
                        <div class="view-controls">
                            <button class="view-btn active" data-view="grid">
                                <i class="fas fa-th-large"></i>
                            </button>
                            <button class="view-btn" data-view="list">
                                <i class="fas fa-list"></i>
                            </button>
                        </div>
                    </div>

                    <div class="projects-grid" id="projects-container">
                        <!-- Projects will be dynamically inserted here -->
                        
                        <!-- Add New Project Card -->
                        <div class="project-card new-project-card">
                            <div class="new-project-content">
                                <div class="plus-icon">
                                    <button class="new-project-btn" type="button">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                                <h3>Create New Project</h3>
                                <p>Start organizing your tasks</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>

        <!-- Modal for New Project -->
        <div class="modal-overlay" id="new-project-modal">
            <div class="modal">
                <div class="modal-header">
                    <h2>Create New Project</h2>
                    <button class="close-btn" type="button">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-content">
                    <form class="new-project-form" id="new-project-form">
                        <div class="form-group">
                            <label for="project-name">Project Name</label>
                            <input type="text" id="project-name" name="name" placeholder="Enter project name" required>
                        </div>
                        <div class="form-group">
                            <label for="project-description">Description</label>
                            <textarea id="project-description" name="description" placeholder="Brief description of your project"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="project-color">Color Theme</label>
                            <div class="color-picker">
                                <input type="color" id="project-color" name="color" value="#667eea">
                                <div class="color-presets">
                                    <button type="button" class="color-preset" style="background-color: #667eea;" data-color="#667eea"></button>
                                    <button type="button" class="color-preset" style="background-color: #f093fb;" data-color="#f093fb"></button>
                                    <button type="button" class="color-preset" style="background-color: #48cae4;" data-color="#48cae4"></button>
                                    <button type="button" class="color-preset" style="background-color: #ffd166;" data-color="#ffd166"></button>
                                    <button type="button" class="color-preset" style="background-color: #06ffa5;" data-color="#06ffa5"></button>
                                    <button type="button" class="color-preset" style="background-color: #ff6b6b;" data-color="#ff6b6b"></button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="project-deadline">Deadline (Optional)</label>
                            <input type="date" id="project-deadline" name="deadline">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary cancel-btn">Cancel</button>
                    <button type="submit" class="btn btn-primary create-btn" form="new-project-form">Create Project</button>
                </div>
            </div>
        </div>
        <!-- Modal for tasks list -->
        <div class="modal-overlay" id="tasks-modal">
            <div class="modal">
                <div class="modal-header">
                    <h2>Tasks</h2>
                    <button class="tasks-close-btn" type="button">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="tasks-container">
                    <div class="tasks-list">
                        <!-- Tasks will be dynamically inserted here -->
                    </div>
                </div>
                <div class="modal-content">
                    <form class="new-task-form" id="new-task-form">
                        <div class="form-group">
                            <label for="task-title">Task Title</label>
                            <input type="text" id="task-title" name="title" placeholder="Enter task title" required>
                        </div>
                        <div class="form-group">
                            <label for="task-description">Description</label>
                            <textarea id="task-description" name="description" placeholder="Brief description of your task"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary tasks-cancel-btn">Cancel</button>
                    <button type="submit" class="btn btn-primary create-btn" form="new-task-form">Create Task</button>
                </div>
            </div>
        </div>
        <!-- Modal for editing project -->
        <div class="modal-overlay" id="edit-modal-overlay">
            <div class="modal">
                <div class="modal-header">
                    <h2>Edit Project</h2>
                    <button class="edit-close-btn" type="button">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-content">
                    <form class="edit-project-form" id="edit-project-form">
                        <div class="form-group">
                            <label for="project-name">Project Name</label>
                            <input type="text" id="project-name" name="name" placeholder="Enter project name" required>
                        </div>
                        <div class="form-group">
                            <label for="project-description">Description</label>
                            <textarea id="project-description" name="description" placeholder="Brief description of your project"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="project-color">Color Theme</label>
                            <div class="color-picker">
                                <input type="color" id="project-color" name="color" value="#667eea">
                                <div class="color-presets">
                                    <button type="button" class="color-preset" style="background-color: #667eea;" data-color="#667eea"></button>
                                    <button type="button" class="color-preset" style="background-color: #f093fb;" data-color="#f093fb"></button>
                                    <button type="button" class="color-preset" style="background-color: #48cae4;" data-color="#48cae4"></button>
                                    <button type="button" class="color-preset" style="background-color: #ffd166;" data-color="#ffd166"></button>
                                    <button type="button" class="color-preset" style="background-color: #06ffa5;" data-color="#06ffa5"></button>
                                    <button type="button" class="color-preset" style="background-color: #ff6b6b;" data-color="#ff6b6b"></button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="project-deadline">Deadline (Optional)</label>
                            <input type="date" id="project-deadline" name="deadline">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary edit-cancel-btn">Cancel</button>
                    <button type="submit" class="btn btn-primary save-btn" form="edit-project-form">Save Changes</button>
                </div>
            </div>
        </div>
    `;
}

export function setupModalEventListeners() {
    // Open modal
    const newProjectBtn = document.querySelector('.new-project-btn');
    if (newProjectBtn) {
        newProjectBtn.addEventListener('click', () => {
            const modal = document.getElementById('new-project-modal');
            if (modal) {
                modal.classList.add('active');
            }
        });
    }
    
    // Open modal
    const newProjectCard = document.querySelector('.new-project-card');
    if (newProjectCard) {
        newProjectCard.addEventListener('click', () => {
            const modal = document.getElementById('new-project-modal');
            if (modal) {
                modal.classList.add('active');
            }
        });
    }

    // Close modal
    const closeModal = () => {
        const modal = document.getElementById('new-project-modal');
        if (modal) {
            modal.classList.remove('active');
            
            // Clear the form when modal closes
            const form = document.getElementById('new-project-form');
            if (form) {
                form.reset();
                
                // Reset color presets active state
                const colorPresets = document.querySelectorAll('.color-preset');
                colorPresets.forEach(preset => preset.classList.remove('active'));
                
                // Reset color input to default
                const colorInput = document.getElementById('project-color');
                if (colorInput) {
                    colorInput.value = '#667eea';
                }
            }
        }
    };
    
    // Close button
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Cancel button
    const cancelBtn = document.querySelector('.cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('new-project-modal');
            if (modal && modal.classList.contains('active')) {
                closeModal();
            }
        }
    });
    
    // Form submission
    const form = document.getElementById('new-project-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const name = formData.get('name');
            const description = formData.get('description');
            const color = formData.get('color') || '#667eea';
            const deadline = formData.get('deadline');
            createProject(name, description, color, 0, deadline);
            updateProjectsCount();
            closeModal();
        });
    }
    
    // Color preset selection
    const colorPresets = document.querySelectorAll('.color-preset');
    colorPresets.forEach(preset => {
        preset.addEventListener('click', (e) => {
            const color = e.target.dataset.color;
            const colorInput = document.getElementById('project-color');
            if (colorInput) {
                colorInput.value = color;
            }
            
            // Update active state
            colorPresets.forEach(p => p.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    // Edit Modal Event Listeners
    const editCloseBtn = document.querySelector('.edit-close-btn');
    if (editCloseBtn) {
        editCloseBtn.addEventListener('click', closeEditModal);
    }
    
    const editCancelBtn = document.querySelector('.edit-cancel-btn');
    if (editCancelBtn) {
        editCancelBtn.addEventListener('click', closeEditModal);
    }

    const editColorPresets = document.querySelectorAll('#edit-modal-overlay .color-preset');
    editColorPresets.forEach(preset => {
        preset.addEventListener('click', (e) => {
            const color = e.target.dataset.color;
            const colorInput = document.querySelector('#edit-modal-overlay #project-color');
            if (colorInput) {
                colorInput.value = color;
            }
            
            // Update active state
            editColorPresets.forEach(p => p.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
}

export function setupTasksModalEventListeners() {
    // Close tasks modal
    const closeTasksModal = () => {
        const tasksModal = document.getElementById('tasks-modal');
        const form = document.getElementById('new-task-form');
        if (form) {
            form.reset();
        }
        if (tasksModal) {
            tasksModal.classList.remove('active');
        }
    };
    const closeBtn = document.querySelector('.tasks-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeTasksModal);
    }
    const cancelBtn = document.querySelector('.tasks-cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeTasksModal);
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const tasksModal = document.getElementById('tasks-modal');
            if (tasksModal && tasksModal.classList.contains('active')) {
                closeTasksModal();
            }
        }
    });
    // Form submission for new task
    const form = document.getElementById('new-task-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const title = formData.get('title');
            const description = formData.get('description');
            createTask(currentProjectId, title, description);
            console.log('New Task:', { title, description });
            form.reset();
        });
    }
}

let currentProjectId = null; // Store the current project ID

export function openTasksModal(projectId) {
    currentProjectId = projectId; // Store which project's tasks we're managing
    const tasksModal = document.getElementById('tasks-modal');
    tasksModal.classList.add('active');
    
    // Refresh the tasks list to show current tasks only
    refreshTasksList(projectId);
}

export function createProjectCardDOM(project) {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) {
        console.error('Projects container not found');
        return;
    }

    if (!project) {
        console.error('Project object is null');
        return;
    }

    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    projectCard.setAttribute('data-project-id', project.getID()); // Add project ID attribute
    projectCard.style.borderTop = `5px solid ${project.getColor()}`;

    projectCard.innerHTML = `
        <div class="project-card-header">
            <h3>${project.getTitle()}</h3>
            <div class="project-actions">
                <button class="btn btn-icon edit-btn" title="Edit Project">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-icon delete-btn" title="Delete Project">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
        <p class="project-description">${project.getDescription() || 'No description provided.'}</p>
        <div class="project-progress">
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${project.getProgress()}%; background-color: ${project.getColor()};"></div>
            </div>
            <span>${Math.round(project.getProgress())}% Complete</span>
        </div>
        <div class="project-footer">
            <span class="due-date">
                <i class="fas fa-calendar-alt"></i>
                ${project.getDueDate() ? `Due: ${project.getDueDate()}` : 'No deadline'}
            </span>
            <span class="task-count">
                <button class="tasks-btn">
                    <i class="fas fa-tasks"></i>
                    <span class="tasks-count">${project.getTasks()}</span>Tasks
                </button>
            </span>
        </div>
    `;

    // Insert the new project card before the "New Project" card
    const newProjectCard = document.querySelector('.new-project-card');
    if (newProjectCard) {
        projectsContainer.insertBefore(projectCard, newProjectCard);
    } else {
        projectsContainer.appendChild(projectCard);
    }

    // Add event listeners for edit and delete buttons
    const editBtn = projectCard.querySelector('.edit-btn');
    const deleteBtn = projectCard.querySelector('.delete-btn');
    const tasksBtn = projectCard.querySelector('.tasks-btn');

    if (editBtn) {
        editBtn.addEventListener('click', () => {
            console.log(`Edit project ID: ${project.getID()}`);
            openEditProjectModal(project.getID());
            // updateCard(project.getID());
        });
    }

    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            console.log(`Delete project ID: ${project.getID()}`);
            projectsContainer.removeChild(projectCard);
            deleteProject(project.getID());
            updateProjectsCount();
            updateTasksBtn(); // Update tasks button state
            updateTaskCount(); // Update task count in stats
        });
    }

    if (tasksBtn) {
        tasksBtn.addEventListener('click', () => {
            openTasksModal(project.getID());
        });
    }
    updateProjectsCount();
}

export function updateProjectsCount() {
    const num = document.getElementById('active-projects-count');
    const projectCount = getProjectsLength();
    num.textContent = projectCount;
}

export function updateProjectProgress() {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(card => {
        const projectId = parseInt(card.getAttribute('data-project-id'));
        const project = getProjectById(projectId);
        if (project) {
            const progressFill = card.querySelector('.progress-fill');
            const progressText = card.querySelector('.project-progress span');
            if (progressFill && progressText) {
                const progress = Math.round(project.getProgress());
                progressFill.style.width = `${progress}%`;
                progressFill.style.backgroundColor = project.getColor(); // Ensure color is updated too
                progressText.textContent = `${progress}% Complete`;
            }
        }
    });
}

export function updateTasksBtn() {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(card => {
        const projectId = parseInt(card.getAttribute('data-project-id'));
        const project = getProjectById(projectId);
        if (project) {
            const tasksCountElem = card.querySelector('.tasks-count');
            if (tasksCountElem) {
                tasksCountElem.textContent = project.getTasks().length;
            }
        }
    });
}

export function openEditProjectModal(projectId) {
    const project = getProjectById(projectId);
    if (!project) {
        console.error('Project not found for editing');
        return;
    }

    const modal = document.getElementById('edit-modal-overlay');
    console.log('Edit modal element:', modal);
    if (modal) {
        modal.classList.add('active');

        // Populate form with existing project data
        const form = document.getElementById('edit-project-form');
        if (form) {
            form.elements['name'].value = project.getTitle();
            form.elements['description'].value = project.getDescription();
            form.elements['color'].value = project.getColor();
            form.elements['deadline'].value = project.getDueDate() || '';

            // Update color presets active state
            const colorPresets = document.querySelectorAll('.color-preset');
            colorPresets.forEach(preset => {
                if (preset.dataset.color === project.getColor()) {
                    preset.classList.add('active');
                } else {
                    preset.classList.remove('active');
                }
            });
        }
        // Update form submission to handle editing
        form.onsubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const name = formData.get('name');
            const description = formData.get('description');
            const color = formData.get('color') || '#667eea';
            const deadline = formData.get('deadline');

            // Update project details
            project.setTitle(name);
            project.setDescription(description);
            project.setColor(color);
            project.setDueDate(deadline);

            // // Update the project card in the DOM
            updateCard(projectId);

            // Close modal
            modal.classList.remove('active');
            form.reset();
            form.onsubmit = null; // Reset to prevent handler buildup
        };
    }
}
export function closeEditModal() {
    const modal = document.getElementById('edit-modal-overlay');
    if (modal) {
        modal.classList.remove('active');

        // Clear the form when modal closes
        const form = document.getElementById('edit-project-form');
        if (form) {
            form.reset();

            // Reset color presets active state
            const colorPresets = document.querySelectorAll('.color-preset');
            colorPresets.forEach(preset => preset.classList.remove('active'));

            // Reset color input to default
            const colorInput = document.getElementById('project-color');
            if (colorInput) {
                colorInput.value = '#667eea';
            }
        }
    }
}

function updateCard(projectId) {
    const project = getProjectById(projectId);
    if (!project) {
        console.error('Project not found for updating card');
        return;
    }

    const projectCard = document.querySelector(`.project-card[data-project-id="${projectId}"]`);
    if (!projectCard) {
        console.error('Project card not found for updating');
        return;
    }

    // Update the project card content
    projectCard.querySelector('h3').textContent = project.getTitle();
    projectCard.querySelector('.project-description').textContent = project.getDescription() || 'No description provided.';
    projectCard.querySelector('.due-date').textContent = project.getDueDate() ? `Due: ${project.getDueDate()}` : 'No deadline';
    projectCard.style.borderTop = `5px solid ${project.getColor()}`;
    const tasksCountElem = projectCard.querySelector('.tasks-count');
    if (tasksCountElem) {
        tasksCountElem.textContent = project.getTasks().length;
    }
}