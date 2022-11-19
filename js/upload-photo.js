import { previewPicture } from './form.js';

const FILE_TYPES = ['jpeg', 'jpg', 'svg', 'png', 'gif'];
const DEFAULT_PHOTO_ADDRESS = 'img/upload-default-image.jpg';

const miniPreviewPictures = document.querySelectorAll('.effects__preview');

const setUserLoadPhoto = (field) => {
  const photo = field.files[0];
  const photoName = photo.name.toLowerCase();

  const match = FILE_TYPES.some((type) => photoName.endsWith(type));
  if (match) {
    previewPicture.src = URL.createObjectURL(photo);
    miniPreviewPictures.forEach((picture) => {
      picture.style.backgroundImage = `url(${URL.createObjectURL(photo)})`;
      picture.style.backgroundSize = 'cover';
    });
  }
};

const resetPhotoFields = () => {
  previewPicture.src = DEFAULT_PHOTO_ADDRESS;
  miniPreviewPictures.forEach((picture) => {
    picture.style.backgroundImage = DEFAULT_PHOTO_ADDRESS;
    picture.style.backgroundSize = 'cover';
  });
};

export { resetPhotoFields, setUserLoadPhoto };
