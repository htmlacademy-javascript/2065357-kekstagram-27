import { renderPictures } from './preview-picture.js';
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

const setFilterRandom = (pictures) => getUniqueRandomElementsArray(pictures, LENGTH_OF_ARRAY);

const setFilterDiscussed = (pictures) => {
  const popularPictures = pictures.slice().sort((picture1, picture2) => picture2.comments.length - picture1.comments.length);
  return popularPictures;
};

const makeButtonActive = (evt) => {
  if (evt.target.closest('.img-filters__button')) {
    evt.target.classList.add('img-filters__button--active');
    filtersButtons.forEach((button) => {
      if (evt.target !== button) {
        button.classList.remove('img-filters__button--active');
      }
    });
  }
};


const setFilterClick = (pictures) => {
  filtersContainer.addEventListener('click', debounce((evt) => {
    makeButtonActive(evt);
    resetPictures();
    switch (evt.target) {
      case filterDefaultButton:
        renderPictures(pictures);
        break;
      case filterRandomButton:
        renderPictures(setFilterRandom(pictures));
        break;
      case filterDiscussedButton:
        renderPictures(setFilterDiscussed(pictures));
        break;
    }
  }));
};

export { showFilters, setFilterClick };
