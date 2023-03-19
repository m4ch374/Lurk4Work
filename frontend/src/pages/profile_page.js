import Layout from "../component/Layout.js";
import { linkBtnToModal } from "../helpers.js";
import { hydration } from "./hydration/profile.js";

const profileOverview = () => {
  const overview = document.createElement('div');
  overview.className = "d-flex flex-column align-items-start profile-container";

  const container = document.createElement('div');
  container.id = "overview-container";
  
  const profileImg = document.createElement('i');
  profileImg.className = "bi bi-person-circle profile-pic-default";
  profileImg.id = "overview-profile-img"

  const profileName = document.createElement('h1');
  profileName.className = "fs-1";
  profileName.textContent = "Name";
  profileName.id = "overview-profile-name";

  const profileEmail = document.createElement('h5');
  profileEmail.className = "fs-5";
  profileEmail.textContent = "email@email.com";
  profileEmail.id = "overview-profile-email";

  const watchCountBtn = document.createElement('button');
  watchCountBtn.type = "button";
  watchCountBtn.classList = "watch-count-btn";
  watchCountBtn.textContent = "Watch count: 0";
  watchCountBtn.id = "overview-watch-count-btn";
  linkBtnToModal(watchCountBtn, "placeholder-modal");

  const watchBtn = document.createElement('button');
  watchBtn.type = "button";
  watchBtn.classList = "btn btn-success d-block px-2 mt-2 mb-5";
  watchBtn.textContent = "Watch";
  watchBtn.id = "overview-watch-btn";

  const unwatchBtn = document.createElement('button');
  unwatchBtn.type = "button";
  unwatchBtn.classList = "btn btn-outline-danger d-none px-2 mt-2 mb-5";
  unwatchBtn.textContent = "Unwatch";
  unwatchBtn.id = "overview-unwatch-btn";
  
  const jobsHeader = document.createElement('h2');
  jobsHeader.className = "fs-2"
  jobsHeader.textContent = "Jobs";

  container.append(
    profileImg,
    profileName,
    profileEmail,
    watchCountBtn,
    watchBtn,
    unwatchBtn,
    jobsHeader
  )

  overview.appendChild(container);
  return overview
}

const ProfilePage = (userId=localStorage.getItem('userId')) => {
  const profilePage = document.createElement('div');
  
  const overview = profileOverview();

  const jobs = document.createElement('div');
  jobs.className = "d-flex flex-column w-100 align-items-center";
  jobs.id = "profile-jobs";

  profilePage.append(overview, jobs);

  hydration(profilePage, userId);
  return Layout(profilePage);
}

export default ProfilePage;
