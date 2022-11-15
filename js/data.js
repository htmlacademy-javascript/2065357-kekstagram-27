import { getRandomInteger, getRandomArrayElement } from './util.js';

const PHOTOS_COUNT = 25;
const COMMENTS_MAX_COUNT = 10;
const LIKES = {
  MIN: 15,
  MAX: 200
};

const commentsText = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
  'Иван',
  'Оля',
  'Санек',
  'Колян',
  'Макс',
  'Влад',
];

const createComment = (count) => ({
  id: count,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(commentsText),
  name: getRandomArrayElement(names)
});

const createComments = (count) => Array.from({ length: count }, (_, index) => createComment(index + 1));

const createPhotoCard = (count) => ({
  id: count,
  url: `photos/${count}.jpg`,
  description: `description__${getRandomInteger(20, 100)}`,
  likes: getRandomInteger(LIKES.MIN, LIKES.MAX),
  comments: createComments(getRandomInteger(1, COMMENTS_MAX_COUNT))
});

const createPhotoCards = () => Array.from({ length: PHOTOS_COUNT }, (_, index) => createPhotoCard(index + 1));

export { createPhotoCards };
