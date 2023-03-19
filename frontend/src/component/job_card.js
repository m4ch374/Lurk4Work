// Not letting us use react is a war crime
import { JOB_LIKE_ROUTE } from "../config.js";
import Fetcher from "../fetcher.js";
import Comment from "./comment.js";
import UserHandle from "./user_handle.js";
import { 
  getTimeDiffStr, 
  setBootstrapModalContent,
  linkBtnToModal 
} from "../helpers.js";

const hydration = (jobCard, props) => {
  jobCard.querySelector('.see-like-btn').addEventListener('click', () => {
    const wrapper = document.createElement('div');
    if (props.likes.length == 0) {
      wrapper.textContent = "There are currently no likes";
    } else {
      wrapper.appendChild(UserHandle(props.likes[0].userId));
      props.likes.slice(1).forEach(l => {
        wrapper.appendChild(document.createElement('hr'));
        wrapper.appendChild(UserHandle(l.userId));
      });
    }

    setBootstrapModalContent("Likes", wrapper);
  });

  jobCard.querySelector('.job-card-like-btn').addEventListener('click', () => {
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

  jobCard.querySelector('.job-card-comment-btn').addEventListener('click', () => {
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

    setBootstrapModalContent("Comments", commentSection);
  });
}

const jobCardHeader = (props) => {
  const cardHeader = document.createElement('div');
  cardHeader.className = "fs-3";

  const postDate = document.createElement('h6');
  postDate.className = "fs-6 text-secondary";
  postDate.textContent = getTimeDiffStr(props.createdAt);

  const userHandle = UserHandle(props.creatorId);
  
  cardHeader.append(userHandle, postDate);
  return cardHeader;
}

const jobCardBody = (props) => {
  const cardBody = document.createElement('div');
  cardBody.className = "d-flex flex-column align-items-start";

  const jobImg = document.createElement('img');
  jobImg.src = props.image;
  jobImg.className = "job-img object-fit-contain align-self-center";

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

  cardBody.append(jobImg, jobTitle, startingDate, jobDescript, seeLikesBtn);
  return cardBody;
}

const jobCardFooterLike = (props) => {
  const likes = document.createElement('button');
  likes.className = "col border-0 bg-white job-card-like-btn";

  const likeIcon = document.createElement('i');
  const userLikedPost = props.likes.map(l => l.userId).includes(parseInt(localStorage.getItem('userId')));
  likeIcon.className = "bi ";
  likeIcon.className += userLikedPost ? "bi-hand-thumbs-up-fill" : "bi-hand-thumbs-up";

  const likeCount = document.createElement('span');
  likeCount.textContent = " " + props.likes.length;

  likes.append(likeIcon, likeCount);
  return likes;
}

const jobCardFooterCommentBtn = (props) => {
  const comment = document.createElement('button');
  comment.className = "col border-start border-0 bg-white job-card-comment-btn";

  const commentIcon = document.createElement('i');
  commentIcon.className = "bi bi-chat-left-text-fill";

  const commentCount = document.createElement('span');
  commentCount.textContent = " " + props.comments.length;

  comment.append(commentIcon, commentCount);
  linkBtnToModal(comment, "placeholder-modal");

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

  hydration(card, props);
  return card;
}

export default JobCard;
