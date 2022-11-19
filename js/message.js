const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const postSuccessMessage = successMessageTemplate.cloneNode(true);
const postErrorMessage = errorMessageTemplate.cloneNode(true);
const errorButton = postErrorMessage.querySelector('.error__button');

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

const successMessageClickHadler = () => {
  postSuccessMessage.remove();
  document.removeEventListener('keydown', messageEscapeKeydownHandler);
  document.removeEventListener('click', successMessageClickHadler);
};

const errorMessageClickHadler = () => {
  postErrorMessage.remove();
  document.removeEventListener('keydown', messageEscapeKeydownHandler);
  document.removeEventListener('click', errorMessageClickHadler);
  errorButton.removeEventListener('click', errorMessageClickHadler);
};

const showSuccessMessage = () => {
  document.body.append(postSuccessMessage);
  document.addEventListener('keydown', messageEscapeKeydownHandler);
  document.addEventListener('click', successMessageClickHadler);
};

const showErrorMessage = () => {
  document.body.append(postErrorMessage);
  document.addEventListener('keydown', messageEscapeKeydownHandler);
  document.addEventListener('click', errorMessageClickHadler);
  errorButton.addEventListener('click', errorMessageClickHadler);
};

const showGetErrorMessage = () => {
  document.querySelector('.pictures').innerHTML += requestErrorMessage;
  setTimeout(() => document.querySelector('.pictures').lastChild.remove(), 5000);
};

function messageEscapeKeydownHandler(evt) {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    successMessageClickHadler();
    errorMessageClickHadler();
  }
}

export { postSuccessMessage, postErrorMessage, showSuccessMessage, showErrorMessage, showGetErrorMessage };
