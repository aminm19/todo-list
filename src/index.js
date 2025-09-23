import "./styles.css";
import { loadProjectsPage } from "./projectsPage.js";
//import { loadTodoPage } from "./todoPage.js";

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start with the projects page
    loadProjectsPage();
});
