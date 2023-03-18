import Layout from '../component/Layout.js';
import { hydrateFeed } from './hydration/feed.js';

const FeedPage = () => {
  const feedPage = document.createElement('div');
  feedPage.className = "d-flex flex-column align-items-center";
  feedPage.id = "feed";

  hydrateFeed(feedPage);

  return Layout(feedPage);
}

export default FeedPage;
