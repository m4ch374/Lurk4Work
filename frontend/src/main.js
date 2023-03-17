import Feed from './component/feed.js';
import { getElem } from './helpers.js';
import router from './router.js';

const closeCollapseMenu = () => {
  const collapseMenu = document.querySelector('.nav-collapsed-menu');
  collapseMenu.style.width = "0px";
  collapseMenu.style.display = "none";
}

const main = () => {
  // Collapsable button
  getElem('nav-toggle-btn').addEventListener('click', () => {
    const collapseMenu = document.querySelector('.nav-collapsed-menu');
    const computedStyle = window.getComputedStyle(collapseMenu);

    if (computedStyle.getPropertyValue("display") === "none") {
      collapseMenu.style.display = "block";
      collapseMenu.style.width = "150px";
    } else {
      closeCollapseMenu();
    }
  });

  document.addEventListener('click', (e) => {
    const collapseMenu = document.querySelector('.nav-collapsed-menu');

    if (!collapseMenu.contains(e.target) && !getElem('nav-toggle-btn').contains(e.target)) {
      closeCollapseMenu();
    }
  });

  // Hash routing
  window.addEventListener('hashchange', () => {
    const mainBody = document.querySelector('main');
    while (mainBody.firstChild) {
      mainBody.removeChild(mainBody.firstChild);
    }

    const resultElem = router(window.location.hash.slice(1));
    mainBody.appendChild(resultElem);
  });

  // Default to feed
  document.querySelector('main').appendChild(Feed());
}

main();
