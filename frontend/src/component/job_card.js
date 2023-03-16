// Not letting us use react is a war crime

import { USER_ROUTE } from "../config.js";
import Fetcher from "../fetcher.js";

const jobCardHeader = (props) => {
  const cardHeader = document.createElement('div');
  cardHeader.className = "fs-3";

  const userIcon = document.createElement('i');
  userIcon.className = "bi bi-person-circle";

  const userName = document.createElement('span');

  const postDate = document.createElement('h6');
  postDate.className = "fs-6 text-secondary";
  postDate.textContent = props.createdAt;

  const fetchResult = Fetcher.get(USER_ROUTE)
                        .withLocalStorageToken()
                        .withQuery("userId", props.creatorId)
                        .fetchResult();

  fetchResult.then(data => {
      userName.textContent = " " + data.name;
      
    })
    .catch(e => {
      alert("something went wrong");
      console.log(e);
    })

  cardHeader.append(userIcon, userName, postDate);
  return cardHeader;
}

const jobCard = (props) => {
  const card = document.createElement('div');
  card.className = "job-card p-4 pb-3 rounded-3 bg-white text-black";

  const header = jobCardHeader(props);

  const hr = document.createElement('hr');
  card.append(header, hr);
  return card;
}

export default jobCard;
