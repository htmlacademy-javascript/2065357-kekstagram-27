import './preview-picture.js';
import './big-picture.js';
import './modal.js';
import './form.js';
import './effects.js';
import { sendRequest } from './api.js';
import { renderPictures } from './preview-picture.js';
import { showGetErrorMessage } from './message.js';

sendRequest((pictures) => {
  renderPictures(pictures);
}, showGetErrorMessage, 'GET');
