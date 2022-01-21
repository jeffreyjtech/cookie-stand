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
let storeRowGroupElem = document.getElementById('storeRowGroup');
let tHeadElem = document.querySelector('thead');
let addStoreForm = document.getElementById('addStoreForm');
let globalCookiesPerHour = [];
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
const globalStores = [];
const globalStoreNames = [];

// Store constructor function

function Store(name, minCust, maxCust, avgCookieSale) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookieSale = avgCookieSale;
  this.custPerHour = [];
  this.cookiesPerHour = [];
  this.dailyTotal = 0;
}

// This function calls the constructor function using passed-in array of store data, then pushes the returned object into the globalStores
// With this function I can construct objects from any number of stores.
// I can even pass in a single name's data as single-row 2D array to get it constructed and pushed into the globalStores

function constructStores(newStoreData) {
  // console.table(newStoreData);
  for (let i = 0; i < newStoreData.length; i++) {
    let newStoreName = newStoreData[i][0];
    let newStore = new Store(
      newStoreName,
      newStoreData[i][1],
      newStoreData[i][2],
      newStoreData[i][3]
    );
    globalStores.push(newStore);
    globalStoreNames.push(newStoreName.toLowerCase());
  }
}

Store.prototype.getCustPerHour = function () {
  for (let i = 0; i < hours.length; i++) {
    this.custPerHour[i] = randomCust(this.minCust, this.maxCust);
  }
};

Store.prototype.getCookiesPerHour = function () {
  for (let i = 0; i < this.custPerHour.length; i++) {
    this.cookiesPerHour[i] = Math.ceil(this.custPerHour[i] * this.avgCookieSale);
  }
};

Store.prototype.getDailyTotal = function () {
  this.dailyTotal = 0;
  for (let i = 0; i < this.cookiesPerHour.length; i++) {
    this.dailyTotal += this.cookiesPerHour[i];
  }
};


Store.prototype.constructRow = function () {
  let storeRowElem = document.createElement('tr');
  storeRowElem.setAttribute('id', this.name);
  storeRowGroupElem.appendChild(storeRowElem);

  let storeRowLabelElem = document.createElement('td');
  storeRowLabelElem.textContent = this.name;
  storeRowElem.appendChild(storeRowLabelElem);

  for (let j = 0; j < this.custPerHour.length; j++) {
    let cookiesElem = document.createElement('td');
    cookiesElem.textContent = `${this.cookiesPerHour[j]}`;
    storeRowElem.appendChild(cookiesElem);
  }

  let storeDailyTotalElem = document.createElement('td');
  storeDailyTotalElem.textContent = this.dailyTotal;
  storeRowElem.appendChild(storeDailyTotalElem);

  return storeRowElem;
};

Store.prototype.addRowToTable = function () {
  let newRow = this.constructRow();
  storeRowGroupElem.appendChild(newRow);
};

Store.prototype.refreshRow = function () {
  let refreshedRow = this.constructRow();
  let oldRow = document.getElementById(this.name);
  storeRowGroupElem.replaceChild(refreshedRow, oldRow);
};

constructStores(storeDataTable);
console.log(globalStores);

refreshStoresProjections(globalStores);
addGlobalCPerHour();
appendTableHeader();
addNewStoreRows(globalStores);
appendTableFooter();

addStoreForm.addEventListener('submit', handleSubmit);

/*
FORM SUBMISSION EVENT HANDLER
*/

function handleSubmit(event) {
  event.preventDefault();
  console.log(event);

  const inputStoreName = event.target.storeName.value.toLowerCase();
  if (globalStoreNames.includes(inputStoreName)) {
    console.log('This store exists');
    let storeIndex = globalStoreNames.indexOf(inputStoreName);

    let refreshedStore = [globalStores[storeIndex]];

    globalStores[storeIndex].minCust = parseInt(event.target.minCust.value);
    globalStores[storeIndex].maxCust = parseInt(event.target.maxCust.value);
    globalStores[storeIndex].avgCookieSale = parseInt(event.target.avgCookies.value);

    refreshStoresProjections(refreshedStore);
    globalStores[storeIndex].refreshRow();
  } else {
    console.log('This store does not exist');
    let formArray = [
      [
        event.target.storeName.value,
        parseInt(event.target.minCust.value),
        parseInt(event.target.maxCust.value),
        parseInt(event.target.avgCookies.value),
      ],
    ];

    constructStores(formArray);

    let newStore = [globalStores[globalStores.length - 1]];

    refreshStoresProjections(newStore);
    addNewStoreRows(newStore);
  }
  addGlobalCPerHour();
  console.table(globalStores);
  refreshFooter();

  addStoreForm.reset();
}

function refreshFooter() {
  let oldFooter = document.getElementById('footerRow');
  oldFooter.remove();
  appendTableFooter();
}

/*
DOM MANIPULATION FUNCTIONS
*/

function addNewStoreRows(storeArr) {
  for (let i = 0; i < storeArr.length; i++) {
    storeArr[i].addRowToTable();
  }
}

function appendTableHeader() {
  let headerRowElem = document.createElement('tr');

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

  tHeadElem.appendChild(headerRowElem);
}

function appendTableFooter() {
  let footerRowElem = document.createElement('tr');
  salesTableElem.appendChild(footerRowElem);

  let totalsLabelElem = document.createElement('th');
  totalsLabelElem.textContent = 'Global Totals';
  footerRowElem.appendChild(totalsLabelElem);

  for (let i = 0; i < hours.length; i++) {
    let totalPerHourElem = document.createElement('th');
    totalPerHourElem.textContent = globalCookiesPerHour[i];
    footerRowElem.appendChild(totalPerHourElem);
  }

  let globalDailyTotalElem = document.createElement('th');
  globalDailyTotalElem.textContent = globalDailyTotal;
  footerRowElem.setAttribute('id', 'footerRow');
  footerRowElem.append(globalDailyTotalElem);
}

/*
OTHER HELPER FUNCTIONS
*/

function addGlobalCPerHour() {
  globalDailyTotal = 0;
  for (let i = 0; i < hours.length; i++) {
    let globalHourlyTotal = getGlobalCookies(i);
    globalCookiesPerHour[i] = globalHourlyTotal;
    globalDailyTotal += globalHourlyTotal;
  }
}

function getGlobalCookies(hour) {
  let globalCookies = 0;
  for (let j = 0; j < globalStores.length; j++) {
    globalCookies += globalStores[j].cookiesPerHour[hour];
  }
  return globalCookies;
}

function randomCust(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function refreshStoresProjections(storeArr) {
  for (let i = 0; i < storeArr.length; i++) {
    storeArr[i].getCustPerHour();
    storeArr[i].getCookiesPerHour();
    storeArr[i].getDailyTotal();
    // console.log(locArr[i]);
  }
}
