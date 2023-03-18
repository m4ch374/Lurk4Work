import jobCard from '../../component/job_card.js';
import { JOB_FEED_ROUTE, POSTS_PER_LOAD } from '../../config.js';
import Fetcher from '../../fetcher.js';

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

export {hydrateFeed};
