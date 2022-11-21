import './preview-picture.js';
import './big-picture.js';
import './modal.js';
import './form.js';
import './effects.js';
import { sendRequest } from './api.js';
import { renderDefaultPictures } from './preview-picture.js';
import { showGetErrorMessage } from './message.js';
import { showFilters, setFilterClick } from './filter.js';

sendRequest((pictures) => {
  renderDefaultPictures();
  showFilters();
  setFilterClick(pictures);
}, showGetErrorMessage, 'GET');
