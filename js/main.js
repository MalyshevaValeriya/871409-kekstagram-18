'use strict';
var PHOTO_COUNT = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;
var COMMENTS_MIN = 0;
var COMMENTS_MAX = 20;
var NAMES = ['Артём', 'Иван', 'Василий', 'Петр', 'Мария'];
var DESCRIPTIONS = ['На природе', 'С семьей', 'Доброе утро', 'Встречаем закат', 'С друзьями'];

var getRandomInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (elements) {
  return elements[getRandomInterval(0, elements.length - 1)];;
};

var getRandomMessage = function (messages) {
  var countMessage = getRandomInterval(1, 2);
  var message = '';
  for (var i = 0; i < countMessage; i++) {
    message += getRandomElement(messages);
  };

  return message;
};

var getRandomComments = function () {
  var comments = [];
  var numberOfComments = getRandomInterval(COMMENTS_MIN, COMMENTS_MAX);

  for (var i = 0; i < numberOfComments; i++) {
    var usersComment = {
      avatar: 'img/avatar-' + getRandomInterval(AVATAR_MIN, AVATAR_MAX) +'.svg',
      message: getRandomMessage(MESSAGES),
      name: getRandomElement(NAMES)
    };
    comments.push(usersComment)
  };

  return comments;
};


var createPhoto = function (i) {
  var photo = {
    url: 'photos/' + (i + 1) + '.jpg',
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomInterval(LIKES_MIN, LIKES_MAX),
    comments: getRandomComments()
  }

return photo;
};

var createPhotos = function () {
  var photos = [];
  for (var i = 0; i < PHOTO_COUNT; i++) {
    photos.push(createPhoto(i));
  }

  return photos;
};

var renderPhoto = function (photo) {
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var photoElement = similarPhotoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src=photo.url;
  photoElement.querySelector('.picture__likes').textContent=photo.likes;
  photoElement.querySelector('.picture__comments').textContent=photo.comments.length;

  return photoElement;
};

var renderPhotos = function (photos) {
  var photoAlbum = document.querySelector('.pictures.container');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < PHOTO_COUNT; i++) {

    fragment.appendChild(renderPhoto(photos[i]));
  };

  photoAlbum.appendChild(fragment);
};

renderPhotos(createPhotos());
