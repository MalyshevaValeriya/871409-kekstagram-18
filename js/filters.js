'use strict';
(function () {
  var IMG_RANDOM_COUNT = 10;
  var imgFilters = document.querySelector('.img-filters');
  var filtersForm = document.querySelector('.img-filters__form');
  var photoAlbum = window.picture.photoAlbum;
  var filterPopular = filtersForm.querySelector('#filter-popular');
  var filterRandom = filtersForm.querySelector('#filter-random');
  var filterDiscussed = filtersForm.querySelector('#filter-discussed');

  imgFilters.classList.remove('img-filters--inactive');

  var getRandomImg = function () {
    var imgRandom = [];
    var photosCopy = window.picture.photos.slice();
    for (var i = 0; i < IMG_RANDOM_COUNT; i++) {
      var randomElement = window.util.getRandomInterval(0, photosCopy.length - 1);
      imgRandom[i] = photosCopy[randomElement];
      photosCopy.splice(randomElement, 1);
    }
    return imgRandom;
  };

  var removeChildren = function (parent) {
    for (var i = 0; i < parent.children.length; i++) {
      if (parent.children[i].classList.contains('picture')) {
        parent.removeChild(parent.children[i]);
        i--;
      }
    }
  };

  var filterButton = function (element) {
    filterPopular.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');

    element.classList.add('img-filters__button--active');
  };

  var renderRandomPhotos = window.debounce.debounce(function (evt) {
    removeChildren(photoAlbum);
    window.picture.renderPhotos(getRandomImg());
    filterButton(evt.target);
  });

  filterRandom.addEventListener('click', renderRandomPhotos);

  var renderPopularPhotos = window.debounce.debounce(function (evt) {
    removeChildren(photoAlbum);
    window.picture.renderPhotos(window.picture.photos);
    filterButton(evt.target);
  });

  filterPopular.addEventListener('click', renderPopularPhotos);

  var getDiscussedImg = function () {
    var photosCopy = window.picture.photos.slice();
    photosCopy.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return photosCopy;
  };

  var renderDiscussedImg = window.debounce.debounce(function (evt) {
    removeChildren(photoAlbum);
    window.picture.renderPhotos(getDiscussedImg());
    filterButton(evt.target);
  });

  filterDiscussed.addEventListener('click', renderDiscussedImg);
})();

