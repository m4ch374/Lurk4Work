import JobCard from "../../component/job_card.js";
import { USER_ROUTE, USER_WATCH_ROUTE } from "../../config.js";
import { fileToDataUrl, getElem, linkBtnToModal, setBootstrapModalContent } from "../../helpers.js";
import Fetcher from "../../fetcher.js";
import UserHandle from "../../component/user_handle.js";
import FormField from "../../component/form_field.js";

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
  if (props.image && props.image !== "") {
    const overviewContainer = getElem("overview-container", page);
    const profileDefaultImg = getElem("overview-profile-img", overviewContainer);

    const profileImg = document.createElement('img');
    profileImg.src = props.image;
    profileImg.className = "profile-pic object-fit-fill rounded-circle bi bi-person-circle";

    overviewContainer.replaceChild(profileImg, profileDefaultImg);
  }

  // Lol extremely unsecure
  if (parseInt(props.id) == parseInt(localStorage.getItem('userId'))) {
    const editBtn = document.createElement('button');
    editBtn.type = "button";
    editBtn.className = "btn btn-outline-light border-0";
    
    const editBtnIcon = document.createElement('i');
    editBtnIcon.className = "bi bi-pencil-square";

    editBtn.appendChild(editBtnIcon);
    linkBtnToModal(editBtn, "placeholder-modal");

    editBtn.addEventListener('click', () => {
      const form = document.createElement('form');

      const emailField = FormField("Email address", "email", "profile-edit-email");
      const passwordField = FormField("Password", "password", "profile-edit-password");
      const nameField = FormField("Name", "text", "profile-edit-name");
      const fileField = FormField("Profile Image", "file", "profile-edit-file");

      const submitBtn = document.createElement('button');
      submitBtn.type = "submit";
      submitBtn.className = "btn btn-primary";
      submitBtn.textContent = "Edit";
      linkBtnToModal(submitBtn, "placeholder-modal");

      submitBtn.addEventListener('click', () => {
        try {
          fileToDataUrl(getElem("profile-edit-file", fileField).files[0]).then(data => {
            const payload = {
              "email": getElem("profile-edit-email", emailField).value,
              "password": getElem("profile-edit-password", passwordField).value,
              "name": getElem("profile-edit-name", nameField).value,
              "image": data,
            }
    
            console.log(payload);
    
            const result = Fetcher.put(USER_ROUTE)
                            .withLocalStorageToken()
                            .withJsonPayload(payload)
                            .fetchResult();
    
            result.then(data => {
              if (data.error) {
                alert(data.error);
              }
            });
          });
        } catch (e) {
          alert(e);
          console.log(e);
        }
      });

      form.append(emailField, passwordField, nameField, fileField, submitBtn);
      setBootstrapModalContent("Edit Profile", form);
    });

    getElem("overview-profile-name-container", page).appendChild(editBtn);
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
