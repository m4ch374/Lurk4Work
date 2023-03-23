import Layout from '../component/Layout.js';
import { POLL_INTERVAL } from '../config.js';
import { hydrateFeed, pollFeed } from './hydration/feed.js';

const FeedPage = () => {
  const feedPage = document.createElement('div');
  feedPage.className = "d-flex flex-column align-items-center";
  feedPage.id = "feed";

  hydrateFeed(feedPage);

  setInterval(() => {
    if (window.location.hash.includes("feed")) {
      pollFeed(document.querySelector("#feed"));
    }
  }, POLL_INTERVAL);

  return Layout(feedPage);
}

export default FeedPage;
