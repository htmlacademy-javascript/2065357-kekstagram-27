import { commentField, hashtagsField, pristine, uploadForm } from './validate.js';

const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadField = document.querySelector('#upload-file');
const closeButton = uploadForm.querySelector('#upload-cancel');

const closeUploadFormHandler = () => {
  uploadField.value = '';
  hashtagsField.value = '';
  commentField.value = '';
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('.modal-open');
  document.removeEventListener('keydown', escapeKeydownHandler);
  closeButton.removeEventListener('click', closeUploadFormHandler);
  uploadOverlay.removeEventListener('click', uploadOverlayClickHandler);
};

const showUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('.modal-open');
  document.addEventListener('keydown', escapeKeydownHandler);
  closeButton.addEventListener('click', closeUploadFormHandler);
  uploadOverlay.addEventListener('click', uploadOverlayClickHandler);
};

const checkFocus = (evt) => evt.target.className === 'text__description' || evt.target.className === 'text__hashtags';

function uploadOverlayClickHandler(evt) {
  if (evt.target.className === 'img-upload__overlay') {
    closeUploadFormHandler();
  }
}

function escapeKeydownHandler(evt) {
  if (evt.key === 'Escape' && !checkFocus(evt)) {
    evt.preventDefault();
    closeUploadFormHandler();
  }
}

uploadField.addEventListener('change', showUploadForm);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
