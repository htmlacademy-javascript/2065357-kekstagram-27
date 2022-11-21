import { picturesContainer } from './preview-picture.js';
import { bigPictureContainer, commentsLoadButton, showCommentsHandler } from './big-picture.js';
import { isEscapeKey } from './util.js';

const modalCloseBtn = bigPictureContainer.querySelector('.big-picture__cancel');

const closeModalHandler = () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escapeKeydownHandler);
  modalCloseBtn.removeEventListener('click', closeModalHandler);

  commentsLoadButton.removeEventListener('click', showCommentsHandler);
};

const showModal = () => {
  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', escapeKeydownHandler);
  modalCloseBtn.addEventListener('click', closeModalHandler);

  commentsLoadButton.addEventListener('click', showCommentsHandler);
};

picturesContainer.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    showModal();
  }
});

function escapeKeydownHandler(evt) {
  evt.preventDefault();
  if (isEscapeKey) {
    closeModalHandler();
  }
}
