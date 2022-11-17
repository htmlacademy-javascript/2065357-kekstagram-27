import { commentField, hashtagsField, pristine, uploadForm } from './validate.js';
import { effectsClickHandler, setDefaultEffect } from './effects.js';

const SCALE_SETTINGS = {
  MIN_VALUE: 25,
  MAX_VALUE: 100,
  STEP: 25,
  DEFAULT_VALUE: 100
};
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadField = uploadForm.querySelector('#upload-file');
const closeButton = uploadForm.querySelector('#upload-cancel');
const scaleField = uploadForm.querySelector('.scale__control--value');
const scaleUpButton = uploadForm.querySelector('.scale__control--bigger');
const scaleDownButton = uploadForm.querySelector('.scale__control--smaller');
const previewPicture = uploadForm.querySelector('.img-upload__preview img');
const effectsContainer = uploadForm.querySelector('.img-upload__effects');

const setDefaultScaleValue = () => {
  scaleField.value = `${SCALE_SETTINGS.DEFAULT_VALUE}%`;
  previewPicture.style.scale = scaleField.value;
};

const resetForm = () => {
  uploadField.value = '';
  hashtagsField.value = '';
  commentField.value = '';
  pristine.reset();
};

const closeUploadFormHandler = () => {
  uploadOverlay.classList.add('hidden');
  resetForm();
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escapeKeydownHandler);
  closeButton.removeEventListener('click', closeUploadFormHandler);
  uploadOverlay.removeEventListener('click', uploadOverlayClickHandler);
  effectsContainer.removeEventListener('click', effectsClickHandler);
};

const showUploadForm = () => {
  setDefaultScaleValue();
  setDefaultEffect();
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', escapeKeydownHandler);
  closeButton.addEventListener('click', closeUploadFormHandler);
  uploadOverlay.addEventListener('click', uploadOverlayClickHandler);
  effectsContainer.addEventListener('click', effectsClickHandler);
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

scaleUpButton.addEventListener('click', () => {
  const scaleValueNumber = parseInt(scaleField.value, 10);
  if (scaleValueNumber !== SCALE_SETTINGS.MAX_VALUE) {
    scaleField.value = `${scaleValueNumber + SCALE_SETTINGS.STEP}%`;
    previewPicture.style.scale = scaleField.value;
  }
});

scaleDownButton.addEventListener('click', () => {
  const scaleValueNumber = parseInt(scaleField.value, 10);
  if (scaleValueNumber !== SCALE_SETTINGS.MIN_VALUE) {
    scaleField.value = `${scaleValueNumber - SCALE_SETTINGS.STEP}%`;
    previewPicture.style.scale = scaleField.value;
  }
});

uploadField.addEventListener('change', showUploadForm);

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

export { previewPicture };
