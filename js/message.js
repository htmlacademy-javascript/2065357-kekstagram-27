import { isEscapeKey } from './util.js';

const ERROR_SHOW_TIME = 5000;

const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const postSuccessMessage = successMessageTemplate.cloneNode(true);
const postErrorMessage = errorMessageTemplate.cloneNode(true);

const requestErrorMessage = `<div style="
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                z-index: 100;
                                font-size: 50px;
                                font-weight: 700;
                                color: #ff4e4e;
                                width: 700px;
                                height: 250px;
                                position: absolute;
                                left: 50%;
                                top: 230px;
                                transform: translateX(-50%);
                                background-color: rgba(0,0,0, 0.95);
                                border-radius: 20px;">Ошибка загрузки данных
                            </div>`;

const closeSuccessMessage = () => {
  postSuccessMessage.remove();
  document.removeEventListener('keydown', messageEscapeKeydownHandler);
  document.removeEventListener('click', messageClickHandler);
};

const closeErrorMessage = () => {
  postErrorMessage.remove();
  document.removeEventListener('keydown', messageEscapeKeydownHandler);
  document.removeEventListener('click', messageClickHandler);
};

const showSuccessMessage = () => {
  document.body.append(postSuccessMessage);
  document.addEventListener('keydown', messageEscapeKeydownHandler);
  document.addEventListener('click', messageClickHandler);
};

const showErrorMessage = () => {
  document.body.append(postErrorMessage);
  document.addEventListener('keydown', messageEscapeKeydownHandler);
  document.addEventListener('click', messageClickHandler);
};

const showGetErrorMessage = () => {
  document.querySelector('.pictures').innerHTML += requestErrorMessage;
  setTimeout(() => document.querySelector('.pictures').lastChild.remove(), ERROR_SHOW_TIME);
};

function messageClickHandler(evt) {
  if (evt.target.className === 'success' || evt.target.className === 'error' || evt.target.tagName === 'BUTTON') {
    closeSuccessMessage();
    closeErrorMessage();
  }
}

function messageEscapeKeydownHandler(evt) {
  evt.preventDefault();
  if (isEscapeKey) {
    closeSuccessMessage();
    closeErrorMessage();
  }
}

export { postSuccessMessage, postErrorMessage, showSuccessMessage, showErrorMessage, showGetErrorMessage };
