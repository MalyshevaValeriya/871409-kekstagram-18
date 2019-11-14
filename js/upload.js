'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
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
        var setBackgroundImage = function (item) {
          item.style.backgroundImage = 'url(' + reader.result + ')';
        };
        effectPreview.forEach(setBackgroundImage);
      });
      reader.readAsDataURL(file);
    }
  });
})();

