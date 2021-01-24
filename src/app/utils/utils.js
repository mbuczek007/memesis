import getVideoId from 'get-video-id';

export const checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.passwordCheck) {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.url) {
    const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};

export const inputChangeHandler = (
  value,
  controlName,
  controls,
  setControlsFn
) => {
  const updatedControls = {
    ...controls,
    [controlName]: {
      ...controls[controlName],
      value: value,
      valid: checkValidity(value, controls[controlName].validation),
      touched: true,
    },
  };
  setControlsFn(updatedControls);
};

export const convertToArray = (array) => {
  const formElementsArray = [];

  for (let key in array) {
    formElementsArray.push({
      id: key,
      config: array[key],
    });
  }

  return formElementsArray;
};

export const getVideoIdFromUrl = (value) => {
  const video = getVideoId(value);

  return video.id;
};

export const checkExternalImage = (imageSrc, callback) => {
  let img = new Image();

  img.onload = function () {
    callback(true);
  };

  img.onerror = function () {
    callback(false);
  };

  img.src = imageSrc;
};

export const checkYtVideo = (videoSrc, callback) => {
  let img = new Image();

  img.onload = function () {
    if (img.width === 120) {
      callback(false);
    } else {
      callback(true);
    }
  };

  img.src =
    'https://img.youtube.com/vi/' +
    getVideoIdFromUrl(videoSrc) +
    '/mqdefault.jpg';
};
