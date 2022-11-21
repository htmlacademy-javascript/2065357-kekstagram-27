import { commentField, hashtagsField, pristine, uploadForm } from './validate.js';
import { effectsClickHandler, resetPictureEffects } from './effects.js';
import { scaleDownClickHandler, scaleUpClickHandler } from './scale-picture.js';
import { sendRequest } from './api.js';
import { showErrorMessage, showSuccessMessage, postErrorMessage } from './message.js';
import { resetPhotoFields, setUserLoadPhoto } from './upload-photo.js';
import { isEscapeKey } from './util.js';

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
  resetPhotoFields();
};

const closeUploadFormHandler = () => {
  uploadOverlay.classList.add('hidden');
  resetForm(uploadForm);
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escapeKeydownHandler);
  closeButton.removeEventListener('click', closeUploadFormHandler);
  scaleUpButton.removeEventListener('click', scaleUpClickHandler);
  scaleDownButton.removeEventListener('click', scaleDownClickHandler);
  effectsContainer.removeEventListener('click', effectsClickHandler);
};

const showUploadFormHandler = () => {
  resetPictureEffects();
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', escapeKeydownHandler);
  closeButton.addEventListener('click', closeUploadFormHandler);
  scaleUpButton.addEventListener('click', scaleUpClickHandler);
  scaleDownButton.addEventListener('click', scaleDownClickHandler);
  effectsContainer.addEventListener('click', effectsClickHandler);
  setUserLoadPhoto(uploadField);
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

function escapeKeydownHandler(evt) {
  if (document.body.lastChild === postErrorMessage) {
    return;
  }

  if (isEscapeKey && !checkFocus(evt)) {
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
        closeUploadFormHandler();
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

export { previewPicture, uploadField };
