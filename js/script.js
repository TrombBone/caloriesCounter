const maleButton = document.querySelector('#gender-male');
const femaleButton = document.querySelector('#gender-female');

const physicalParameters = document.querySelector('.inputs-group');
const age = physicalParameters.querySelector('#age');
const height = physicalParameters.querySelector('#height');
const weight = physicalParameters.querySelector('#weight');

const minimalActivity = document.querySelector('#activity-minimal');
const lowActivity = document.querySelector('#activity-low');
const mediumActivity = document.querySelector('#activity-medium');
const highActivity = document.querySelector('#activity-high');
const maximalActivity = document.querySelector('#activity-maximal');

const formSubmitButton = document.querySelector('.form__submit-button');
const formResetButton = document.querySelector('.form__reset-button');

const counterResult = document.querySelector('.counter__result');

const caloriesForStayWeight = counterResult.querySelector('#calories-norm');
const caloriesForLossWeight = counterResult.querySelector('#calories-minimal');
const caloriesForGainWeight = counterResult.querySelector('#calories-maximal');

// Коэффициенты активности
const MINIMAL_ACTIVITY_INDEX = 1.2;
const LOW_ACTIVITY_INDEX = 1.375;
const MEDIUM_ACTIVITY_INDEX = 1.55;
const HIGH_ACTIVITY_INDEX = 1.725;
const VERY_HIGH_ACTIVITY_INDEX = 1.9;

const DIFFERENCE_INDEX_LOSS = 0.15;
const DIFFERENCE_INDEX_GIAN = 0.15;

const calculateWeightStay = () => {
    // формулы поддеражния веса
    const weightControlMale = (10 * weight.value) + (6.25 * height.value) - (5 * age.value) + 5;
    const weightControlFemale = (10 * weight.value) + (6.25 * height.value) - (5 * age.value) - 161;

    let weightControl = weightControlMale;
    if (femaleButton.checked) weightControl = weightControlFemale;

    const activities = [minimalActivity, lowActivity, mediumActivity, highActivity, maximalActivity];
    const activityIndexes = [MINIMAL_ACTIVITY_INDEX, LOW_ACTIVITY_INDEX, MEDIUM_ACTIVITY_INDEX, HIGH_ACTIVITY_INDEX, VERY_HIGH_ACTIVITY_INDEX];
    let weightStay;
    for (let i = 0; i < activities.length; i++) {
        if (activities[i].checked) {
            weightStay = weightControl * activityIndexes[i];
            break;
        }
    }

    return weightStay;
}

const calculateWeight = () => {
    const weightStay = calculateWeightStay();

    const weightLoss = weightStay - (weightStay * DIFFERENCE_INDEX_LOSS);
    const weightGain = weightStay + (weightStay * DIFFERENCE_INDEX_GIAN);

    caloriesForStayWeight.textContent = weightStay.toFixed(2);
    caloriesForLossWeight.textContent = weightLoss.toFixed(2);
    caloriesForGainWeight.textContent = weightGain.toFixed(2);
};

const resetForms = () => {
    age.value = '';
    height.value = '';
    weight.value = '';
    minimalActivity.checked = true;
    maleButton.checked = true;
};

physicalParameters.oninput = function (evt) {
    if (age.value > 0 && height.value > 0 && weight.value > 0) formSubmitButton.removeAttribute('disabled');
    else formSubmitButton.setAttribute('disabled', 'disabled');

    if (evt.target.value > 0) formResetButton.removeAttribute('disabled');

    formSubmitButton.onclick = function (evt) {
        evt.preventDefault();
        counterResult.classList.remove('counter__result--hidden');
        calculateWeight();
    }
}

formResetButton.onclick = function () {
    resetForms();
    counterResult.classList.add('counter__result--hidden');
    this.setAttribute('disabled', 'disabled');
    formSubmitButton.setAttribute('disabled', 'disabled');
}