// Not letting us use react is a war crime
import { JOB_LIKE_ROUTE, USER_ROUTE } from "../config.js";
import Fetcher from "../fetcher.js";
import { getTimeDiffStr, getElem } from "../helpers.js";
import Comment from "./comment.js";
import UserHandle from "./user_handle.js";

const setModalContent = (title, content) => {
  getElem('placeholder-title').textContent = title;

  const placeholderBody = getElem('placeholder-body');
  while (placeholderBody.firstChild) {
    placeholderBody.removeChild(placeholderBody.firstChild);
  }
  placeholderBody.appendChild(content);
}

const linkBtnToModal = (btn, modalName) => {
  btn.setAttribute("data-bs-toggle", "modal");
  btn.setAttribute("data-bs-target", `#${modalName}`);
}

const jobCardHeader = (props) => {
  const cardHeader = document.createElement('div');
  cardHeader.className = "fs-3";

  const postDate = document.createElement('h6');
  postDate.className = "fs-6 text-secondary";
  postDate.textContent = getTimeDiffStr(props.createdAt);

  const fetchResult = Fetcher.get(USER_ROUTE)
                        .withLocalStorageToken()
                        .withQuery("userId", props.creatorId)
                        .fetchResult();

  fetchResult.then(data => {
      const userHandle = UserHandle(data.name);
      cardHeader.append(userHandle, postDate);
    })
    .catch(e => {
      alert("something went wrong");
      console.log(e);
    })

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

  const seeLikesBtn = document.createElement('button');
  seeLikesBtn.classList = "text-secondary fs-6 border-0 rounded-2 m-0 p-0 see-like-btn";
  seeLikesBtn.textContent = "See Likes";
  linkBtnToModal(seeLikesBtn, "placeholder-modal");

  // Add event listener in main.js would cause bugs
  seeLikesBtn.addEventListener('click', () => {
    const wrapper = document.createElement('div');
    if (props.likes.length == 0) {
      wrapper.textContent = "There are currently no likes";
    } else {
      wrapper.appendChild(UserHandle(props.likes[0].userName));
      props.likes.slice(1).forEach(l => {
        wrapper.appendChild(document.createElement('hr'));
        wrapper.appendChild(UserHandle(l.userName));
      });
    }

    setModalContent("Likes", wrapper);
  });

  cardBody.append(jobImg, jobTitle, startingDate, jobDescript, seeLikesBtn);
  return cardBody;
}

const jobCardFooterLike = (props) => {
  const likes = document.createElement('button');
  likes.className = "col border-0 bg-white";

  const likeIcon = document.createElement('i');
  const userLikedPost = props.likes.map(l => l.userId).includes(parseInt(localStorage.getItem('userId')));
  likeIcon.className = "bi ";
  likeIcon.className += userLikedPost ? "bi-hand-thumbs-up-fill" : "bi-hand-thumbs-up";

  const likeCount = document.createElement('span');
  likeCount.textContent = " " + props.likes.length;

  likes.append(likeIcon, likeCount);

  likes.addEventListener('click', () => {
    const payload = {
      "id": props.id,
      "turnon": true
    };

    const result = Fetcher.put(JOB_LIKE_ROUTE)
                    .withJsonPayload(payload)
                    .withLocalStorageToken()
                    .fetchResult();

    result.then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          likeIcon.classList.remove("bi-hand-thumbs-up");
          likeIcon.classList.add("bi-hand-thumbs-up-fill");
        }
      })
      .catch(e => {
        alert("something went wrong");
        console.log(e);
      })
  });

  return likes;
}

const jobCardFooterCommentBtn = (props) => {
  const comment = document.createElement('button');
  comment.className = "col border-start border-0 bg-white comment-btn";

  const commentIcon = document.createElement('i');
  commentIcon.className = "bi bi-chat-left-text-fill";

  const commentCount = document.createElement('span');
  commentCount.textContent = " " + props.comments.length;

  comment.append(commentIcon, commentCount);
  linkBtnToModal(comment, "placeholder-modal");

  comment.addEventListener('click', () => {
    const commentSection = document.createElement('div');
    
    if (props.comments.length == 0) {
      commentSection.textContent = "There are no comments";
    } else {
      commentSection.appendChild(Comment(props.comments[0]));
      props.comments.slice(1).forEach(c => {
        commentSection.appendChild(document.createElement('hr'));
        commentSection.appendChild(Comment(c));
      });
    }

    setModalContent("Comments", commentSection);
  });

  return comment;
}

const jobCardFooter = (props) => {
  const cardFooter = document.createElement('div');
  cardFooter.className = "container-fluid text-center";

  const likes = jobCardFooterLike(props);
  const comment = jobCardFooterCommentBtn(props);

  const containerRow = document.createElement('div');
  containerRow.className = "row";
  containerRow.append(likes, comment);

  cardFooter.appendChild(containerRow);
  return cardFooter;
}

const JobCard = (props) => {
  const card = document.createElement('div');
  // not using gaps to seperate cards bc there are some issues with it
  card.className = "job-card p-4 pb-3 rounded-3 bg-white text-black mb-4";

  const header = jobCardHeader(props);
  const body = jobCardBody(props);
  const footer = jobCardFooter(props);

  const hr = document.createElement('hr');
  const hr1 = document.createElement('hr');
  hr1.classList = "mt-1";
  
  card.append(header, hr, body, hr1, footer);
  return card;
}

export default JobCard;
