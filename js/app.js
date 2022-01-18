'use strict';
// Jeffrey Jenkins; Code 201 Week 2 Project "Salmon Cookies"; Created 1-17-21

const hours = [
  '6am',
  '7am',
  '8am',
  '9am',
  '10am',
  '11am',
  '12pm',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '6pm',
  '7pm',
  '8pm',
];

let dataDisplayElem = document.getElementById('dataDisplay');

// I'm making a table of each store's customer and cookies-per-customer data. I'm sure I'll need this or a component array in later iterations of this site

let storeDataTable = [
  ['Seattle', 23, 65, 6.3],
  ['Tokyo', 3, 24, 1.2],
  ['Dubai', 11, 38, 3.7],
  ['Paris', 20, 38, 2.3],
  ['Lima', 2, 16, 4.6],
];

// this array will store the store objects, so I can use for loops later in the code to keep things dry.
const storeArray = [];

// Store constructor function

function Store(location, minCust, maxCust, avgCookieSale) {
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookieSale = avgCookieSale;
  this.custPerHour = [];
  this.cookiesPerHour = [];
  this.cookiesTotal = 0;
}

// This function calls the constructor function using passed-in array of store data, then pushes the returned object into the storeArray

function constructorLoop(dataArray) {
  console.table(dataArray);
  for (let i = 0; i < dataArray.length; i++) {
    let newStore = new Store(
      dataArray[i][0],
      dataArray[i][1],
      dataArray[i][2],
      dataArray[i][3]
    );
    storeArray.push(newStore);
  }
}

Store.prototype.getCustPerHour = function () {
  for (let i = 0; i < hours.length; i++) {
    this.custPerHour.push(randomCust(this.minCust, this.maxCust));
  }
};

Store.prototype.getCookiesPerHour = function () {
  for (let i = 0; i < this.custPerHour.length; i++) {
    this.cookiesPerHour.push(Math.ceil(this.custPerHour[i] * this.avgCookieSale));
  }
};

Store.prototype.getCookiesTotal = function () {
  for (let i = 0; i < this.cookiesPerHour.length; i++) {
    this.cookiesTotal += this.cookiesPerHour[i];
  }
};

constructorLoop(storeDataTable);
console.log(storeArray);

getLocationHourlyData(storeArray);
appendSalesData(storeArray);

// HELPER FUNCTIONS

// function appendSalesData(locArr) {
//   for (let i = 0; i < locArr.length; i++) {
//     appendSingleLoc(locArr[i]);
//   }
// }

function appendSalesData(locArr) {
  for (let i = 0; i < locArr.length; i++) {
    appendSingleLoc(locArr[i]);
  }
}

function appendSingleLoc(loc) {
  let h2Elem = document.createElement('h2');
  h2Elem.textContent = loc.location;
  dataDisplayElem.appendChild(h2Elem);

  let ulElem = document.createElement('ul');
  dataDisplayElem.appendChild(ulElem);

  for (let j = 0; j < loc.custPerHour.length; j++) {
    let liElem = document.createElement('li');
    liElem.textContent = `${hours[j]}: ${loc.cookiesPerHour[j]} cookies`;
    ulElem.appendChild(liElem);
  }

  let totalElem = document.createElement('li');
  totalElem.textContent = `Total: ${loc.cookiesTotal} cookies`;
  ulElem.appendChild(totalElem);
}

function randomCust(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getLocationHourlyData(locArr) {
  for (let i = 0; i < locArr.length; i++) {
    locArr[i].getCustPerHour();
    locArr[i].getCookiesPerHour();
    locArr[i].getCookiesTotal();
    // console.log(locArr[i]);
  }
}
