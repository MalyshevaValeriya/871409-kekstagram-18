'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var EFFECT_PREVIEW_COUNT = 6;
  var fileChooser = document.querySelector('#upload-file');
  var preview = document.querySelector('.img-upload__preview img');
  var effectPreview = document.querySelectorAll('.effects__preview');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;

        for (var i = 0; i < EFFECT_PREVIEW_COUNT; i++) {
          effectPreview[i].style.backgroundImage = 'url(' + reader.result + ')';
        }
      });
      reader.readAsDataURL(file);
    }
  });
})();

