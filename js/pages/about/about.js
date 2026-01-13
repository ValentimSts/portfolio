/**
 * @fileoverview About page component
 * @author ValentimSts
 * @since 0.0.0
 */

/**
 * Creates the about page component
 * @function createAboutPage
 * @returns {HTMLElement} The about page element
 * @example
 * const aboutPage = createAboutPage();
 * document.getElementById('app').appendChild(aboutPage);
 */
export function createAboutPage() {
  const page = document.createElement('div');
  page.className = 'page about-page';
  
  const title = document.createElement('h1');
  title.textContent = 'About Me';
  
  const content = document.createElement('div');
  content.className = 'about-content';
  
  const bio = document.createElement('p');
  bio.textContent = 'I\'m a passionate developer with experience in modern web technologies. I love creating beautiful, functional, and user-friendly applications.';
  
  const skills = document.createElement('div');
  skills.className = 'skills';
  
  const skillsTitle = document.createElement('h2');
  skillsTitle.textContent = 'Skills';
  
  const skillsList = document.createElement('ul');
  const skillsData = ['JavaScript', 'HTML & CSS', 'React', 'Node.js', 'Git'];
  
  skillsData.forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill;
    skillsList.appendChild(li);
  });
  
  skills.appendChild(skillsTitle);
  skills.appendChild(skillsList);
  
  content.appendChild(bio);
  content.appendChild(skills);
  
  page.appendChild(title);
  page.appendChild(content);
  
  return page;
}
