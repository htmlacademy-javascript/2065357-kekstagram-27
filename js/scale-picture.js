import { previewPicture } from './form.js';

const SCALE_SETTINGS = {
  MIN_VALUE: 25,
  MAX_VALUE: 100,
  STEP: 25,
  DEFAULT_VALUE: 100
};
const scaleField = document.querySelector('.scale__control--value');

const setDefaultScale = () => {
  scaleField.value = `${SCALE_SETTINGS.DEFAULT_VALUE}%`;
  previewPicture.style.scale = scaleField.value;
};

const scaleUpClickHandler = () => {
  const scaleValueNumber = parseInt(scaleField.value, 10);
  if (scaleValueNumber !== SCALE_SETTINGS.MAX_VALUE) {
    scaleField.value = `${scaleValueNumber + SCALE_SETTINGS.STEP}%`;
    previewPicture.style.scale = scaleField.value;
  }
};

const scaleDownClickHandler = () => {
  const scaleValueNumber = parseInt(scaleField.value, 10);
  if (scaleValueNumber !== SCALE_SETTINGS.MIN_VALUE) {
    scaleField.value = `${scaleValueNumber - SCALE_SETTINGS.STEP}%`;
    previewPicture.style.scale = scaleField.value;
  }
};

export { setDefaultScale, scaleUpClickHandler, scaleDownClickHandler };
