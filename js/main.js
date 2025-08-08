import { IDS } from './constants/ids.js';
import { createNavbar } from './components/navbar/navbar.js';

const navbar = document.getElementById(IDS.NAVBAR);
if (navbar) {
  navbar.appendChild(createNavbar());
}


