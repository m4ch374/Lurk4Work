import JobCard from './component/job_card.js';
import { JOB_FEED_ROUTE, POSTS_PER_LOAD } from './config.js';
import Fetcher from './fetcher.js';
import { getElem } from './helpers.js';

const populateFeed = (startIdx) => {
  checkIntegrety();

  const fetchResult = Fetcher.get(JOB_FEED_ROUTE)
                      .withQuery("start", startIdx)
                      .withLocalStorageToken()
                      .fetchResult();

  fetchResult.then(data => {
      const feed = getElem('feed');
      data.forEach(d => feed.appendChild(JobCard(d)));
    })
    .catch(e => {
      alert("something went wrong");
      console.log(e);
    });
}

const checkIntegrety = () => {
  if (!'token' in localStorage) {
    alert("Cannot access main page without logging in");
    window.location.href = "../index.html";
  }
}

const main = () => {
  let currLoadIdx = 0;

  populateFeed(currLoadIdx);

  // Listens for client scrolling to the bottom of the page
  document.addEventListener('scroll', () => {
    const docElem = document.documentElement;

    const totalHeight = docElem.scrollHeight;
    const clientHeight = docElem.scrollTop + docElem.clientHeight;

    const detectionOffset = 2;
    const scrollToBottom = clientHeight > (totalHeight - detectionOffset);

    if (scrollToBottom) {
      currLoadIdx += POSTS_PER_LOAD;
      setTimeout(populateFeed(currLoadIdx), 1000) // To create an illusion
    }
  });
}

main();
