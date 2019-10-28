'use strict';

(function () {
  var SEND_URL = 'https://js.dump.academy/kekstagram';
  var GET_URL = 'https://js.dump.academy/kekstagram/data';
  var TIMEOUT = 10000;

  var request = function (url, method, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + TIMEOUT + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, url);

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  var save = function (data, onLoad, onError) {
    request(SEND_URL, 'POST', onLoad, onError, data);
  };

  var load = function (onLoad, onError) {
    request(GET_URL, 'GET', onLoad, onError);
  };

  window.backend = {
    save: save,
    load: load
  };
})();
