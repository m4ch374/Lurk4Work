import { USER_WATCH_ROUTE } from "../config.js";
import Fetcher from "../fetcher.js";
import { getElem, linkBtnToModal, setBootstrapModalContent } from "../helpers.js";
import BootstrapModal from "./bootstrap_modal.js";
import FormField from "./form_field.js";
import NewPostForm from "./new_post_form.js";

const closeCollapseMenu = (menu) => {
  const collapseMenu = menu.querySelector('.nav-collapsed-menu');
  collapseMenu.style.width = "0px";
  collapseMenu.style.display = "none";
}

const hydration = (menu) => {
  // Collapsable button
  getElem('nav-toggle-btn', menu).addEventListener('click', () => {
    const collapseMenu = menu.querySelector('.nav-collapsed-menu');
    const computedStyle = window.getComputedStyle(collapseMenu);

    if (computedStyle.getPropertyValue("display") === "none") {
      collapseMenu.style.display = "block";
      collapseMenu.style.width = "150px";
    } else {
      closeCollapseMenu(menu);
    }
  });

  menu.querySelectorAll('.create-new-post').forEach(e => {
    e.addEventListener('click', () => {
      setBootstrapModalContent("New Post", NewPostForm());
    });
  });

  menu.querySelectorAll('.nav-watch-btn').forEach(e => {
    e.addEventListener('click', () => {
      const form = document.createElement('form');

      const emailField = FormField("Email address", "email", 'nav-watch-email-input');

      const submitBtn = document.createElement('button');
      submitBtn.type = "submit";
      submitBtn.className = "btn btn-primary";
      submitBtn.textContent = "Watch";
      linkBtnToModal(submitBtn, "placeholder-modal");

      form.append(emailField, submitBtn);

      setBootstrapModalContent("Enter watcher email", form);

      submitBtn.addEventListener('click', () => {
        const result = Fetcher.put(USER_WATCH_ROUTE)
                        .withLocalStorageToken()
                        .withJsonPayload({
                          "email": getElem('nav-watch-email-input', emailField).value,
                          "turnon": true,
                        })
                        .fetchResult();

        result.then(data => {
          if (data.error) {
            alert(data.error);
          }
        });
      });
    });
  });

  document.addEventListener('click', (e) => {
    const collapseMenu = menu.querySelector('.nav-collapsed-menu');

    if (!collapseMenu.contains(e.target) && !getElem('nav-toggle-btn', menu).contains(e.target)) {
      closeCollapseMenu(menu);
    }
  });
}

const ItemBtn = (textContent, className="", link=undefined) => {
  const btn = document.createElement('button');
  btn.type = "button d-block w-100 nav-item-btn p-0 m-0";
  btn.className = className;

  const routeTo = document.createElement('a');
  // Computed style has padding-x with 6px what the f
  routeTo.className = "text-decoration-none text-white w-100 d-block p-0 m-0";
  routeTo.textContent = textContent;

  if (typeof link != 'undefined') {
    routeTo.href = link;
  }

  btn.appendChild(routeTo);
  return btn;
}

const CollpasedItem = () => {
  const collapsedItem = document.createElement('div');
  collapsedItem.className = "d-md-none d-flex flex-fill justify-content-end";

  const newPostBtn = document.createElement('button');
  newPostBtn.type = "button";
  newPostBtn.className = "btn btn-outline-secondary mx-2 create-new-post"
  linkBtnToModal(newPostBtn, "placeholder-modal");

  const newPostBtnIcon = document.createElement('i');
  newPostBtnIcon.className = "bi bi-clipboard-plus";

  newPostBtn.appendChild(newPostBtnIcon);

  const collapsedMenuBtn = document.createElement('button');
  collapsedMenuBtn.type = "button";
  collapsedMenuBtn.className = "btn btn-outline-secondary";
  collapsedMenuBtn.id = "nav-toggle-btn";

  const collapsedMenuBtnIcon = document.createElement('span');
  collapsedMenuBtnIcon.className = "navbar-toggler-icon";

  collapsedMenuBtn.appendChild(collapsedMenuBtnIcon);

  const collapsedMenu = document.createElement('div');
  collapsedMenu.className = "nav-collapsed-menu";

  const watchPromptBtn = ItemBtn("Watch", "collapsed-menu-btn nav-watch-btn");
  linkBtnToModal(watchPromptBtn, "placeholder-modal");

  const profileLink = ItemBtn("View Profile", 
                        "collapsed-menu-btn", 
                        `#profile=${localStorage.getItem('userId')}`
                      );
  const newPostLink = ItemBtn("New Post", "collapsed-menu-btn create-new-post");
  linkBtnToModal(newPostLink, "placeholder-modal");

  const logoutBtn = ItemBtn("Logout", "collapsed-menu-btn", "#");

  collapsedMenu.append(watchPromptBtn, profileLink, newPostLink, logoutBtn);

  collapsedItem.append(newPostBtn, collapsedMenuBtn, collapsedMenu);
  return collapsedItem;
}

const Navbar = () => {
  const navbar = document.createElement('header');

  const nav  = document.createElement('nav');
  nav.className = "navbar fixed-top navbar-dark bg-body-tertiary justify-content-center";
  nav.setAttribute("data-bs-theme", "dark");

  const navContainer = document.createElement('div');
  navContainer.className = "d-flex px-4 nav-bar-container align-items-center w-100";

  const navBrand = document.createElement('a');
  navBrand.className = "navbar-brand";
  navBrand.href = "#feed";
  navBrand.textContent = "Lurk4Work";

  const collapseditem = CollpasedItem();

  const uncollapsedBtnGrp = document.createElement('div');
  uncollapsedBtnGrp.className = "d-none d-md-flex flex-fill justify-content-end";

  const watchBtn = ItemBtn("Watch", "mx-2 btn btn-outline-secondary nav-watch-btn");
  linkBtnToModal(watchBtn, "placeholder-modal");

  const newPostBtn = ItemBtn("New Post", "mx-2 btn btn-outline-success create-new-post");
  linkBtnToModal(newPostBtn, "placeholder-modal");

  const viewProfileBtn = ItemBtn("View Profile",
                          "mx-2 btn btn-primary",
                          `#profile=${localStorage.getItem('userId')}`
                        );
  const logoutBtn = ItemBtn("Logout", "mx-2 btn btn-danger", "#");

  uncollapsedBtnGrp.append(watchBtn, newPostBtn, viewProfileBtn, logoutBtn);

  navContainer.append(navBrand, collapseditem, uncollapsedBtnGrp);

  nav.appendChild(navContainer);

  navbar.appendChild(nav);
  navbar.appendChild(BootstrapModal());
  hydration(navbar);
  return navbar;
}

export default Navbar;
