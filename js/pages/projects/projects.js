/**
 * @fileoverview Projects page component
 * @author ValentimSts
 * @since 0.0.0
 */

/**
 * Project data structure
 * @typedef {Object} Project
 * @property {string} title - Project title
 * @property {string} description - Project description
 * @property {string[]} technologies - Technologies used
 * @property {string} [link] - Project link
 */

/**
 * Sample projects data
 * @type {Project[]}
 */
const PROJECTS_DATA = [
  {
    title: 'Portfolio Website',
    description: 'A responsive portfolio website built with vanilla JavaScript and modern CSS.',
    technologies: ['JavaScript', 'CSS', 'HTML'],
    link: '#'
  },
  {
    title: 'Task Manager App',
    description: 'A productivity app for managing daily tasks and projects.',
    technologies: ['JavaScript', 'LocalStorage', 'CSS Grid'],
    link: '#'
  }
];

/**
 * Creates the projects page component
 * @function createProjectsPage
 * @returns {HTMLElement} The projects page element
 * @example
 * const projectsPage = createProjectsPage();
 * document.getElementById('app').appendChild(projectsPage);
 */
export function createProjectsPage() {
  const page = document.createElement('div');
  page.className = 'page projects-page';
  
  const title = document.createElement('h1');
  title.textContent = 'My Projects';
  
  const projectsGrid = document.createElement('div');
  projectsGrid.className = 'projects-grid';
  
  PROJECTS_DATA.forEach(project => {
    const projectCard = _createProjectCard(project);
    projectsGrid.appendChild(projectCard);
  });
  
  page.appendChild(title);
  page.appendChild(projectsGrid);
  
  return page;
}

/**
 * Creates a project card component
 * @private
 * @param {Project} project - Project data
 * @returns {HTMLElement} Project card element
 */
function _createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';
  
  const title = document.createElement('h3');
  title.textContent = project.title;
  
  const description = document.createElement('p');
  description.textContent = project.description;
  
  const techList = document.createElement('div');
  techList.className = 'tech-list';
  
  project.technologies.forEach(tech => {
    const techTag = document.createElement('span');
    techTag.className = 'tech-tag';
    techTag.textContent = tech;
    techList.appendChild(techTag);
  });
  
  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(techList);
  
  if (project.link) {
    const link = document.createElement('a');
    link.href = project.link;
    link.textContent = 'View Project';
    link.className = 'project-link';
    card.appendChild(link);
  }
  
  return card;
}
