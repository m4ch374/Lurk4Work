import JobCard from "../../component/job_card.js";
import { USER_ROUTE, USER_WATCH_ROUTE } from "../../config.js";
import { getElem, setBootstrapModalContent } from "../../helpers.js";
import Fetcher from "../../fetcher.js";
import UserHandle from "../../component/user_handle.js";

const toggleWatched = (page) => {
  const watchBtn = getElem("overview-watch-btn", page);
  const unwatchBtn = getElem("overview-unwatch-btn", page);

  if (watchBtn.classList.contains("d-block")) {
    watchBtn.classList.remove("d-block");
    watchBtn.classList.add("d-none");

    unwatchBtn.classList.remove("d-none");
    unwatchBtn.classList.add("d-block");
  }
}

const toggleUnwatched = (page) => {
  const watchBtn = getElem("overview-watch-btn", page);
  const unwatchBtn = getElem("overview-unwatch-btn", page);

  if (watchBtn.classList.contains("d-none")) {
    watchBtn.classList.remove("d-none");
    watchBtn.classList.add("d-block");

    unwatchBtn.classList.remove("d-block");
    unwatchBtn.classList.add("d-none");
  }
}

const hydrateProfile = (page, props) => {
  if (props.image) {
    const profileDefaultImg = getElem("overview-profile-img", page);

    const profileImg = document.createElement('img');
    profileImg.src = props.image;
    profileImg.className = "profile-pic object-fit-contain rounded-circle bi bi-person-circle";
    
    getElem("overview-container", page).replaceChild(profileDefaultImg, profileImg);
  }

  getElem("overview-profile-name", page).textContent = props.name;
  getElem("overview-profile-email", page).textContent = props.email;

  const watchees = props.watcheeUserIds;
  
  const watchCountBtn = getElem("overview-watch-count-btn", page);
  watchCountBtn.textContent = `Watched count: ${watchees.length}`;
  watchCountBtn.addEventListener('click', () => {
    const wrapper = document.createElement('div');
    wrapper.appendChild(UserHandle(watchees[0]))
    watchees.slice(1).forEach(w => {
      wrapper.appendChild(document.createElement('hr'));
      wrapper.appendChild(UserHandle(w));
    });

    setBootstrapModalContent("Watched By", wrapper);
  });
  
  if (watchees.includes(parseInt(localStorage.getItem("userId")))) {
    toggleWatched();
  }

  getElem("overview-watch-btn", page).addEventListener('click', () => {
    const result = Fetcher.put(USER_WATCH_ROUTE)
                    .withLocalStorageToken()
                    .withJsonPayload({
                      "email": props.email,
                      "turnon": true,
                    })
                    .fetchResult();

    result.then(() => {
        toggleWatched();
      })
      .catch(e => {
        alert('something went wrong');
        console.log(e);
      });
  });

  getElem("overview-unwatch-btn", page).addEventListener('click', () => {
    const result = Fetcher.put(USER_WATCH_ROUTE)
                    .withLocalStorageToken()
                    .withJsonPayload({
                      "email": props.email,
                      "turnon": false,
                    })
                    .fetchResult();

    result.then(() => {
        toggleUnwatched();
      })
      .catch(e => {
        alert("something went wrong");
        console.log(e);
      });
  });
}

const hydration = (page, userId) => {
  const result = Fetcher.get(USER_ROUTE)
                  .withLocalStorageToken()
                  .withQuery("userId", userId)
                  .fetchResult();

  result.then(data => {  
      hydrateProfile(page, data);

      data.jobs.forEach(j => {
        getElem("profile-jobs", page).appendChild(JobCard(j));
      });
    })
    .catch(e => {
      alert("something went wrong");
      console.log(e);
    });
}

export {hydration};
