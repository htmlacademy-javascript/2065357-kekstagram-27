import { previewPicture } from './form.js';
import { setDefaultScale } from './scale-picture.js';

const EFFECTS_SETTINGS = {
  none: {
    class: 'effects__preview--none',
    filter: 'none',
    unit: '',
    min: 0,
    max: 100,
    step: 1
  },
  chrome: {
    class: 'effects__preview--chrome',
    filter: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  sepia: {
    class: 'effects__preview--sepia',
    filter: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  marvin: {
    class: 'effects__preview--marvin',
    filter: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1
  },
  phobos: {
    class: 'effects__preview--phobos',
    filter: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1
  },
  heat: {
    class: 'effects__preview--heat',
    filter: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1
  },
};
const DEFAULT_EFFECT = 'none';

const uploadFormSlider = document.querySelector('.effect-level__slider');
const sliderField = document.querySelector('.effect-level');
const effectLevel = document.querySelector('.effect-level__value');

noUiSlider.create(uploadFormSlider, {
  range: {
    min: 0,
    max: 100
  },
  start: 0,
  step: 1,
  connect: 'lower'
});

const setEffectSettings = (effect) => {

  sliderField.classList.remove('hidden');
  if (effect === DEFAULT_EFFECT) {
    sliderField.classList.add('hidden');
  }

  previewPicture.removeAttribute('class');
  previewPicture.removeAttribute('style');
  previewPicture.classList.add(EFFECTS_SETTINGS[effect].class);

  uploadFormSlider.noUiSlider.updateOptions({
    range: {
      min: EFFECTS_SETTINGS[effect].min,
      max: EFFECTS_SETTINGS[effect].max,
    },
    step: EFFECTS_SETTINGS[effect].step,
    start: EFFECTS_SETTINGS[effect].max,
  });

  uploadFormSlider.noUiSlider.on('slide', () => {
    const sliderValue = uploadFormSlider.noUiSlider.get();
    effectLevel.value = sliderValue;
    previewPicture.style.filter = `${EFFECTS_SETTINGS[effect].filter}(${sliderValue}${EFFECTS_SETTINGS[effect].unit})`;
  });
};

const resetPictureEffects = () => {
  setEffectSettings(DEFAULT_EFFECT);
  setDefaultScale();
};

const effectsClickHandler = (evt) => {
  if (evt.target.closest('.effects__radio')) {
    setEffectSettings(evt.target.value);
    setDefaultScale();
  }
};

export { effectsClickHandler, resetPictureEffects };
