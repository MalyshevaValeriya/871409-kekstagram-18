'use strict';
(function () {
  var photoAlbum = document.querySelector('.pictures.container');
  var renderPhoto = function (photo, i) {
    var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var photoElement = similarPhotoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.dataset.index = i;

    return photoElement;
  };

  var renderPhotos = function (photos) {
    window.picture.currentPhotos = photos;
    window.util.removeChildren(photoAlbum);
    var fragment = document.createDocumentFragment();

    photos.forEach(function (item, i) {
      fragment.appendChild(renderPhoto(item, i));
    });
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
    window.picture.currentArray = data;
  };

  window.backend.load(onSuccess, onError);

  window.picture = {
    errorHandler: errorHandler,
    photoAlbum: photoAlbum,
    renderPhotos: renderPhotos,
    onError: onError,
    onSuccess: onSuccess
  };
})();

