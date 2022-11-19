import { sendRequest } from './api.js';
import { showGetErrorMessage } from './message.js';
import { renderDefaultPictures, renderPictures } from './preview-picture.js';
import { debounce, getUniqueRandomElementsArray } from './util.js';

const LENGTH_OF_ARRAY = 10;

const filtersContainer = document.querySelector('.img-filters');
const filtersButtons = filtersContainer.querySelectorAll('.img-filters__button');
const filterDefaultButton = filtersContainer.querySelector('#filter-default');
const filterRandomButton = filtersContainer.querySelector('#filter-random');
const filterDiscussedButton = filtersContainer.querySelector('#filter-discussed');

const resetPictures = () => {
  const pictures = document.querySelectorAll('.pictures .picture');
  pictures.forEach((picture) => picture.remove());
};

const showFilters = () => filtersContainer.classList.remove('img-filters--inactive');

const setFilterDefault = () => renderDefaultPictures();

const setFilterRandom = () => {
  sendRequest((pictures) => {
    renderPictures(getUniqueRandomElementsArray(pictures, LENGTH_OF_ARRAY));
  }, showGetErrorMessage, 'GET');
};

const setFilterDiscussed = () => {
  sendRequest((pictures) => {
    const popularPictures = pictures.slice().sort((picture1, picture2) => picture2.comments.length - picture1.comments.length);
    renderPictures(popularPictures);
  }, showGetErrorMessage, 'GET');
};

const setFilter = (evt) => {
  switch (evt) {
    case filterDefaultButton:
      setFilterDefault();
      break;
    case filterRandomButton:
      setFilterRandom();
      break;
    case filterDiscussedButton:
      setFilterDiscussed();
      break;
  }
};

filtersContainer.addEventListener('click', debounce((evt) => {
  if (evt.target.closest('.img-filters__button')) {
    resetPictures();
    evt.target.classList.add('img-filters__button--active');
    filtersButtons.forEach((button) => {
      if (evt.target !== button) {
        button.classList.remove('img-filters__button--active');
      }
    });
    setFilter(evt.target);
  }
}));

export { showFilters };
