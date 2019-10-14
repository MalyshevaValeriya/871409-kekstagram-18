'use strict';
var PHOTO_COUNT = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;
var AVATAR_WIDTH = 35;
var AVATAR_HEIGHT = 35;
var COMMENTS_MIN = 0;
var COMMENTS_MAX = 20;
var NAMES = ['Артём', 'Иван', 'Василий', 'Петр', 'Мария'];
var DESCRIPTIONS = ['На природе', 'С семьей', 'Доброе утро', 'Встречаем закат', 'С друзьями'];
var bigPicture = document.querySelector('.big-picture');
var bigPictureClose = document.querySelector('.big-picture__cancel');
var MAX_HASHTAG_LENGTH = 20;
var SCALE_COUNT = 25;
var SCALE_MAX = 100;
var SCALE_MIN = 25;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var HASHTAG_FIRST_SYMBOL = 'хэш-тег должен начинаться с символа # (решётка)';
var HASHTAG_LENGTH = 'хеш-тег не может состоять только из одной решётки';
var HASHTAG_SPACE = 'между хэш-тегами должен быть пробел';
var HASHTAG_UNIQUENESS = 'один и тот же хэш-тег не может быть использован дважды';
var HASHTAG_MAX_QUANTITY = 'нельзя указать больше пяти хэш-тегов';
var HASHTAG_MAX_LENGTH = 'максимальная длина одного хэш-тега 20 символов, включая решётку';

var escEvent = function (evt, action) {
  if (evt.keyCode === ESC_KEYCODE) {
    action();
  }
};

var getRandomInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (elements) {
  return elements[getRandomInterval(0, elements.length - 1)];
};

var getRandomMessage = function (messages) {
  var countMessage = getRandomInterval(1, 2);
  var message = '';
  for (var i = 0; i < countMessage; i++) {
    var randomMessage = getRandomElement(messages);
    message += i === countMessage - 1 ? randomMessage : randomMessage + ' ';
  }

  return message;
};

var getRandomComments = function () {
  var comments = [];
  var numberOfComments = getRandomInterval(COMMENTS_MIN, COMMENTS_MAX);

  for (var i = 0; i < numberOfComments; i++) {
    var usersComment = {
      avatar: 'img/avatar-' + getRandomInterval(AVATAR_MIN, AVATAR_MAX) + '.svg',
      message: getRandomMessage(MESSAGES),
      name: getRandomElement(NAMES)
    };

    comments.push(usersComment);
  }

  return comments;
};


var createPhoto = function (i) {
  var photo = {
    url: 'photos/' + (i + 1) + '.jpg',
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomInterval(LIKES_MIN, LIKES_MAX),
    comments: getRandomComments()
  };

  return photo;
};

var createPhotos = function () {
  var photos = [];
  for (var i = 0; i < PHOTO_COUNT; i++) {
    photos.push(createPhoto(i));
  }

  return photos;
};

var renderPhoto = function (photo, i) {
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var photoElement = similarPhotoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photoElement.dataset.index = i;

  return photoElement;
};

var photoAlbum = document.querySelector('.pictures.container');
var renderPhotos = function (photos) {

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < PHOTO_COUNT; i++) {
    fragment.appendChild(renderPhoto(photos[i], i));
  }

  photoAlbum.appendChild(fragment);
};

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
};

bigPictureClose.addEventListener('click', function () {
  closeBigPicture();
});

document.addEventListener('keydown', function (evt) {
  escEvent(evt, closeBigPicture);
});

var photos = createPhotos();
renderPhotos(photos);

var openPopup = function () {
  bigPicture.classList.remove('hidden');
};

var showLikes = function (photo) {
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
};

var showDescription = function (photo) {
  bigPicture.querySelector('.social__caption').textContent = photo.description;
};

var renderComments = document.querySelector('.social__comments');

var removeChildren = function (parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

removeChildren(renderComments);

/* Личный проект: доверяй, но проверяй  */
var onKeydownBigPhoto = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    var photoElement = evt.target;
    var index = photoElement.dataset.index;
    openBigPicture(photos[index]);
  }
};

var onClickBigPhoto = function (evt) {
  var photoElement = evt.target.parentNode;
  if (photoElement.classList.contains('picture')) {
    var index = photoElement.dataset.index;
    openBigPicture(photos[index]);
  }
};

var inputComment = document.querySelector('.social__footer-text');

inputComment.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});

photoAlbum.addEventListener('click', onClickBigPhoto);
photoAlbum.addEventListener('keydown', onKeydownBigPhoto);


var renderComment = function (comment) {
  var similarCommentTemplate = document.querySelector('#big-picture__comment').content.querySelector('.social__comment');
  var commentItem = similarCommentTemplate.cloneNode(true);

  commentItem.querySelector('.social__picture').src = comment.avatar;
  commentItem.querySelector('.social__picture').alt = comment.name;
  commentItem.querySelector('.social__picture').width = AVATAR_WIDTH;
  commentItem.querySelector('.social__picture').height = AVATAR_HEIGHT;
  commentItem.querySelector('.social__text').textContent = comment.message;

  return commentItem;
};


var showComments = function (photo) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photo.comments.length; i++) {
    fragment.appendChild(renderComment(photo.comments[i]));
  }
  renderComments.appendChild(fragment);
};

var showPhoto = function (photo) {
  bigPicture.querySelector('.big-picture__img').firstElementChild.src = photo.url;
  bigPicture.querySelector('.big-picture__img').firstElementChild.alt = photo.description;
};

var openBigPicture = function (photo) {
  openPopup();
  showLikes(photo);
  showDescription(photo);
  showComments(photo);
  showPhoto(photo);
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');
};

openBigPicture(photos[0]);

/* Задание: Личный проект: подробности*/

var uploadForm = document.querySelector('.img-upload__form');
var uploadLabel = uploadForm.querySelector('#upload-file');
var uploadImage = uploadForm.querySelector('.img-upload__overlay');
var uploadClose = document.querySelector('.img-upload__cancel');
var scaleSmallerButton = document.querySelector('.scale__control--smaller');
var scaleBiggerButton = document.querySelector('.scale__control--bigger');
var scaleValue = document.querySelector('.scale__control--value');
var imgPreview = document.querySelector('.img-upload__preview');
var effectsList = document.querySelector('.effects__list');
var effectLevel = document.querySelector('.effect-level');
var inputHashtags = document.querySelector('.text__hashtags');

var onPopupEscPress = function (evt) {
  escEvent(evt, closeUpload);
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
  escEvent(evt, closeUpload);
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
  if (hashtagArray.length > 5) {
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

var preparationString = function (str) {
  var tagString = str.trim();
  tagString = tagString.replace(/\s+/g, ' ');
  return tagString;
};

var validationHashtags = function (evt) {
  var tagString = preparationString(evt.target.value);
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
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});
