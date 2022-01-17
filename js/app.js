'use strict';
// Jeffrey Jenkins; Code 201 Week 2 Project "Salmon Cookies"; Created 1-17-21

const hours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];

// I'm making a table of location data. I'm sure I'll need this or a component array in later iterations of this site
/*
let locDataTable = [
  ['Seattle','Tokyo','Dubai','Paris','Lima'],
  [23,3,11,20,2],
  [65,24,38,38,16],
  [6.3,1.2,3.7,2.3,4.6]
];
*/

// this array will store the location objects, so I can use for loops later in the code to keep things dry.
let locObjects = [];

// cph means customers per hour

const seattle = {
  location: 'Seattle',
  minCust: 23,
  maxCust: 65,
  avgCookieSale: 6.3,
  custPerHour: [],
  cookiesPerHour: [],
  cookiesTotal: null,
  getCustPerHour: function(){
    for(let i = 0; i < hours.length; i++){
      this.custPerHour.push(randomCust(this.minCust,this.maxCust));
    }
  },
  getCookiesPerHour: function(){
    for(let i = 0; i < this.custPerHour.length; i++){
      this.cookiesPerHour.push(this.custPerHour[i] * this.avgCookieSale);
    }
  },
  getCookiesTotal: function(){
    for (let i = 0; i < this.cookiesPerHour.length; i++){
      this.cookiesTotal += this.cookiesPerHour[i];
    }
  }
};
locObjects.push(seattle);

const tokyo = {
  location: 'Tokyo',
  minCust: 3,
  maxCust: 24,
  avgCookieSale: 1.2,
  custPerHour: [],
  cookiesPerHour: [],
  cookiesTotal: null,
  getCustPerHour: function(){
    for(let i = 0; i < hours.length; i++){
      this.custPerHour.push(randomCust(this.minCust,this.maxCust));
    }
  },
  getCookiesPerHour: function(){
    for(let i = 0; i < this.custPerHour.length; i++){
      this.cookiesPerHour.push(this.custPerHour[i] * this.avgCookieSale);
    }
  },
  getCookiesTotal: function(){
    for (let i = 0; i < this.cookiesPerHour.length; i++){
      this.cookiesTotal += this.cookiesPerHour[i];
    }
  }
};
locObjects.push(tokyo);

const dubai = {
  location: 'Dubai',
  minCust: 11,
  maxCust: 38,
  avgCookieSale: 3.7,
  custPerHour: [],
  cookiesPerHour: [],
  cookiesTotal: null,
  getCustPerHour: function(){
    for(let i = 0; i < hours.length; i++){
      this.custPerHour.push(randomCust(this.minCust,this.maxCust));
    }
  },
  getCookiesPerHour: function(){
    for(let i = 0; i < this.custPerHour.length; i++){
      this.cookiesPerHour.push(this.custPerHour[i] * this.avgCookieSale);
    }
  },
  getCookiesTotal: function(){
    for (let i = 0; i < this.cookiesPerHour.length; i++){
      this.cookiesTotal += this.cookiesPerHour[i];
    }
  }
};
locObjects.push(dubai);

const paris = {
  location: 'Paris',
  minCust: 20,
  maxCust: 38,
  avgCookieSale: 2.3,
  custPerHour: [],
  cookiesPerHour: [],
  cookiesTotal: null,
  getCustPerHour: function(){
    for(let i = 0; i < hours.length; i++){
      this.custPerHour.push(randomCust(this.minCust,this.maxCust));
    }
  },
  getCookiesPerHour: function(){
    for(let i = 0; i < this.custPerHour.length; i++){
      this.cookiesPerHour.push(this.custPerHour[i] * this.avgCookieSale);
    }
  },
  getCookiesTotal: function(){
    for (let i = 0; i < this.cookiesPerHour.length; i++){
      this.cookiesTotal += this.cookiesPerHour[i];
    }
  }
};
locObjects.push(paris);

const lima = {
  location: 'Lima',
  minCust: 2,
  maxCust: 16,
  avgCookieSale: 4.6,
  custPerHour: [],
  cookiesPerHour: [],
  cookiesTotal: null,
  getCustPerHour: function(){
    for(let i = 0; i < hours.length; i++){
      this.custPerHour.push(randomCust(this.minCust,this.maxCust));
    }
  },
  getCookiesPerHour: function(){
    for(let i = 0; i < this.custPerHour.length; i++){
      this.cookiesPerHour.push(this.custPerHour[i] * this.avgCookieSale);
    }
  },
  getCookiesTotal: function(){
    for (let i = 0; i < this.cookiesPerHour.length; i++){
      this.cookiesTotal += this.cookiesPerHour[i];
    }
  }
};
locObjects.push(lima);

getLocationHourlyData(locObjects);

// HELPER FUNCTIONS

function randomCust(min, max) {
  return Math.round(Math.random() * (max-min) + min);
}

function getLocationHourlyData(locArr) {
  for (let i = 0; i < locArr.length; i++){
    locArr[i].getCustPerHour();
    locArr[i].getCookiesPerHour();
    locArr[i].getCookiesTotal();
    console.log(locArr[i]);
  }
}
