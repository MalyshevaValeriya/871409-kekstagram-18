'use strict';
(function () {
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
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhoto(photos[i], i));
    }

    photoAlbum.appendChild(fragment);
  };

  var errorHandler = function (message) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);

    error.querySelector('.error__title').textContent = message;


    document.querySelector('main').appendChild(error);
  };

  var onError = function (message) {
    errorHandler(message);
  };

  var onSuccess = function (data) {
    renderPhotos(data);
    window.picture.photos = data;
  };

  window.backend.load(onSuccess, onError);

  window.picture = {
    errorHandler: errorHandler,
    photoAlbum: photoAlbum
  };
})();

