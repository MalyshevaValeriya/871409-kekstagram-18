'use strict';
(function () {
  var AVATAR_WIDTH = 35;
  var AVATAR_HEIGHT = 35;
  var COMMENTS_LIMIT = 5;
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = document.querySelector('.big-picture__cancel');
  var ENTER_KEYCODE = 13;
  var moreButton = document.querySelector('.comments-loader');
  var filtersForm = document.body.querySelector('.img-filters__form');
  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
  };

  bigPictureClose.addEventListener('click', function () {
    closeBigPicture();
  });

  document.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, closeBigPicture);
  });

  var openPopup = function () {
    bigPicture.classList.remove('hidden');
  };

  var showLikes = function (photo) {
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
  };

  var showDescription = function (photo) {
    bigPicture.querySelector('.social__caption').textContent = photo.description;
  };

  var renderComments = document.querySelector('.social__comments');

  var removeChildren = function (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  var photosArraySelect = function () {
    var photoArrayDict = {
      'filter-popular': window.picture.photos,
      'filter-random': window.picture.randomphotos,
      'filter-discussed': window.picture.discussedphotos
    };
    var id;
    for (var i = 0; i < filtersForm.children.length; i++) {
      if (filtersForm.children[i].classList.contains('img-filters__button--active')) {
        id = filtersForm.children[i].id;
      }
    }
    return photoArrayDict[id];
  };

  var onKeydownBigPhoto = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      var photoElement = evt.target;
      var index = photoElement.dataset.index;
      openBigPicture(photosArraySelect()[index]);
    }
  };

  var onClickBigPhoto = function (evt) {
    photosArraySelect();
    var photoElement = evt.target.parentNode;
    if (photoElement.classList.contains('picture')) {
      var index = photoElement.dataset.index;
      openBigPicture(photosArraySelect()[index]);
    }
  };

  var inputComment = document.querySelector('.social__footer-text');

  inputComment.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.escKeyCode) {
      evt.stopPropagation();
    }
  });

  window.picture.photoAlbum.addEventListener('click', onClickBigPhoto);
  window.picture.photoAlbum.addEventListener('keydown', onKeydownBigPhoto);


  var renderComment = function (comment) {
    var similarCommentTemplate = document.querySelector('#big-picture__comment').content.querySelector('.social__comment');
    var commentItem = similarCommentTemplate.cloneNode(true);

    commentItem.querySelector('.social__picture').src = comment.avatar;
    commentItem.querySelector('.social__picture').alt = comment.name;
    commentItem.querySelector('.social__picture').width = AVATAR_WIDTH;
    commentItem.querySelector('.social__picture').height = AVATAR_HEIGHT;
    commentItem.querySelector('.social__text').textContent = comment.message;

    return commentItem;
  };

  var remainingComments = [];
  var moreCommentsHundler = function () {
    var fragment = document.createDocumentFragment();
    if (remainingComments.length <= COMMENTS_LIMIT) {
      for (var i = 0; i < remainingComments.length; i++) {
        fragment.appendChild(renderComment(remainingComments[i]));
      }
      renderComments.appendChild(fragment);
      moreButton.classList.add('visually-hidden');
      moreButton.removeEventListener('click', moreCommentsHundler);
    } else {
      for (var y = 0; y < COMMENTS_LIMIT; y++) {
        fragment.appendChild(renderComment(remainingComments[y]));
      }
      renderComments.appendChild(fragment);
      remainingComments = remainingComments.slice(COMMENTS_LIMIT);
    }

  };
  var showComments = function (photo) {
    moreButton.classList.remove('visually-hidden');
    var fragment = document.createDocumentFragment();
    if (photo.comments.length <= COMMENTS_LIMIT) {
      for (var i = 0; i < photo.comments.length; i++) {
        fragment.appendChild(renderComment(photo.comments[i]));
      }
      moreButton.classList.add('visually-hidden');
    } else {

      for (var y = 0; y < COMMENTS_LIMIT; y++) {
        fragment.appendChild(renderComment(photo.comments[y]));
      }
      remainingComments = photo.comments.slice(COMMENTS_LIMIT);

    }

    renderComments.appendChild(fragment);
    moreButton.addEventListener('click', moreCommentsHundler);
  };

  var showPhoto = function (photo) {
    bigPicture.querySelector('.big-picture__img').firstElementChild.src = photo.url;
    bigPicture.querySelector('.big-picture__img').firstElementChild.alt = photo.description;
  };

  var openBigPicture = function (photo) {
    openPopup();
    showLikes(photo);
    showDescription(photo);
    removeChildren(renderComments);
    showComments(photo);
    showPhoto(photo);
    document.querySelector('.social__comment-count').classList.add('visually-hidden');

  };
})();


