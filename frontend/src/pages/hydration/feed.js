import jobCard from '../../component/job_card.js';
import { JOB_FEED_ROUTE, POSTS_PER_LOAD } from '../../config.js';
import Fetcher from '../../fetcher.js';
import { getElem } from '../../helpers.js';

const populateFeed = (startIdx, feedPage) => {
  const fetchResult = Fetcher.get(JOB_FEED_ROUTE)
                      .withQuery("start", startIdx)
                      .withLocalStorageToken()
                      .fetchResult();

  fetchResult.then(data => {
      data.forEach(d => feedPage.appendChild(jobCard(d)));
    })
    .catch(e => {
      alert("something went wrong");
      console.log(e);
    });
}

const hydrateFeed = (feedPage) => {
  let currLoadIdx = 0;
  populateFeed(currLoadIdx, feedPage);

  // Listens for client scrolling to the bottom of the page
  document.addEventListener('scroll', () => {
    const docElem = document.documentElement;

    const totalHeight = docElem.scrollHeight;
    const clientHeight = docElem.scrollTop + docElem.clientHeight;

    const detectionOffset = 2;
    const scrollToBottom = clientHeight > (totalHeight - detectionOffset);

    if (scrollToBottom) {
      currLoadIdx += POSTS_PER_LOAD;
      setTimeout(populateFeed(currLoadIdx, feedPage), 1000) // To create an illusion
    }
  });
}

const setLikeIcon = (likeIcon, data) => {
  const likePost = data.likes.map(l => l.userId)
                    .includes(parseInt(localStorage.getItem('userId')));

  if(likePost) {
    likeIcon.classList.remove("bi-hand-thumbs-up");
    likeIcon.classList.add("bi-hand-thumbs-up-fill");
  }
}

const pollFeed = (feedPage) => {
  const jobCardList = feedPage.querySelectorAll('.job-card');

  for (let i = 0; i < jobCardList.length; i += POSTS_PER_LOAD) {
    const result = Fetcher.get(JOB_FEED_ROUTE)
                    .withLocalStorageToken()
                    .withQuery("start", i)
                    .fetchResult();

    result.then(data => {
      data.forEach(r => {
        const pollCard = feedPage.querySelector(`[id="${r.id}"]`);

        if (typeof pollCard == 'undefined' || !pollCard) {
          return;
        }
  
        // polls like button
        const likeText = pollCard.querySelector('.job-card-like-btn > span');
        likeText.textContent = " " + r.likes.length;

        const likeIcon = getElem("post-like-icon", pollCard);
        setLikeIcon(likeIcon, r);
        
        // Polls comment button
        const commentText = pollCard.querySelector('.job-card-comment-btn > span');
        commentText.textContent = " " + r.comments.length;
      });
    });
  }
}

export { hydrateFeed, pollFeed };
