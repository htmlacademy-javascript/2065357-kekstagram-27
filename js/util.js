const getRandomInteger = (min, max) => {

  if (Math.sign(max) === -1 || Math.sign(min) === -1 || max === min || max < min) {
    return NaN;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkStringLength = (string, maxLength) => string.length <= maxLength;

const getRandomArrayElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];

const getUniqueRandomElementsArray = (arr, length) => {
  const someValues = [];
  while (someValues.length < length) {
    const currentElement = getRandomArrayElement(arr);
    if (!someValues.includes(currentElement)) {
      someValues.push(currentElement);
    }
  }
  return someValues;
};

const debounce = (callback, timeoutDelay = 500) => {

  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getRandomInteger, checkStringLength, getUniqueRandomElementsArray, debounce };
