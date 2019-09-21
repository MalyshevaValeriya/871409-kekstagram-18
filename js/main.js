'use strict';
var PHOTO_COUNT = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var COMMENT_MIN = 0;
var COMMENT_MAX = 2;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;
var NAMES = ['Артём', 'Иван', 'Василий', 'Петр', 'Мария'];

var pictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

var getRandomNumber = function(min, max) {
    var rand = min + Math.random() * (max - min);
    return Math.random(rand);
};

var getRandomElement = function(array) {
    return array (Math.floor(Math.random() * array.lenght));
};

var getRandomComment = function() {
    var comments = [];
    for (var i = 0; i < COMMENTS; i++) {
        comments.push({
            avatar: 'img/avatar-' + getRandomNumber(AVATAR_MIN, AVATAR_MAX) + '.svg',
            message: getRandomElement(COMMENTS),
            name: getRandomElement(NAMES)
        })
    }
  return comments
}
