import { checkStringLength } from './util.js';

const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_AMOUNT_OF_HASHTAGS = 5;
const MAX_LENGTH_OF_COMMENT = 140;

const uploadForm = document.querySelector('.img-upload__form');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');

const getHashtagsList = () => hashtagsField.value.toLowerCase().trim().split(/\s+/);

const checkUniqueHashtags = (hashtagsList) => {
  if (hashtagsList.length > 1) {
    return !hashtagsList.some((hashtag, index, hashtags) => hashtags.includes(hashtag, index + 1));
  }
  return true;
};

const checkHashtagsList = (hashtagsList) => hashtagsList.every((hashtag) => VALID_SYMBOLS.test(hashtag));

const validateHashtags = () => {
  const hashtagsList = getHashtagsList();
  if (!hashtagsField.value || hashtagsList.length === 0) {
    return true;
  }
  return hashtagsList.length <= MAX_AMOUNT_OF_HASHTAGS && checkHashtagsList(hashtagsList) && checkUniqueHashtags(hashtagsList);
};

const validateComment = () => {
  if (!commentField.value) {
    return true;
  }
  return checkStringLength(commentField.value, MAX_LENGTH_OF_COMMENT);
};

const getHashtagErrorMessage = () => {
  const hashtagsList = getHashtagsList();
  if (hashtagsList.length > MAX_AMOUNT_OF_HASHTAGS) {
    return `Максимальное количество хэштегов: ${MAX_AMOUNT_OF_HASHTAGS}`;
  }
  if (!checkUniqueHashtags(hashtagsList)) {
    return 'Хэштеги не должны повторяться';
  }
  return 'Хэштег введен некорректно';
};

const getCommentErrorMessage = () => `Максимальное количество символов: ${MAX_LENGTH_OF_COMMENT}`;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'text-error'
});

pristine.addValidator(
  hashtagsField,
  validateHashtags,
  getHashtagErrorMessage
);

pristine.addValidator(
  commentField,
  validateComment,
  getCommentErrorMessage
);

export { pristine, uploadForm, hashtagsField, commentField };
