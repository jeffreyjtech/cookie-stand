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

let salesTableElem = document.getElementById('salesTable');

let totalCookiesPerHour = [];
let globalDailyTotal = 0;

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
  this.dailyTotal = 0;
}

// This function calls the constructor function using passed-in array of store data, then pushes the returned object into the storeArray
// With this function I can construct objects from any number of stores.
// I can even pass in a single location's data as single-row 2D array to get it constructed and pushed into the storeArray

function constructorLoop(dataArray) {
  // console.table(dataArray);
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
    this.cookiesPerHour.push(
      Math.ceil(this.custPerHour[i] * this.avgCookieSale)
    );
  }
};

Store.prototype.getDailyTotal = function () {
  for (let i = 0; i < this.cookiesPerHour.length; i++) {
    this.dailyTotal += this.cookiesPerHour[i];
  }
};

Store.prototype.addRowToTable = function () {
  let storeRowElem = document.createElement('tr');
  salesTableElem.appendChild(storeRowElem);

  let storeRowLabelElem = document.createElement('td');
  storeRowLabelElem.textContent = this.location;
  storeRowElem.appendChild(storeRowLabelElem);

  for (let j = 0; j < this.custPerHour.length; j++) {
    let cookiesElem = document.createElement('td');
    cookiesElem.textContent = `${this.cookiesPerHour[j]}`;
    storeRowElem.appendChild(cookiesElem);
  }

  let storeDailyTotalElem = document.createElement('td');
  storeDailyTotalElem.textContent = this.dailyTotal;
  storeRowElem.appendChild(storeDailyTotalElem);
};

constructorLoop(storeDataTable);
console.log(storeArray);

getLocationHourlyData(storeArray);
getGlobalCPerHour(storeArray);
appendTableHeader();
appendSalesData(storeArray);
appendTableFooter();

/*
DOM MANIPULATION FUNCTIONS
*/

function appendSalesData(locArr) {
  for (let i = 0; i < locArr.length; i++) {
    locArr[i].addRowToTable();
  }
}

function appendTableHeader() {
  let headerRowElem = document.createElement('tr');
  salesTableElem.appendChild(headerRowElem);

  let hoursLabelElem = document.createElement('th');
  hoursLabelElem.textContent = 'Hours';
  headerRowElem.appendChild(hoursLabelElem);
  for (let i = 0; i < hours.length; i++) {
    let hourHeaderElem = document.createElement('th');
    hourHeaderElem.textContent = hours[i];
    headerRowElem.appendChild(hourHeaderElem);
  }
  let storeDailyTotalLabel = document.createElement('th');
  storeDailyTotalLabel.textContent = 'Daily Location Total';
  headerRowElem.appendChild(storeDailyTotalLabel);
}

function appendTableFooter() {
  let footerRowElem = document.createElement('tr');
  salesTableElem.appendChild(footerRowElem);

  let totalsLabelElem = document.createElement('th');
  totalsLabelElem.textContent = 'Totals';
  footerRowElem.appendChild(totalsLabelElem);

  for (let i = 0; i < hours.length; i++) {
    let totalPerHourElem = document.createElement('th');
    totalPerHourElem.textContent = totalCookiesPerHour[i];
    footerRowElem.appendChild(totalPerHourElem);
  }

  let globalDailyTotalElem = document.createElement('th');
  globalDailyTotalElem.textContent = globalDailyTotal;
  footerRowElem.append(globalDailyTotalElem);
}

/*
OTHER HELPER FUNCTIONS
*/


function getGlobalCPerHour(locArr) {
  for (let i = 0; i < hours.length; i++) {
    let globalHourlyTotal = getGlobalCookies(i, locArr);
    totalCookiesPerHour.push(globalHourlyTotal);
    globalDailyTotal += globalHourlyTotal;
  }
}

function getGlobalCookies(hour, locArr) {
  let globalCookies = 0;
  for (let j = 0; j < locArr.length; j++) {
    globalCookies += locArr[j].cookiesPerHour[hour];
  }
  return globalCookies;
}

function randomCust(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getLocationHourlyData(locArr) {
  for (let i = 0; i < locArr.length; i++) {
    locArr[i].getCustPerHour();
    locArr[i].getCookiesPerHour();
    locArr[i].getDailyTotal();
    // console.log(locArr[i]);
  }
}
