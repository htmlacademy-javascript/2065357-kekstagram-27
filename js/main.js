import './preview-picture.js';
import './big-picture.js';
import './modal.js';
import './form.js';
import './effects.js';
import { sendRequest } from './api.js';
import { renderDefaultPictures } from './preview-picture.js';
import { showGetErrorMessage } from './message.js';
import { showFilters } from './filter.js';

sendRequest(() => {
  renderDefaultPictures();
  showFilters();
}, showGetErrorMessage, 'GET');
