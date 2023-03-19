import { USER_ROUTE } from "../config.js";
import Fetcher from "../fetcher.js";

const UserHandle = (user_id) => {
  const handle = document.createElement('button');
  handle.className = "d-flex align-items-center gap-1 bg-white border-0 m-0 p-0";

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
        userIcon.className = "job-card-profile-pic object-fit-contain align-self-center";
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

  return handle;
}

export default UserHandle;
