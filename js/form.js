import { commentField, hashtagsField, pristine, uploadForm } from './validate.js';
import { effectsClickHandler, resetPictureEffects } from './effects.js';
import { scaleDownClickHandler, scaleUpClickHandler } from './scale-picture.js';
import { sendRequest } from './api.js';
import { showErrorMessage, showSuccessMessage, postSuccessMessage, postErrorMessage } from './message.js';


const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadField = uploadForm.querySelector('#upload-file');
const closeButton = uploadForm.querySelector('#upload-cancel');
const previewPicture = uploadForm.querySelector('.img-upload__preview img');
const scaleUpButton = document.querySelector('.scale__control--bigger');
const scaleDownButton = document.querySelector('.scale__control--smaller');
const effectsContainer = uploadForm.querySelector('.img-upload__effects');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const resetForm = (form) => {
  form.reset();
  uploadField.value = '';
  hashtagsField.value = '';
  commentField.value = '';
  pristine.reset();
  resetPictureEffects();
};

const closeUploadFormHandler = () => {
  uploadOverlay.classList.add('hidden');
  resetForm(uploadForm);
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escapeKeydownHandler);
  closeButton.removeEventListener('click', closeUploadFormHandler);
  uploadOverlay.removeEventListener('click', uploadOverlayClickHandler);
  effectsContainer.removeEventListener('click', effectsClickHandler);
  scaleUpButton.removeEventListener('click', scaleUpClickHandler);
  scaleDownButton.removeEventListener('click', scaleDownClickHandler);
};

const showUploadFormHandler = () => {
  resetPictureEffects();
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', escapeKeydownHandler);
  closeButton.addEventListener('click', closeUploadFormHandler);
  uploadOverlay.addEventListener('click', uploadOverlayClickHandler);
  effectsContainer.addEventListener('click', effectsClickHandler);
  scaleUpButton.addEventListener('click', scaleUpClickHandler);
  scaleDownButton.addEventListener('click', scaleDownClickHandler);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикация...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const checkFocus = (evt) => evt.target.className === 'text__description' || evt.target.className === 'text__hashtags';

function uploadOverlayClickHandler(evt) {
  if (evt.target.className === 'img-upload__overlay') {
    closeUploadFormHandler();
  }
}

function escapeKeydownHandler(evt) {
  if (document.body.lastChild === postErrorMessage || document.body.lastChild === postSuccessMessage) {
    return;
  }

  if (evt.key === 'Escape' && !checkFocus(evt)) {
    evt.preventDefault();
    closeUploadFormHandler();
  }
}

uploadField.addEventListener('change', showUploadFormHandler);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    sendRequest(
      () => {
        showSuccessMessage();
        resetForm(evt.target);
        unblockSubmitButton();
      },
      () => {
        showErrorMessage();
        unblockSubmitButton();
      },
      'POST',
      new FormData(evt.target)
    );
  }
});

export { previewPicture };
