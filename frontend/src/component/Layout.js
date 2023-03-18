import Navbar from "./Navbar.js";

const Layout = (children) => {
  const layout = document.createElement('div');

  const mainBody = document.createElement('body');
  mainBody.className = "content-offset";
  mainBody.appendChild(children);

  layout.append(Navbar(), mainBody);
  return layout;
}

export default Layout;
