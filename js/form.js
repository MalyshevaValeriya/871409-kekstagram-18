'use strict';
(function () {
  var SCALE_COUNT = 25;
  var SCALE_MAX = 100;
  var SCALE_MIN = 25;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAG_COUNT = 5;
  var HASHTAG_FIRST_SYMBOL = 'хэш-тег должен начинаться с символа # (решётка)';
  var HASHTAG_LENGTH = 'хеш-тег не может состоять только из одной решётки';
  var HASHTAG_SPACE = 'между хэш-тегами должен быть пробел';
  var HASHTAG_UNIQUENESS = 'один и тот же хэш-тег не может быть использован дважды';
  var HASHTAG_MAX_QUANTITY = 'нельзя указать больше пяти хэш-тегов';
  var HASHTAG_MAX_LENGTH = 'максимальная длина одного хэш-тега 20 символов, включая решётку';
  var uploadForm = document.querySelector('.img-upload__form');
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
    imgPreview.style.filter = '';
  };

  uploadLabel.addEventListener('change', function () {
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

    switch (filtersName) {
      case 'none':
        makeNoneEffect(imgPreview);
        break;
      case 'chrome':
        makeChromeEffect(imgPreview);
        break;
      case 'sepia':
        makeSepiaEffect(imgPreview);
        break;
      case 'marvin':
        makeMarvinEffect(imgPreview);
        break;
      case 'phobos':
        makePhobosEffect(imgPreview);
        break;
      case 'heat':
        makeHeatEffect(imgPreview);
        break;
    }
  };

  // eslint-disable-next-line no-unused-vars
  var makeNoneEffect = function (target, value) {
    target.style.filter = '';
    hideEffectLine();
  };

  // eslint-disable-next-line no-unused-vars
  var makeChromeEffect = function (target, value) {
    target.style.filter = 'grayscale(1)';
    showEffectLine();
  };

  // eslint-disable-next-line no-unused-vars
  var makeSepiaEffect = function (target, value) {
    target.style.filter = 'sepia(1)';
    showEffectLine();
  };
  // eslint-disable-next-line no-unused-vars
  var makeMarvinEffect = function (target, value) {
    target.style.filter = 'invert(100%)';
    showEffectLine();
  };
  // eslint-disable-next-line no-unused-vars
  var makePhobosEffect = function (target, value) {
    target.style.filter = 'blur(3px)';
    showEffectLine();
  };
  // eslint-disable-next-line no-unused-vars
  var makeHeatEffect = function (target, value) {
    target.style.filter = 'brightness(3)';
    showEffectLine();
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

  inputHashtags.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.escKeyCode) {
      evt.stopPropagation();
    }
  });
})();
