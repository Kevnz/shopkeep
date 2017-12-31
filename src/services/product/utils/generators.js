const faker = require('faker');
const loremIpsum = require('lorem-ipsum');
const uuid = require('uuid/v1');
const CATEGORIES = ['clothing', 'books', 'food', 'automotive']

const imageCategory = [
  'abstract',
  'animals',
  'business',
  'cats',
  'city',
  'food',
  'nightlife',
  'fashion',
  'people',
  'nature',
  'sports',
  'technics',
  'transport'
  ];

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const genImage = (place) => {
  const section = random(0, imageCategory.length - 1);
  const placement = random(1,10);
  return {
    name: `Image ${place}`,
    description: loremIpsum(50),
    thumbnail: `http://lorempixel.com/80/40/${imageCategory[section]}/${placement}`,
    main: `http://lorempixel.com/800/400/${imageCategory[section]}/${placement}`,
  };
};

const genProduct = () => {
  return {
    identifier: uuid(),
    name: faker.commerce.productName(),
    description: loremIpsum(150),
    price: faker.commerce.price(1, 9999),
    images: [ genImage(1), genImage(2), genImage(3) ],
    categories: [CATEGORIES[random(0,3)]],
    tags: ['sample', 'example', 'other']

  }
};

module.exports = {
  generateProduct: genProduct,
  generateImage: genImage,
  categories: CATEGORIES,

  random
}
