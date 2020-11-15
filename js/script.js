'use strict';
(function () {
  const ACTIVITY_LEVEL = {
    min: 1.2,
    low: 1.375,
    middle: 1.55,
    high: 1.725,
    max: 1.9
  };

  let sexList = document.querySelectorAll('.sex__input');
  let parametersList = document.querySelectorAll('.parameters__input');
  let activityList = document.querySelectorAll('.activity__input');
  let resultForm = document.querySelector('.result');

  // по формуле Миффлина-Сан Жеора
  let baseMetabolism;
  let activeMetabolism;
  let formula;

  let computeButton = document.querySelector('.compute-button');
  let resetButton = document.querySelector('.reset-button');

  let resultBase = document.querySelector('.result__base');
  let resultLoss = document.querySelector('.result__loss-flesh');
  let resultGrowth = document.querySelector('.result__growth');

  let formValidation = {
    sexIsValid: false,
    parametersIsValid: false,
    activityIsValid: false
  };

  let isValid;

  let getCheckedInput = function (array) {
    let result;
    for (let i = 0; i < array.length; i++) {
      if (array[i].checked) {
        result = array[i].id;
      }
    }

    return result;
  };

  let getElementValidation = function (array) {
    let isValidElement;
    let counter = 0;
    switch (true) {
      case array[0].type === 'radio':
        array.forEach(function (item) {
          if (!item.checked) {
            counter++;
          }
        });
        if (counter === array.length) {
          isValidElement = false;
        } else {
          isValidElement = true;
        }
        break;
      case array[0].type === 'text':
        array.forEach(function (item) {
          if (item.value === '') {
            counter++;
          }
        });
        if (counter > 0) {
          isValidElement = false;
        } else {
          isValidElement = true;
        }
        break;
    }
    return isValidElement;
  };

  let getFormValidation = function (obj) {
    let validCounter = 0;

    for (let key in obj) {
      if (obj[key]) {
        validCounter++;
      }
    }

    if (validCounter === Object.keys(obj).length) {
      isValid = true;
    } else {
      isValid = false;
    }
  };

  let getBaseMetabolism = function () {
    let gender = getCheckedInput(sexList);
    let age = Number(parametersList[0].value);
    let height = Number(parametersList[1].value);
    let weight = Number(parametersList[2].value);

    if (gender === 'male') {
      baseMetabolism = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else if (gender === 'female') {
      baseMetabolism = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
  };

  let getActiveMetabolism = function () {
    let checkedActivity = getCheckedInput(activityList);
    activeMetabolism = ACTIVITY_LEVEL[checkedActivity];
  };

  let getResult = function () {
    getBaseMetabolism();
    getActiveMetabolism();
    formula = baseMetabolism * activeMetabolism;

    resultBase.value = Math.round(formula) + ' ккал';
    resultLoss.value = Math.round(formula * 0.7) + ' ккал';
    resultGrowth.value = Math.round(formula * 1.7) + ' ккал';
    resultForm.style.display = 'block';
  };

  let validation = function () {
    formValidation.sexIsValid = getElementValidation(sexList);
    formValidation.parametersIsValid = getElementValidation(parametersList);
    formValidation.activityIsValid = getElementValidation(activityList);

    getFormValidation(formValidation);
  };

  for (let j = 0; j < parametersList.length; j++) {
    let parametersInput = parametersList[j];

    parametersInput.addEventListener('keyup', function () {
      parametersInput.value = parametersInput.value.replace(/[A-Za-zА-Яа-яЁё]/g, '');
    });
  }

  computeButton.addEventListener('click', function () {
    validation();

    if (isValid) {
      getResult();
    } else {
      alert('Заполните пустые поля!');
    }
  });

  resetButton.addEventListener('click', function () {
    resultForm.style.display = 'none';
    resultBase.value = '';
    resultLoss.value = '';
    resultGrowth.value = '';
  });

})();
