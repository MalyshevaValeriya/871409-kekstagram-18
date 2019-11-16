'use strict';
(function () {
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAG_COUNT = 5;
  var MAX_COMMENT_LENGTH = 140;

  var Scale = {
    COUNT: 25,
    MAX: 100,
    MIN: 25
  };

  var HashtagErrors = {
    FIRST_SYMBOL: 'хэш-тег должен начинаться с символа # (решётка)',
    LENGTH: 'хеш-тег не может состоять только из одной решётки',
    SPACE: 'между хэш-тегами должен быть пробел',
    UNIQUENESS: 'один и тот же хэш-тег не может быть использован дважды',
    MAX_QUANTITY: 'нельзя указать больше пяти хэш-тегов',
    MAX_LENGTH: 'максимальная длина одного хэш-тега 20 символов, включая решётку'
  };

  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFormSubmitButton = uploadForm.querySelector('.img-upload__submit');
  var uploadLabel = uploadForm.querySelector('#upload-file');
  var uploadImage = uploadForm.querySelector('.img-upload__overlay');
  var uploadClose = document.querySelector('.img-upload__cancel');
  var imgScale = document.querySelector('.img-upload__scale');
  var scaleSmallerButton = imgScale.querySelector('.scale__control--smaller');
  var scaleBiggerButton = imgScale.querySelector('.scale__control--bigger');
  var scaleValue = imgScale.querySelector('.scale__control--value');
  var imgPreview = document.querySelector('.img-upload__preview').firstElementChild;
  var effectsList = document.querySelector('.effects__list');
  var effectLevel = document.querySelector('.effect-level');
  var effectLevelValue = effectLevel.querySelector('.effect-level__value');
  var inputHashtags = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');
  var effectPin = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__depth');
  var effectLine = document.querySelector('.effect-level__line');
  var curretFilter;


  var popupEscPressHandler = function (evt) {
    window.util.isEscEvent(evt, closeUpload);
  };

  var closeUpload = function () {
    uploadLabel.value = '';
    uploadImage.classList.add('hidden');
    document.removeEventListener('keydown', popupEscPressHandler);
  };

  var openUpload = function () {
    uploadImage.classList.remove('hidden');
    effectLevelValue.value = 0;
    document.addEventListener('keydown', popupEscPressHandler);
  };

  var hideEffectLine = function () {
    effectLevel.classList.add('hidden');
  };

  var showEffectLine = function () {
    effectLevel.classList.remove('hidden');
  };

  var resetPhoto = function () {
    scaleValue.value = '100%';
    imgPreview.style.transform = '';
    imgPreview.style.filter = 'none';
    inputHashtags.value = '';
    textDescription.value = '';
  };

  uploadLabel.addEventListener('change', function () {
    uploadFormSubmitButton.disabled = false;
    openUpload();
    resetPhoto();
    hideEffectLine();
  });

  uploadClose.addEventListener('click', function () {
    closeUpload();
  });

  uploadClose.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, closeUpload);
  });

  var smallerButtonHandler = function () {
    var numValue = parseInt(scaleValue.value, 10);
    if (numValue - Scale.COUNT >= Scale.MIN) {
      scaleValue.value = '' + numValue - Scale.COUNT + '%';
      imgPreview.style.transform = 'scale(' + (numValue - Scale.COUNT) / 100 + ')';
    }
  };

  var biggerButtonHandler = function () {
    var numValue = parseInt(scaleValue.value, 10);
    if (numValue + Scale.COUNT <= Scale.MAX) {
      scaleValue.value = numValue + Scale.COUNT + '%';
      imgPreview.style.transform = 'scale(' + (numValue + Scale.COUNT) / 100 + ')';
    }
  };

  var selectEffectHandler = function (evt) {
    var filtersName = evt.target.value;
    imgPreview.classList.remove('effects__preview--' + curretFilter);
    var makeEffect = effects[filtersName];
    makeEffect(imgPreview, 1);
    if (filtersName !== 'none') {
      imgPreview.classList.add('effects__preview--' + evt.target.value);
    }
    curretFilter = evt.target.value;
    effectPin.style.left = effectLine.offsetWidth + 'px';
    effectLevelLine.style.width = effectLine.offsetWidth + 'px';
  };

  var makeNoneEffect = function (target) {
    target.style.filter = '';
    effectLevelValue.value = 100;
    hideEffectLine();
  };

  var makeChromeEffect = function (target, value) {
    target.style.filter = 'grayscale(' + value + ')';
    effectLevelValue.value = value * 100;
    showEffectLine();
  };

  var makeSepiaEffect = function (target, value) {
    target.style.filter = 'sepia(' + value + ')';
    effectLevelValue.value = value * 100;
    showEffectLine();
  };
  var makeMarvinEffect = function (target, value) {
    target.style.filter = 'invert(' + value * 100 + '%)';
    effectLevelValue.value = value * 100;
    showEffectLine();
  };
  var makePhobosEffect = function (target, value) {
    target.style.filter = 'blur(' + value * 3 + 'px)';
    effectLevelValue.value = value * 100;
    showEffectLine();
  };
  var makeHeatEffect = function (target, value) {
    target.style.filter = 'brightness(' + (1 + value * 2) + ')';
    effectLevelValue.value = value * 100;
    showEffectLine();
  };

  var effects = {
    chrome: makeChromeEffect,
    sepia: makeSepiaEffect,
    marvin: makeMarvinEffect,
    phobos: makePhobosEffect,
    heat: makeHeatEffect,
    none: makeNoneEffect
  };

  effectsList.addEventListener('change', selectEffectHandler);

  scaleSmallerButton.addEventListener('click', smallerButtonHandler);
  scaleBiggerButton.addEventListener('click', biggerButtonHandler);

  var checkHashtagFirstSymbol = function (hashtag, errorMessageArray) {
    if (hashtag[0] !== '#') {
      if (!errorMessageArray.includes(HashtagErrors.FIRST_SYMBOL)) {
        errorMessageArray.push(HashtagErrors.FIRST_SYMBOL);
      }
    }
  };

  var checkHashtagLength = function (hashtag, errorMessageArray) {
    if (hashtag === '#') {
      if (!errorMessageArray.includes(HashtagErrors.LENGTH)) {
        errorMessageArray.push(HashtagErrors.LENGTH);
      }
    }
  };

  var checkHashtagSpace = function (hashtag, errorMessageArray) {
    for (var y = 1; y < hashtag.length; y++) {
      if (hashtag[y] === '#') {
        if (!errorMessageArray.includes(HashtagErrors.SPACE)) {
          errorMessageArray.push(HashtagErrors.SPACE);
        }
      }
    }

  };

  var checkHashtagMaxQuantity = function (hashtagArray, errorMessageArray) {
    if (hashtagArray.length > MAX_HASHTAG_COUNT) {
      if (!errorMessageArray.includes(HashtagErrors.MAX_QUANTITY)) {
        errorMessageArray.push(HashtagErrors.MAX_QUANTITY);
      }
    }
  };

  var checkHashtagUniqueness = function (hashtagArray, i, errorMessageArray) {
    if (!checkOriginality(hashtagArray, i)) {
      if (!errorMessageArray.includes(HashtagErrors.UNIQUENESS)) {
        errorMessageArray.push(HashtagErrors.UNIQUENESS);
      }
    }
  };

  var checkMaxHashtagLength = function (hashtag, errorMessageArray) {
    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      if (!errorMessageArray.includes(HashtagErrors.MAX_LENGTH)) {
        errorMessageArray.push(HashtagErrors.MAX_LENGTH);
      }
    }
  };

  var prepareString = function (str) {
    var tagString = str.trim();
    tagString = tagString.replace(/\s+/g, ' ');
    return tagString;
  };

  var validationHashtags = function (evt) {
    var tagString = prepareString(evt.target.value);
    var hashtagArray = tagString.split(' ');
    var errorMessageArray = [];

    hashtagArray.forEach(function (item, i) {
      checkHashtagFirstSymbol(item, errorMessageArray);
      checkHashtagLength(item, errorMessageArray);
      checkHashtagSpace(item, errorMessageArray);
      checkHashtagMaxQuantity(hashtagArray, errorMessageArray);
      checkHashtagUniqueness(hashtagArray, i, errorMessageArray);
      checkMaxHashtagLength(item, errorMessageArray);
    });


    inputHashtags.setCustomValidity(errorMessageArray.join('; '));
  };


  inputHashtags.addEventListener('input', validationHashtags);

  textDescription.maxLength = MAX_COMMENT_LENGTH;

  var checkOriginality = function (checkedArray, checkedElementPosition) {
    var hashtagArr = [];
    checkedArray.forEach(function (item, i) {
      hashtagArr[i] = item.toLowerCase();
    });
    var checkedElement = hashtagArr[checkedElementPosition];
    hashtagArr.splice(checkedElementPosition, 1);

    if (hashtagArr.includes(checkedElement)) {
      return false;
    }
    return true;
  };

  inputHashtags.addEventListener('keydown', window.util.stopPropagation);
  textDescription.addEventListener('keydown', window.util.stopPropagation);


  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = evt.clientX;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoords - moveEvt.clientX;

      startCoords = moveEvt.clientX;
      if (effectPin.offsetLeft - shift >= 0 && effectPin.offsetLeft - shift <= effectLine.offsetWidth) {
        effectPin.style.left = (effectPin.offsetLeft - shift) + 'px';
        effectLevelLine.style.width = (effectPin.offsetLeft) + 'px';
      }
      var makeEffect = effects[curretFilter];
      makeEffect(imgPreview, effectPin.offsetLeft / effectLine.offsetWidth);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var onSuccess = function () {
    var success = successTemplate.cloneNode(true);

    document.querySelector('main').appendChild(success);
    var successClickHandler = function () {
      if (success) {
        success.remove();
      }
      document.removeEventListener('click', successClickHandler);
      document.removeEventListener('keydown', succesKeydownHandler);
    };

    document.addEventListener('click', successClickHandler);

    var succesKeydownHandler = function (evt) {
      window.util.isEscEvent(evt, successClickHandler);
    };

    document.addEventListener('keydown', succesKeydownHandler);
  };

  var uploadErrorHandler = function (message) {
    window.picture.errorHandler(message);
    uploadImage.classList.add('hidden');
    var closeError = function () {
      if (document.querySelector('.error')) {
        document.querySelector('.error').remove();
      }
      document.removeEventListener('click', closeError);
      document.removeEventListener('keydown', errorKeydownHandler);
    };

    document.addEventListener('click', closeError);

    var errorKeydownHandler = function (evt) {
      window.util.isEscEvent(evt, closeError);
    };
    document.addEventListener('keydown', errorKeydownHandler);
  };

  var validationMessageReaction = function () {
    inputHashtags.classList.add('error__border');
    setTimeout(function () {
      inputHashtags.classList.remove('error__border');
    }, 400);
  };

  var formSending = function (evt) {
    window.backend.save(new FormData(uploadForm), function () {
      uploadImage.classList.add('hidden');
      onSuccess();
    }, uploadErrorHandler);
    uploadLabel.value = '';
    evt.preventDefault();
    uploadFormSubmitButton.disabled = true;
  };

  uploadFormSubmitButton.addEventListener('click', function (evt) {
    if (inputHashtags.validationMessage) {
      validationMessageReaction();
      return;
    }
    formSending(evt);
  });

})();
