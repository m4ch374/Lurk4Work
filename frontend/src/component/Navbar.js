import { getElem, linkBtnToModal, setBootstrapModalContent } from "../helpers.js";
import BootstrapModal from "./bootstrap_modal.js";

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
      setBootstrapModalContent("New Post", document.createElement('div'));
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

  const profileLink = ItemBtn("View Profile", 
                        "collapsed-menu-btn", 
                        `#profile=${localStorage.getItem('userId')}`
                      );
  const newPostLink = ItemBtn("New Post", "collapsed-menu-btn create-new-post");
  linkBtnToModal(newPostLink, "placeholder-modal");

  const logoutBtn = ItemBtn("Logout", "collapsed-menu-btn", "#");

  collapsedMenu.append(profileLink, newPostLink, logoutBtn);

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

  const newPostBtn = ItemBtn("New Post", "mx-2 btn btn-outline-success create-new-post");
  linkBtnToModal(newPostBtn, "placeholder-modal");

  const viewProfileBtn = ItemBtn("View Profile",
                          "mx-2 btn btn-primary",
                          `#profile=${localStorage.getItem('userId')}`
                        );
  const logoutBtn = ItemBtn("Logout", "mx-2 btn btn-secondary", "#");

  uncollapsedBtnGrp.append(newPostBtn, viewProfileBtn, logoutBtn);

  navContainer.append(navBrand, collapseditem, uncollapsedBtnGrp);

  nav.appendChild(navContainer);

  navbar.appendChild(nav);
  navbar.appendChild(BootstrapModal());
  hydration(navbar);
  return navbar;
}

export default Navbar;
