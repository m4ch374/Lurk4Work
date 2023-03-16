// Not letting us use react is a war crime
import { USER_ROUTE } from "../config.js";
import Fetcher from "../fetcher.js";
import { fileToDataUrl, getTimeDiffStr } from "../helpers.js";

const jobCardHeader = (props) => {
  const cardHeader = document.createElement('div');
  cardHeader.className = "fs-3";

  const userIcon = document.createElement('i');
  userIcon.className = "bi bi-person-circle";

  const userName = document.createElement('span');

  const postDate = document.createElement('h6');
  postDate.className = "fs-6 text-secondary";
  postDate.textContent = getTimeDiffStr(props.createdAt);

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

const jobCardBody = (props) => {
  const cardBody = document.createElement('div');

  const jobImg = document.createElement('img');
  jobImg.src = props.image;

  const jobTitle = document.createElement('h1');
  jobTitle.textContent = props.title;

  const startingDate = document.createElement('h6');
  startingDate.textContent = `Starts at: ${props.start}`;
  startingDate.className = "text-secondary job-start-text";

  const jobDescript = document.createElement('p');
  jobDescript.textContent = props.description;

  cardBody.append(jobImg, jobTitle, startingDate, jobDescript);
  return cardBody;
}

const jobCard = (props) => {
  const card = document.createElement('div');
  // not using gaps to seperate cards bc there are some issues with it
  card.className = "job-card p-4 pb-3 rounded-3 bg-white text-black mb-4";

  const header = jobCardHeader(props);
  const body = jobCardBody(props);

  const hr = document.createElement('hr');
  card.append(header, hr, body);
  return card;
}

export default jobCard;
