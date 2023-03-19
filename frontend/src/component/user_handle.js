import { USER_ROUTE } from "../config.js";
import Fetcher from "../fetcher.js";

const UserHandle = (user_id) => {
  const handle = document.createElement('a');
  handle.className = "d-flex align-items-center gap-1 text-black text-decoration-none m-0 p-0";
  handle.href = `#profile=${user_id}`;

  const userName = document.createElement('span');

  const result = Fetcher.get(USER_ROUTE)
                  .withLocalStorageToken()
                  .withQuery("userId", user_id)
                  .fetchResult();

  result.then(data => {
      let userIcon = null;
      userName.textContent = data.name;
      if (data.image) {
        userIcon = document.createElement('img');
        userIcon.className = "job-card-profile-pic object-fit-fill align-self-center rounded-circle";
        userIcon.src = data.image;
      } else {
        userIcon = document.createElement('i');
        userIcon.className = "bi bi-person-circle";
      }

      handle.append(userIcon, userName);
    })
    .catch(e => {
      alert('Something went wrong');
      console.log(e)
    });

  // Weird hack to enable scrolling after routing from a bootstrap modal
  handle.addEventListener('click', () => {
    const body = document.querySelector('body');
    body.setAttribute("style", "");
    body.setAttribute("class", "");
  })

  return handle;
}

export default UserHandle;
