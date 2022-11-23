const MAX_VISIBLE_OF_COMMENTS = 5;

const bigPictureContainer = document.querySelector('.big-picture');
const image = bigPictureContainer.querySelector('.big-picture__img img');
const likesCount = bigPictureContainer.querySelector('.likes-count');
const commentsCount = bigPictureContainer.querySelector('.comments-count');
const commentsLoadButton = bigPictureContainer.querySelector('.comments-loader');
const commentsCountInfoBlock = bigPictureContainer.querySelector('.social__comment-count');
const socialCaption = bigPictureContainer.querySelector('.social__caption');
const commentsContainer = bigPictureContainer.querySelector('.social__comments');
const comment = commentsContainer.querySelector('.social__comment');

let countCommentVisible = MAX_VISIBLE_OF_COMMENTS;
const renderComments = (comments) => {

  commentsContainer.innerHTML = '';
  countCommentVisible = MAX_VISIBLE_OF_COMMENTS;

  comments.forEach((item) => {
    const commentTemplate = comment.cloneNode(true);
    commentTemplate.classList.add('hidden');
    commentTemplate.querySelector('.social__picture').src = item.avatar;
    commentTemplate.querySelector('.social__picture').alt = item.name;
    commentTemplate.querySelector('.social__text').textContent = item.message;

    commentsContainer.append(commentTemplate);

  });
};

const showCommentsHandler = () => {
  const comments = bigPictureContainer.querySelectorAll('.social__comment');

  for (let i = 0; i < countCommentVisible && i < comments.length; i++) {
    comments[i].classList.remove('hidden');

    commentsCountInfoBlock.textContent = `${i + 1} из ${comments.length} комментариев`;
    commentsLoadButton.classList.remove('hidden');
    if (i === comments.length - 1) {
      commentsLoadButton.classList.add('hidden');
    }
  }

  countCommentVisible += MAX_VISIBLE_OF_COMMENTS;
};

const renderBigPicture = (data) => {
  image.src = data.url;
  socialCaption.textContent = data.description;
  likesCount.textContent = data.likes;
  commentsCount.textContent = data.comments.length;
  renderComments(data.comments);
  showCommentsHandler();
};

export { bigPictureContainer, commentsLoadButton, renderBigPicture, showCommentsHandler };
