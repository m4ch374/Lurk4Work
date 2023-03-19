import { checkIntegrety } from "./helpers.js";
import AuthPage from "./pages/auth_page.js";
import FeedPage from "./pages/feed_page.js";
import ProfilePage from "./pages/profile_page.js";

const removeChildren = () => {
  const body = document.querySelector('body');

  while (body.firstChild) {
    body.removeChild(body.firstChild);
  }
}

const route = () => {
  // Hash route wont be case sensitive
  const hash = window.location.hash.slice(1).toLowerCase();

  removeChildren();

  const body = document.querySelector('body');
  if (hash === "" || hash === "auth") {
    body.appendChild(AuthPage());
    return;
  }

  checkIntegrety();

  if (hash === "feed") {
    body.appendChild(FeedPage());
    return;
  }

  if (hash.startsWith("profile")) {
    const rawQuery = hash.substring("profile".length);

    if (rawQuery === "" || rawQuery.slice(1) === "") {
      body.appendChild(ProfilePage());
    } else {
      body.appendChild(ProfilePage(rawQuery.slice(1)));
    }

    return;
  }
}

const main = () => {
  window.addEventListener('hashchange', () => {
    route();
  });

  route();
}

main();
