'use strict';
(function () {
  var AVATAR_WIDTH = 35;
  var AVATAR_HEIGHT = 35;
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = document.querySelector('.big-picture__cancel');
  var ENTER_KEYCODE = 13;

  var photos = window.data.photos;
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

  removeChildren(renderComments);


  var onKeydownBigPhoto = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      var photoElement = evt.target;
      var index = photoElement.dataset.index;
      openBigPicture(photos[index]);
    }
  };

  var onClickBigPhoto = function (evt) {
    var photoElement = evt.target.parentNode;
    if (photoElement.classList.contains('picture')) {
      var index = photoElement.dataset.index;
      openBigPicture(photos[index]);
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


  var showComments = function (photo) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photo.comments.length; i++) {
      fragment.appendChild(renderComment(photo.comments[i]));
    }
    renderComments.appendChild(fragment);
  };

  var showPhoto = function (photo) {
    bigPicture.querySelector('.big-picture__img').firstElementChild.src = photo.url;
    bigPicture.querySelector('.big-picture__img').firstElementChild.alt = photo.description;
  };

  var openBigPicture = function (photo) {
    openPopup();
    showLikes(photo);
    showDescription(photo);
    showComments(photo);
    showPhoto(photo);
    document.querySelector('.social__comment-count').classList.add('visually-hidden');
    document.querySelector('.comments-loader').classList.add('visually-hidden');
  };

  openBigPicture(photos[0]);
})();


