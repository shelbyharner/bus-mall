'use strict';

let totalClicks = 0;
let totalAllowed = 25;
let allProducts = [];
let catalogueArray = [];
let uniqueImageCount = 6;
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
  while (catalogueArray.length < uniqueImageCount) {
    let randomNumber = getRandomPic();
    while (!catalogueArray.includes(randomNumber)) {
      catalogueArray.unshift(randomNumber);
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

renderProduct();

function renderChart() {
  let productNames = [];
  let productViews = [];
  let productClicks = [];
  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productClicks.push(allProducts[i].clicks);
  }
  var chartObject = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Views',
        data: productViews,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 3
      },
      {
        label: 'Clicks',
        data: productClicks,
        backgroundColor: 'rgba(0, 255, 229, 1)',
        borderColor: 'rgba(0, 255, 229, 1)',
        borderWidth: 3
      }]
    },
    responsive: false,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };

  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, chartObject);
}

imageContainer.addEventListener('click', handleClick);