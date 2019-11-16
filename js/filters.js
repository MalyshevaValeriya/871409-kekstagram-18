'use strict';
(function () {
  var IMG_RANDOM_COUNT = 10;
  var filtersForm = document.querySelector('.img-filters__form');
  var filterPopular = filtersForm.querySelector('#filter-popular');
  var filterRandom = filtersForm.querySelector('#filter-random');
  var filterDiscussed = filtersForm.querySelector('#filter-discussed');

  var showActiveFilter = function (element) {
    filterPopular.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');

    element.classList.add('img-filters__button--active');
  };

  var getDiscussedPhotos = function (photos) {
    var photosCopy = photos.slice();
    photosCopy.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return photosCopy;
  };

  var getRandomPhotos = function (photos) {
    return window.util.randomizeArray(IMG_RANDOM_COUNT, photos);
  };

  var getPhotos = function (photos) {
    return photos;
  };

  var filterPhotos = window.util.debounce(function (evt) {
    if (!window.picture.photos) {
      return;
    }
    var filters = {
      'filter-popular': getPhotos,
      'filter-random': getRandomPhotos,
      'filter-discussed': getDiscussedPhotos
    };
    var currentData = filters[evt.target.id](window.picture.photos);
    window.picture.renderPhotos(currentData);
    showActiveFilter(evt.target);
  });

  var randomFilterClickHandler = function (evt) {
    filterPhotos(evt);
  };

  var popularFilterClickHandler = function (evt) {
    filterPhotos(evt);
  };

  var discussedFilterClickHandler = function (evt) {
    filterPhotos(evt);
  };
  filterRandom.addEventListener('click', randomFilterClickHandler);
  filterPopular.addEventListener('click', popularFilterClickHandler);
  filterDiscussed.addEventListener('click', discussedFilterClickHandler);
})();

