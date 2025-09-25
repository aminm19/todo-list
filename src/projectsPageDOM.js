// projectsPageDOM.js - DOM manipulation for the projects page

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
                                <h3>3</h3>
                                <p>Active Projects</p>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div class="stat-content">
                                <h3>14</h3>
                                <p>Completed Tasks</p>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="stat-content">
                                <h3>15</h3>
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

    // Modal overlay click to close
    // const modalOverlay = document.getElementById('new-project-modal');
    // if (modalOverlay) {
    //     modalOverlay.addEventListener('click', (e) => {
    //         if (e.target === modalOverlay) {
    //             closeModal();
    //         }
    //     });
    // }
    
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
            console.log('Form submitted:', Object.fromEntries(formData));
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
}