const ModalHeader = () => {
  const modalHeader = document.createElement('div');
  modalHeader.className = "modal-header mb-0";

  const modalTitle = document.createElement('h2');
  modalTitle.className = "modal-title fs-2";
  modalTitle.textContent = "Error";

  const closeBtn = document.createElement('button');
  closeBtn.type = "button";
  closeBtn.className = "btn-close error-close";

  modalHeader.append(modalTitle, closeBtn);
  return modalHeader;
}

const AuthErrorModal = () => {
  const modal = document.createElement('dialog');
  modal.className = "rounded-3 border-0 auth-modal";
  modal.id = "error-modal";

  const modalContent = document.createElement('div');
  modalContent.className = "modal-content";

  const modalHeader = ModalHeader();

  const modalBody = document.createElement('div');
  modalBody.className = "modal-body mb-4";
  modalBody.id = "error-msg";

  const modalFooter = document.createElement('div');
  modalFooter.className = "modal-footer";

  const footerClose = document.createElement('button');
  footerClose.type = "button";
  footerClose.className = "btn btn-primary error-close"
  footerClose.textContent = "Close";

  modalFooter.appendChild(footerClose);

  modalContent.append(modalHeader, modalBody, modalFooter);
  modal.append(modalContent);

  modal.querySelectorAll('.error-close').forEach(e => {
    e.addEventListener("click", () => {
      modal.close();
    });
  });

  window.onclick = e => {
    if (e.target == modal) {
      modal.close();
    }
  }

  return modal;
}

export default AuthErrorModal;
