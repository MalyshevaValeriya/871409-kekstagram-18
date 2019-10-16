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
    for (var i = 0; i < window.data.PHOTO_COUNT; i++) {
      fragment.appendChild(renderPhoto(photos[i], i));
    }

    photoAlbum.appendChild(fragment);
  };

  window.picture = {
    renderPhotos: renderPhotos,
    photoAlbum: photoAlbum
  };
})();

