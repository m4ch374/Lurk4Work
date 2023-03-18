const BootstrapModal = () => {
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

export default BootstrapModal;
