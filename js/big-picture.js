const bigPictureContainer = document.querySelector('.big-picture');
const image = bigPictureContainer.querySelector('.big-picture__img img');
const likesCount = bigPictureContainer.querySelector('.likes-count');
const commentsCount = bigPictureContainer.querySelector('.comments-count');
const commentsLoadButton = bigPictureContainer.querySelector('.comments-loader');
const commentsCountInfoBlock = bigPictureContainer.querySelector('.social__comment-count');
const socialCaption = bigPictureContainer.querySelector('.social__caption');
const commentsContainer = bigPictureContainer.querySelector('.social__comments');
const commentElement = commentsContainer.querySelector('.social__comment');

const MAX_VISIBLE_OF_COMMENTS = 5;

const renderComments = (comments) => {

  commentsContainer.innerHTML = '';

  let i = 0;

  const showComments = (count) => {
    while (i < count && i < comments.length) {
      const commentTemplate = commentElement.cloneNode(true);
      commentTemplate.querySelector('.social__picture').src = comments[i].avatar;
      commentTemplate.querySelector('.social__picture').alt = comments[i].name;
      commentTemplate.querySelector('.social__text').textContent = comments[i].message;

      commentsContainer.append(commentTemplate);

      i++;
    }
    commentsCountInfoBlock.textContent = `${i} из ${comments.length} комментариев`;
    commentsLoadButton.classList.remove('hidden');
    if (i === comments.length) {
      commentsLoadButton.classList.add('hidden');
    }
  };

  showComments(MAX_VISIBLE_OF_COMMENTS);

  let countCommentVisible = MAX_VISIBLE_OF_COMMENTS;
  commentsLoadButton.addEventListener('click', () => {
    countCommentVisible += MAX_VISIBLE_OF_COMMENTS;
    showComments(countCommentVisible);
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
