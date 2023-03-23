import { JOB_FEED_ROUTE, POLL_INTERVAL, POSTS_PER_LOAD } from "../config.js";
import Fetcher from "../fetcher.js";
import { getElem } from "../helpers.js";
import SeeComments from "./see_comments.js";
import SeeLikes from "./see_likes.js";

const BootstrapModal = () => {
  const modal = document.createElement('div');
  modal.className = "modal fade";
  modal.id = "placeholder-modal";
  modal.tabIndex = -1;
  modal.setAttribute("data-state", "closed");
  modal.setAttribute("data-ownedby", "-1");
  modal.setAttribute("data-prevcount", "-1");

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

  // Polling
  setInterval(() => {
    if (!modal.classList.contains("show")) {
      return;
    }

    const state = modal.dataset.state;
    const ownedBy = modal.dataset.ownedby;

    const maxFeed = document.querySelectorAll('.job-card').length;
    for (let i = 0; i < maxFeed; i += POSTS_PER_LOAD) {
      Fetcher.get(JOB_FEED_ROUTE).withLocalStorageToken().withQuery("start", i).fetchResult()
        .then(data => {
          const entry = data.find((obj) => {
            return obj.id == parseInt(ownedBy);
          });

          if (typeof entry == 'undefined') {
            return;
          }

          if (state === "like") {
            if (parseInt(modal.dataset.prevcount) == parseInt(entry.likes.length)) {
              return;
            }

            modal.dataset.prevcount = entry.likes.length;
            modalBody.replaceChild(SeeLikes(entry.likes), getElem("see-like-content", modalBody));
          } else if (state === "comment") {
            if (parseInt(modal.dataset.prevcount) == parseInt(entry.comments.length)) {
              return;
            }

            modal.dataset.prevcount = entry.comments.length;
            const wrapper = modalBody.querySelector('div');
            wrapper.replaceChild(SeeComments(entry.comments), getElem("see-comment-content", wrapper));
          }
        });
    }

  }, POLL_INTERVAL);

  return modal;
}

export default BootstrapModal;
