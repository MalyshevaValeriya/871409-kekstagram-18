'use strict';
(function () {
  var SCALE_COUNT = 25;
  var SCALE_MAX = 100;
  var SCALE_MIN = 25;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAG_COUNT = 5;
  var MAX_COMMENT_LENGTH = 140;
  var HASHTAG_FIRST_SYMBOL = 'хэш-тег должен начинаться с символа # (решётка)';
  var HASHTAG_LENGTH = 'хеш-тег не может состоять только из одной решётки';
  var HASHTAG_SPACE = 'между хэш-тегами должен быть пробел';
  var HASHTAG_UNIQUENESS = 'один и тот же хэш-тег не может быть использован дважды';
  var HASHTAG_MAX_QUANTITY = 'нельзя указать больше пяти хэш-тегов';
  var HASHTAG_MAX_LENGTH = 'максимальная длина одного хэш-тега 20 символов, включая решётку';
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFormSubmitButton = uploadForm.querySelector('.img-upload__submit');
  var uploadLabel = uploadForm.querySelector('#upload-file');
  var uploadImage = uploadForm.querySelector('.img-upload__overlay');
  var uploadClose = document.querySelector('.img-upload__cancel');
  var scaleSmallerButton = document.querySelector('.scale__control--smaller');
  var scaleBiggerButton = document.querySelector('.scale__control--bigger');
  var scaleValue = document.querySelector('.scale__control--value');
  var imgPreview = document.querySelector('.img-upload__preview').firstElementChild;
  var effectsList = document.querySelector('.effects__list');
  var effectLevel = document.querySelector('.effect-level');
  var inputHashtags = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');
  var effectPin = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__depth');
  var effectLine = document.querySelector('.effect-level__line');
  var curretFilter;


  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeUpload);
  };

  var closeUpload = function () {
    uploadImage.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var openUpload = function () {
    uploadImage.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
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

  var smallerButtonHundler = function () {
    var numValue = parseInt(scaleValue.value, 10);
    if (numValue - SCALE_COUNT >= SCALE_MIN) {
      scaleValue.value = '' + numValue - SCALE_COUNT + '%';
      imgPreview.style.transform = 'scale(' + (numValue - SCALE_COUNT) / 100 + ')';
    }
  };

  var biggerButtonHundler = function () {
    var numValue = parseInt(scaleValue.value, 10);
    if (numValue + SCALE_COUNT <= SCALE_MAX) {
      scaleValue.value = numValue + SCALE_COUNT + '%';
      imgPreview.style.transform = 'scale(' + (numValue + SCALE_COUNT) / 100 + ')';
    }
  };

  var onSelectEffect = function (evt) {
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
    hideEffectLine();
  };

  var makeChromeEffect = function (target, value) {
    target.style.filter = 'grayscale(' + value + ')';
    showEffectLine();
  };

  var makeSepiaEffect = function (target, value) {
    target.style.filter = 'sepia(' + value + ')';
    showEffectLine();
  };
  var makeMarvinEffect = function (target, value) {
    target.style.filter = 'invert(' + value * 100 + '%)';
    showEffectLine();
  };
  var makePhobosEffect = function (target, value) {
    target.style.filter = 'blur(' + value * 30 + 'px)';
    showEffectLine();
  };
  var makeHeatEffect = function (target, value) {
    target.style.filter = 'brightness(' + (1 + value * 2) + ')';
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

  effectsList.addEventListener('change', onSelectEffect);

  scaleSmallerButton.addEventListener('click', smallerButtonHundler);
  scaleBiggerButton.addEventListener('click', biggerButtonHundler);

  var checkHashtagFirstSymbol = function (hashtag, errorMessageArray) {
    if (hashtag[0] !== '#') {
      if (!errorMessageArray.includes(HASHTAG_FIRST_SYMBOL)) {
        errorMessageArray.push(HASHTAG_FIRST_SYMBOL);
      }
    }
  };

  var checkHashtagLength = function (hashtag, errorMessageArray) {
    if (hashtag === '#') {
      if (!errorMessageArray.includes(HASHTAG_LENGTH)) {
        errorMessageArray.push(HASHTAG_LENGTH);
      }
    }
  };

  var checkHashtagSpace = function (hashtag, errorMessageArray) {
    for (var y = 1; y < hashtag.length; y++) {
      if (hashtag[y] === '#') {
        if (!errorMessageArray.includes(HASHTAG_SPACE)) {
          errorMessageArray.push(HASHTAG_SPACE);
        }
      }
    }
  };

  var checkHashtagMaxQuantity = function (hashtagArray, errorMessageArray) {
    if (hashtagArray.length > MAX_HASHTAG_COUNT) {
      if (!errorMessageArray.includes(HASHTAG_MAX_QUANTITY)) {
        errorMessageArray.push(HASHTAG_MAX_QUANTITY);
      }
    }
  };

  var checkHashtagUniqueness = function (hashtagArray, i, errorMessageArray) {
    if (!checkOriginality(hashtagArray, i)) {
      if (!errorMessageArray.includes(HASHTAG_UNIQUENESS)) {
        errorMessageArray.push(HASHTAG_UNIQUENESS);
      }
    }
  };

  var checkMaxHashtagLength = function (hashtag, errorMessageArray) {
    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      if (!errorMessageArray.includes(HASHTAG_MAX_LENGTH)) {
        errorMessageArray.push(HASHTAG_MAX_LENGTH);
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

    for (var i = 0; i < hashtagArray.length; i++) {
      var hashtag = hashtagArray[i];

      checkHashtagFirstSymbol(hashtag, errorMessageArray);
      checkHashtagLength(hashtag, errorMessageArray);
      checkHashtagSpace(hashtag, errorMessageArray);
      checkHashtagMaxQuantity(hashtagArray, errorMessageArray);
      checkHashtagUniqueness(hashtagArray, i, errorMessageArray);
      checkMaxHashtagLength(hashtag, errorMessageArray);
    }
    inputHashtags.setCustomValidity(errorMessageArray.join('; '));
  };


  inputHashtags.addEventListener('input', validationHashtags);

  textDescription.maxLength = MAX_COMMENT_LENGTH;

  var checkOriginality = function (checkedArray, checkedElementPosition) {
    var hashtagArr = [];
    for (var i = 0; i < checkedArray.length; i++) {
      hashtagArr[i] = checkedArray[i].toLowerCase();
    }
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

    var onMouseMove = function (moveEvt) {
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

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var onSuccess = function () {
    var success = successTemplate.cloneNode(true);

    document.querySelector('main').appendChild(success);
    var closeSuccess = function () {
      if (success) {
        success.remove();
      }
      document.removeEventListener('click', closeSuccess);
      document.removeEventListener('keydown', succesKedownHundler);
    };

    document.addEventListener('click', closeSuccess);

    var succesKedownHundler = function (evt) {
      window.util.isEscEvent(evt, closeSuccess);
    };

    document.addEventListener('keydown', succesKedownHundler);
  };

  var onError = function (message) {
    window.picture.errorHandler(message);
    uploadImage.classList.add('hidden');
    var closeError = function () {
      if (document.querySelector('.error')) {
        document.querySelector('.error').remove();
      }
      document.removeEventListener('click', closeError);
      document.removeEventListener('keydown', errorKedownHundler);
    };

    document.addEventListener('click', closeError);

    var errorKedownHundler = function (evt) {
      window.util.isEscEvent(evt, closeError);
    };
    document.addEventListener('keydown', errorKedownHundler);


  };

  uploadForm.addEventListener('submit', function (evt) {

    window.backend.save(new FormData(uploadForm), function () {
      uploadImage.classList.add('hidden');
      onSuccess();
    }, onError);
    uploadLabel.value = '';
    evt.preventDefault();
    uploadFormSubmitButton.disabled = true;
  });
  uploadFormSubmitButton.addEventListener('click', function () {
    if (inputHashtags.validationMessage) {
      inputHashtags.classList.add('error__border');
      setTimeout(function () {
        inputHashtags.classList.remove('error__border');
      }, 400);
    }
  }
  );
})();
