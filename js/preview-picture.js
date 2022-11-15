import { renderBigPicture } from './big-picture.js';
import { createPhotoCards } from './data.js';

const picturesContainer = document.querySelector('.pictures');

const previewPhotoCards = createPhotoCards();

const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');


const renderPhotoCards = (photoCards) => {

  const photoCardsFragment = document.createDocumentFragment();

  photoCards.forEach((photoCard) => {
    const photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photoCard.url;
    photoElement.querySelector('.picture__likes').textContent = photoCard.likes;
    photoElement.querySelector('.picture__comments').textContent = photoCard.comments.length;

    photoCardsFragment.append(photoElement);

    photoElement.addEventListener('click', () => renderBigPicture(photoCard));
  });

  return photoCardsFragment;
};

const renderPictures = () => picturesContainer.append(renderPhotoCards(previewPhotoCards));

export { renderPictures, picturesContainer };
