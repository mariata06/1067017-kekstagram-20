'use strict';

var NUMBER_PHOTO = 25; // максимальное число фотографий
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_AVATAR_IMG = 1;
var MAX_AVATAR_IMG = 6;
var MAX_COMMENTS_NUMBER = 4;
var commentsList = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var namesList = ['Саша', 'Петя', 'Вася', 'Коля', 'Вова', 'Миша', 'Дима'];
var listElement = document.querySelector('.pictures');
var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
var uploadFile = document.querySelector('.img-upload__input');
var imgUploadForm = document.querySelector('.img-upload__overlay');
var imgFormClose = imgUploadForm.querySelector('.img-upload__cancel');
var filterContainer = document.querySelector('.effects__list');
//var smallPicture = document.querySelector('.picture');
var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = document.querySelector('.big-picture__img');
//console.log(smallPicture);
var bigPictureClose = document.querySelector('.big-picture__cancel');
var likesQty = document.querySelector('.likes-count');
var commentsQty = document.querySelector('.comments-count');
var commentsList = document.querySelector('.social__comments');
var commentTemplate = document.querySelector('#social-comment').content.querySelector('.social__comment');
var pictureDescription = document.querySelector('.social__caption');
var commentsCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');
var documentBody = document.querySelector('.body');
var picturesContainer = document.querySelector('.pictures');
var inputHashtag = imgUploadForm.querySelector('.text__hashtags');

var getRandomElement = function (array) {
  return array[getRandomInteger(0, array.length - 1)];
};

function getRandomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getComments = function (numberComments) {
  var comments = [];

  for (var i = 0; i < numberComments; i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomInteger(MIN_AVATAR_IMG, MAX_AVATAR_IMG) + '.svg',
      message: getRandomElement(commentsList),
      name: getRandomElement(namesList)
    };

    comments.push(comment);
  }
  return comments;
};

var mockPhotos = [];

var getMocks = function () {
  for (var i = 1; i <= NUMBER_PHOTO; i++) {

    var photo = {
      url: 'photos/' + i + '.jpg',
      description: 'описание фотографии',
      likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
      comments: getComments(getRandomInteger(0, MAX_COMMENTS_NUMBER))
    };

    mockPhotos.push(photo);
  }
  return mockPhotos;
};

var mocks = getMocks();

var renderPhoto = function (variantStorage) {
  var photoElement = photoTemplate.cloneNode(true);
  var pictureImg = photoElement.querySelector('.picture__img');
  var pictureComments = photoTemplate.querySelector('.picture__comments');
  var pictureLikes = photoTemplate.querySelector('.picture__likes');

  pictureImg.src = variantStorage.url;
  pictureComments.text = variantStorage.likes;
  pictureLikes.text = variantStorage.comments.length;
  //console.log(variantStorage);
  //console.log(pictureComments);
  //console.log(variantStorage);

  return photoElement;
};

var renderComment = function (comment) {
  var commentElement = commentTemplate.cloneNode(true);
  var commentAvatar = commentElement.querySelector('.social__picture');
  var commentText = commentElement.querySelector('.social__text');

  commentAvatar.src = comment.avatar;
  commentAvatar.alt = comment.name;
  commentText.text = comment.message;

  commentsList.appendChild(commentElement);
}

var fragment = document.createDocumentFragment();
for (var j = 0; j < mockPhotos.length; j++) {
  fragment.appendChild(renderPhoto(mockPhotos[j]));
}

listElement.appendChild(fragment);

uploadFile.addEventListener('change', function () {
  imgUploadForm.classList.remove('hidden');
  window.dialog.levelPin.style.left = window.dialog.START_X_COORDS;
  documentBody.classList.add('modal-open');
})

imgFormClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  //console.log(uploadFile);
  imgUploadForm.classList.add('hidden');
  uploadFile.value = '';
  documentBody.classList.remove('modal-open');
})

window.addEventListener('keydown', function (evt) {
  //evt.preventDefault();
  if (evt.key === 'Escape') {
    imgUploadForm.classList.add('hidden');
    documentBody.classList.remove('modal-open');
  }
  uploadFile.value = '';
  //console.log(inputHashtag.value);
  //var hashtags =[];


});
/*
var splitString = function (stringToSplit) {
  var hashtags = stringToSplit.split(' ');
  //inputHashtag.value = str.split([' ' [, limit]]);
  return hashtags;

}
*/
// валидация поля формы заголовок
inputHashtag.addEventListener('invalid', function () {
var hashtags = inputHashtag.value.split(' ');
hashtags.forEach(function (el) {
  if (el.indexOf('#') == -1) {
    inputHashtag.setCustomValidity('Хештег должен содержать знак #');
  } else if (el.length() == 1) { // содержится только #
    inputHashtag.setCustomValidity('Поле должно содержать символы после знака #');
  } else {
    inputHashtag.setCustomValidity('');
  }
})
/*
  if (inputHashtag.validity.tooShort) {
    inputHashtag.setCustomValidity('Хештег должен содержать знак #');
  } else if (inputHashtag.validity.valueMissing) {
    inputHashtag.setCustomValidity('Обязательное поле');
  } else {
    inputHashtag.setCustomValidity('');
  }*/
});

filterContainer.addEventListener('change', function () {
  window.dialog.levelPin.style.left = window.dialog.START_X_COORDS;
  //console.log('test');
})
/*
smallPicture.addEventListener('click', function (evt) {
  evt.preventDefault();
  bigPicture.classList.remove('hidden');
})
*/
/*
bigPicture.classList.remove('hidden');
bigPictureImg.children[0].src = mockPhotos[0].url;
likesQty.textContent = mockPhotos[0].likes;
commentsQty.textContent = mockPhotos[0].comments.length;
pictureDescription.textContent = mockPhotos[0].description;
*/

bigPictureClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  //console.log(uploadFile);
  bigPicture.classList.add('hidden');
})

commentsCount.classList.add('hidden');
commentsLoader.classList.add('hidden');

picturesContainer.addEventListener('click', function (currentElement) {
  //var pictures = document.querySelectorAll('.picture');
  //console.log(pictures);

  mocks.forEach(function (element) {
    //console.log(element.url);
    //console.log(currentElement.srcElement.currentSrc);

    if (currentElement.srcElement.currentSrc && currentElement.srcElement.currentSrc.indexOf(element.url) !== -1) {
      //console.log(element);
      bigPicture.classList.remove('hidden');

      bigPictureImg.children[0].src = element.url;
      likesQty.textContent = element.likes;
      commentsQty.textContent = element.comments.length;
      pictureDescription.textContent = element.description;

      // Очищение комментариев от другого фото
      Array.from(bigPicture.querySelectorAll('.social__comment')).forEach(function (el) {
        commentsList.removeChild(el);
      });
      //Добавка комментариев
      element.comments.forEach(function (el) {
        renderComment(el);
      });

    }
  })
});
