import jobCard from './component/job_card.js';
import { JOB_FEED_ROUTE } from './config.js';
import Fetcher from './fetcher.js';

// Executed at the very end of the file
const populateFeed = () => {
  checkIntegrety();

  const fetchResult = Fetcher.get(JOB_FEED_ROUTE)
                      .withQuery("start", 0)
                      .withLocalStorageToken()
                      .fetchResult();

  fetchResult.then(data => {
      const feed = document.querySelector('#feed');
      data.forEach(d => feed.appendChild(jobCard(d)));
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

populateFeed();
