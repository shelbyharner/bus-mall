'use strict';

let totalClicks = 0;
let totalAllowed = 25;
let allProducts = [];
let firstImage = document.querySelector('section img:first-child');
let secondImage = document.querySelector('section img:nth-child(2)');
let thirdImage = document.querySelector('section img:nth-child(3)');
let imageContainer = document.querySelector('section');
let resultsButton = document.querySelector('div');

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('usb', 'gif');
new Product('water-can');
new Product('wine-glass');

function getRandomPic() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProduct() {
  let catalogueArray = [];
  while (catalogueArray.length < 3) {
    let randomNumber = getRandomPic();
    while (!catalogueArray.includes(randomNumber)){
      catalogueArray.push(randomNumber);
    }
    // console.log(catalogueArray);
    // console.log(!catalogueArray.includes(randomNumber));
  }

  let firstProductIndex = catalogueArray.pop();
  let secondProductIndex = catalogueArray.pop();
  let thirdProductIndex = catalogueArray.pop();

  firstImage.src = allProducts[firstProductIndex].src;
  firstImage.title = allProducts[firstProductIndex].name;
  allProducts[firstProductIndex].views++;

  secondImage.src = allProducts[secondProductIndex].src;
  secondImage.title = allProducts[secondProductIndex].name;
  allProducts[secondProductIndex].views++;

  thirdImage.src = allProducts[thirdProductIndex].src;
  thirdImage.title = allProducts[thirdProductIndex].name;
  allProducts[thirdProductIndex].views++;
}

function renderResults() {
  let resultsList = document.querySelector('ul');
  for (let i = 0; i < allProducts.length; i++){
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].clicks} votes and was seen ${allProducts[i].views}.`;
    resultsList.appendChild(li);
  }
}

function handleClick(event) {
  if (event.target === imageContainer) {
    alert('Please click on an image.');
  }

  totalClicks++;
  let prodctClicked = event.target.title;

  for (let i = 0; i < allProducts.length; i++) {
    if (prodctClicked === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  }

  renderProduct();
  if (totalClicks === totalAllowed) {
    imageContainer.removeEventListener('click', handleClick);
  }
}

function handleResultsButton(event) {
  if (totalClicks === totalAllowed) {
    renderResults();
  }
}

renderProduct();

imageContainer.addEventListener('click', handleClick);
resultsButton.addEventListener('click' ,handleResultsButton);