const bigPictureContainer = document.querySelector('.big-picture');
const image = bigPictureContainer.querySelector('.big-picture__img img');
const likesCount = bigPictureContainer.querySelector('.likes-count');
const commentsCount = bigPictureContainer.querySelector('.comments-count');
const socialCaption = bigPictureContainer.querySelector('.social__caption');
const commentsContainer = bigPictureContainer.querySelector('.social__comments');
const commentElement = commentsContainer.querySelector('.social__comment');

const renderComments = (comments) => {
  commentsContainer.innerHTML = '';

  comments.forEach((comment) => {
    const commentTemplate = commentElement.cloneNode(true);
    commentTemplate.querySelector('.social__picture').src = comment.avatar;
    commentTemplate.querySelector('.social__picture').alt = comment.name;
    commentTemplate.querySelector('.social__text').textContent = comment.message;

    commentsContainer.append(commentTemplate);
  });
};

const renderBigPicture = (data) => {
  image.src = data.url;
  socialCaption.textContent = data.description;
  likesCount.textContent = data.likes;
  commentsCount.textContent = data.comments.length;
  renderComments(data.comments);
};

export { bigPictureContainer, renderBigPicture };
