import jobCard from './job_card.js';
import { JOB_FEED_ROUTE, POSTS_PER_LOAD } from '../config.js';
import Fetcher from '../fetcher.js';
import { getElem } from '../helpers.js';

const populateFeed = (startIdx) => {
  checkIntegrety();

  const fetchResult = Fetcher.get(JOB_FEED_ROUTE)
                      .withQuery("start", startIdx)
                      .withLocalStorageToken()
                      .fetchResult();

  fetchResult.then(data => {
      const feed = getElem('feed');
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

const runScript = () => {
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

const Modal = () => {
  const modal = document.createElement('div');
  modal.className = "modal fade";
  modal.id = "placeholder-modal";
  modal.tabIndex = -1;

  const modalDialouge = document.createElement('div');
  modalDialouge.className = "modal-dialog modal-dialog-centered modal-dialog-scrollable text-black";

  const modalContent = document.createElement('div');
  modalContent.className = "modal-content modal-custom-height";

  const modalHeader = document.createElement('div');
  modalHeader.className = "modal-header";

  const modalTitle = document.createElement('h5');
  modalTitle.className = "modal-title fs-5";
  modalTitle.id = "placeholder-title";

  const closeButton = document.createElement('button');
  closeButton.type = "button";
  closeButton.className = "btn-close";
  closeButton.setAttribute('data-bs-dismiss', 'modal');

  modalHeader.append(modalTitle, closeButton);

  const modalBody = document.createElement('div');
  modalBody.className = "modal-body";
  modalBody.id = "placeholder-body";

  modalContent.append(modalHeader, modalBody);

  modalDialouge.appendChild(modalContent);

  modal.appendChild(modalDialouge);
  return modal;
}

const Feed = () => {
  const root = document.createElement('div');
  root.className = "d-flex flex-column align-items-center";
  root.id = "feed";

  root.appendChild(Modal());

  runScript();
  return root;
}

export default Feed;
