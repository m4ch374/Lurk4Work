import Feed from './component/feed.js';
import { getElem } from './helpers.js';
import router from './router.js';
import { checkIntegrety } from './helpers.js';

const main = () => {

  // Hash routing
  window.addEventListener('hashchange', () => {
    checkIntegrety();

    const mainBody = document.querySelector('main');
    while (mainBody.firstChild) {
      mainBody.removeChild(mainBody.firstChild);
    }

    const resultElem = router(window.location.hash.slice(1));
    mainBody.appendChild(resultElem);
  });

  // Default to feed
  checkIntegrety();
  document.querySelector('main').appendChild(Feed());
}

main();
