'use strict';
(function () {
  var DESCRIPTIONS = ['На природе', 'С семьей', 'Доброе утро', 'Встречаем закат', 'С друзьями'];
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var AVATAR_MIN = 1;
  var AVATAR_MAX = 6;
  var COMMENTS_MIN = 0;
  var COMMENTS_MAX = 20;
  var NAMES = ['Артём', 'Иван', 'Василий', 'Петр', 'Мария'];
  var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  window.data = {
    PHOTO_COUNT: 25,
    photos: photos
  };

  var getRandomComments = function () {
    var comments = [];
    var numberOfComments = window.util.getRandomInterval(COMMENTS_MIN, COMMENTS_MAX);

    for (var i = 0; i < numberOfComments; i++) {
      var usersComment = {
        avatar: 'img/avatar-' + window.util.getRandomInterval(AVATAR_MIN, AVATAR_MAX) + '.svg',
        message: getRandomMessage(MESSAGES),
        name: window.util.getRandomElement(NAMES)
      };

      comments.push(usersComment);
    }

    return comments;
  };
  var getRandomMessage = function (messages) {
    var countMessage = window.util.getRandomInterval(1, 2);
    var message = '';
    for (var i = 0; i < countMessage; i++) {
      var randomMessage = window.util.getRandomElement(messages);
      message += i === countMessage - 1 ? randomMessage : randomMessage + ' ';
    }

    return message;
  };

  var createPhoto = function (i) {
    var photo = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: window.util.getRandomElement(DESCRIPTIONS),
      likes: window.util.getRandomInterval(LIKES_MIN, LIKES_MAX),
      comments: getRandomComments()
    };

    return photo;
  };

  var createPhotos = function () {
    window.data.photos = [];
    for (var i = 0; i < window.data.PHOTO_COUNT; i++) {
      window.data.photos.push(createPhoto(i));
    }

    return window.data.photos;
  };
  var photos = createPhotos();
  window.picture.renderPhotos(photos);
})();
