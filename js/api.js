const Urls = {
  GET: 'https://27.javascript.pages.academy/kekstagram/data',
  POST: 'https://27.javascript.pages.academy/kekstagram',
};

const sendRequest = (onSuccess, onError, method, data) => {
  fetch(
    Urls[method],
    {
      method: method,
      body: data,
    },
  )
    .then((response) => response.json())
    .then((values) => {
      onSuccess(values);
    }).catch(() => {
      onError();
    });
};

export { sendRequest };
