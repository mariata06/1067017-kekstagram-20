'use strict';

var NUMBER_PHOTO = 25; // максимальное число фотографий
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_AVATAR_IMG = 1;
var MAX_AVATAR_IMG = 6;
var MAX_COMMENTS_NUMBER = 4;
var commentsArray = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var namesArray = ['Саша', 'Петя', 'Вася', 'Коля', 'Вова', 'Миша', 'Дима'];

var listElement = document.querySelector('.pictures');
var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

var getRandomElement = function (array) {
  return array[getRandomInteger(0, array.length - 1)];
};

function getRandomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

var getComments = function (numberComments) {
  var comments = [];

  for (var i = 0; i < numberComments; i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomInteger(MIN_AVATAR_IMG, MAX_AVATAR_IMG) + '.svg',
      message: getRandomElement(commentsArray),
      name: getRandomElement(namesArray)
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

var mocks = getMocks(NUMBER_PHOTO);

var renderPhoto = function (variantStorage) {
  var photoElement = photoTemplate.cloneNode(true);
  var pictureImg = photoElement.querySelector('.picture__img');
  var pictureComments = photoTemplate.querySelector('.picture__comments');
  var pictureLikes = photoTemplate.querySelector('.picture__likes');

  pictureImg.src = variantStorage.url;
  pictureComments.text = variantStorage.likes;
  pictureLikes.text = variantStorage.comments.length;

  return photoElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < mockPhotos.length; j++) {
  fragment.appendChild(renderPhoto(mockPhotos[j]));
}

listElement.appendChild(fragment);
