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
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }
  return isValid;
};

export const inputValueChangedHandler = (
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
    },
  };
  setControlsFn(updatedControls);
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
