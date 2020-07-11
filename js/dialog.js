'use strict';

(function () {
  var MIN_X_COORDS = 0;
  var MAX_X_COORDS = 450;
  var levelPin = document.querySelector('.effect-level__pin');
  var START_X_COORDS = levelPin.style.left;

  levelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var X = levelPin.offsetLeft - shift.x;
      if (X > MAX_X_COORDS) {
        X = MAX_X_COORDS;
      } else if (X < MIN_X_COORDS) {
        X = MIN_X_COORDS;
      }

      levelPin.style.left = (X) + 'px';
      // console.log(X);
    };


    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        /*
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          levelPin.removeEventListener('click', onClickPreventDefault);
        };
        */
        levelPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  window.dialog = {
    START_X_COORDS: START_X_COORDS,
    levelPin: levelPin
  };
})();
