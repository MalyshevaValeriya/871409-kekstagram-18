'use strict';
(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500;

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  var getRandomElement = function (elements) {
    return elements[getRandomInterval(0, elements.length - 1)];
  };

  var getRandomInterval = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var randomizeArray = function (count, array) {
    var imgRandom = [];
    var photosCopy = array.slice();
    for (var i = 0; i < count; i++) {
      var randomElement = getRandomInterval(0, photosCopy.length - 1);
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

  var stopPropagation = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
    }
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomElement: getRandomElement,
    getRandomInterval: getRandomInterval,
    debounce: debounce,
    randomizeArray: randomizeArray,
    removeChildren: removeChildren,
    stopPropagation: stopPropagation
  };
})();

