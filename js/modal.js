import { picturesContainer } from './preview-picture.js';
import { bigPictureContainer } from './big-picture.js';

const modalCloseBtn = bigPictureContainer.querySelector('.big-picture__cancel');
const bigPicturePreview = bigPictureContainer.querySelector('.big-picture__preview');

const closeModalHandler = () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escapeKeydownHandler);
  modalCloseBtn.removeEventListener('click', closeModalHandler);

  bigPictureContainer.removeEventListener('click', closeModalHandler);
  bigPicturePreview.removeEventListener('click', setStopPropagationHandler);
};

const showModal = () => {
  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', escapeKeydownHandler);
  modalCloseBtn.addEventListener('click', closeModalHandler);

  bigPictureContainer.addEventListener('click', closeModalHandler);
  bigPicturePreview.addEventListener('click', setStopPropagationHandler);
};

picturesContainer.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    showModal();
  }
});

function setStopPropagationHandler(evt) {
  evt.stopPropagation();
}

function escapeKeydownHandler(evt) {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    closeModalHandler();
  }
}
