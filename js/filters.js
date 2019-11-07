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

  var filterButton = function (element) {
    filterPopular.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');

    element.classList.add('img-filters__button--active');
  };

  var getDiscussedImg = function () {
    var photosCopy = window.picture.photos.slice();
    photosCopy.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return photosCopy;
  };

  var onFilterClick = window.util.debounce(function (evt) {
    if (window.picture.photos) {
      var filters = {
        'filter-popular': window.picture.photos,
        'filter-random': window.util.randomizeArray(IMG_RANDOM_COUNT, window.picture.photos),
        'filter-discussed': getDiscussedImg()
      };
      window.picture.randomphotos = filters['filter-random'];
      window.picture.discussedphotos = filters['filter-discussed'];
      window.util.removeChildren(photoAlbum);
      window.picture.renderPhotos(filters[evt.target.id]);
      filterButton(evt.target);
    }
  });
  filterRandom.addEventListener('click', onFilterClick);
  filterPopular.addEventListener('click', onFilterClick);
  filterDiscussed.addEventListener('click', onFilterClick);
})();

