'use strict';
(function () {
  var IMG_RANDOM_COUNT = 10;
  var imgFilters = document.querySelector('.img-filters');
  var filtersForm = document.querySelector('.img-filters__form');
  var filterPopular = filtersForm.querySelector('#filter-popular');
  var filterRandom = filtersForm.querySelector('#filter-random');
  var filterDiscussed = filtersForm.querySelector('#filter-discussed');

  imgFilters.classList.remove('img-filters--inactive');

  var filterButton = function (element) {
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

  var filterClickHandler = window.util.debounce(function (evt) {
    if (!window.picture.photos) {
      return;
    }
    var filters = {
      'filter-popular': getPhotos,
      'filter-random': getRandomPhotos,
      'filter-discussed': getDiscussedPhotos
    };
    var currentArray = filters[evt.target.id](window.picture.photos);
    window.picture.renderPhotos(currentArray);
    filterButton(evt.target);
  });

  filterRandom.addEventListener('click', filterClickHandler);
  filterPopular.addEventListener('click', filterClickHandler);
  filterDiscussed.addEventListener('click', filterClickHandler);
})();

