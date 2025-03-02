import mpg_data from "./data/mpg_data";
import {getStatistics} from "./medium_1";
// Helper Function:
export function countArray(array) {
    let myObject = {};
    let twoDArray = new Array(10000);
    for(let i = 0; i < twoDArray.length; i++) {
        twoDArray[i] = new Array(2);
        twoDArray[i][1] = 0;
    }
    for(let i = 0; i < array.length; i++) {
        for(let j = 0; j < twoDArray.length; j++) {
            if(twoDArray[j][0] == undefined) {
                // we have reached end of list of declared variables.
                // Insert array name into the twoDarray:
                twoDArray[j][0] = array[i];
                twoDArray[j][1] = 1;
                // console.log("Adding object to array" + "i = " + i);
                break;
            }
            // JSON.stringify(obj1) === JSON.stringify(obj2) 
            if(JSON.stringify(twoDArray[j][0]) === JSON.stringify(array[i])) {
                // we have a match. Duplicate. Increase the counter of duplicates.
                // console.log("Duplicate! i = " + i);
                twoDArray[j][1] = (twoDArray[j][1] + 1);
                break;
            }
        }
    }
    // Set object properties:
    for(let i = 0; i < twoDArray.length; i++) {
        if(twoDArray[i][0] == undefined) {
            // we have reached efective end of array.
            break;
        }
        // console.log("twoDArray[i][1] = " + twoDArray[i][1])
        myObject[twoDArray[i][0]] = twoDArray[i][1];
        // myObject[twoDArray[i][0]] = 69;
    }

    return myObject;




}

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/

// Helper Function
function getArrayOfCars (obj) {
    let arrayOfCars = Array.from(obj);
    return arrayOfCars;
}

function fillAllCarsStats() {
    let arrayOfCars = getArrayOfCars(mpg_data).slice();
    // fill mean. Sum city_mpg. Sum highway_mpg. Divide by 2 times the size of array.
    let cityMPG = 0;
    let highwayMPG = 0;

    let arrayOfCarYears = new Array(arrayOfCars.length);

    let numberOfHybrids = 0;

    for (let i = 0; i < arrayOfCars.length; i++) {
        // loop and add to each mpg at each index:
        cityMPG+= arrayOfCars[i].city_mpg;
        highwayMPG += arrayOfCars[i].highway_mpg;

        arrayOfCarYears[i] = arrayOfCars[i].year;

        if(arrayOfCars[i].hybrid == true) {
            numberOfHybrids++;
        }
    }
    let avgMpgObject = {
        city: undefined,
        highway: undefined
    };
    // let totalMPG = cityMPG + highwayMPG;
    // let averageMPG = (totalMPG / (2 * arrayOfCars.length));
    avgMpgObject.city = cityMPG / arrayOfCars.length;
    avgMpgObject.highway = highwayMPG / arrayOfCars.length;
   
    allCarStats.avgMpg = avgMpgObject;

    
    allCarStats.allYearStats = getStatistics(arrayOfCarYears);

    // Now for the ratio of Hybrids.
    // Loop, count number of hybrids. Ratio = (numberOfHybrids/ (totalCars - numberOfHybrids));
    
    // allCarStats.ratio = (numberOfHybrids / (arrayOfCars.length - numberOfHybrids));
    allCarStats.ratioHybrids = numberOfHybrids / (arrayOfCars.length);
}


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    // get copy of array of cars:
    avgMpg: undefined,
    allYearStats: undefined,
    ratioHybrids: undefined,
    
};

function fillMakerHybrids() {
    // makerHybrids:
    // Make a 2D array of all makers where the values are the number of hybrids? 
    // Then sort by number of hybrids? 
    // Then get rid of entries in the array with 0 hybrids?

    // create 2 arrays. 1 with makes of hybrids. The other with id of hybrid?
    let arrayOfCars = getArrayOfCars(mpg_data).slice();
    let arrayOfHybridCars = arrayOfCars.filter(obj => obj.hybrid == true);
    // now we have an array with only cars that are hybrids. 
    let arrayOfHybridMakes = new Array(0);
    for(let i = 0; i < arrayOfHybridCars.length; i++) {
        arrayOfHybridMakes[i] = arrayOfHybridCars[i].make;
    }
    let objectOfCountOfHybridMakes = countArray(arrayOfHybridMakes);
    // Now I know the count each time the make occurs on the list of hybrids.
    // console.log("Object.keys(objectOfCountOfHybridMakes).length: ");
    // console.log(Object.keys(objectOfCountOfHybridMakes).length);
    // console.log("objectOfCountOfHybridMakes: ");
    // console.log(objectOfCountOfHybridMakes);
    let arrayOfMakerHybridObjects = new Array(Object.keys(objectOfCountOfHybridMakes).length);
    let carObject = {
        make: undefined, 
        makerCount: undefined
    };
    for(let i = 0; i < arrayOfMakerHybridObjects.length; i++) {
        let carMake = JSON.stringify(Object.keys(objectOfCountOfHybridMakes)[i]);
        let makerCount = JSON.stringify(Object.values(objectOfCountOfHybridMakes)[i]);
        // console.log("carMake: ");
        // console.log(carMake);
        // console.log("makerCount: ");
        // console.log(makerCount);
        let copyOfObject = JSON.parse(JSON.stringify(carObject));
        copyOfObject.make = carMake;
        copyOfObject.makerCount = makerCount;
        // console.log("arrayOfMakerHybridObjects.length: ");
        // console.log(arrayOfMakerHybridObjects.length);
        // console.log("copyOfObject.make = ");
        // console.log(copyOfObject.make);
        // console.log("copyOfObject.makerCount = ");
        // console.log(copyOfObject.makerCount);
        arrayOfMakerHybridObjects[i] = copyOfObject;
    }
    // replace "" from JSON.stringify with empty spaces:
    for(let i = 0; i < arrayOfMakerHybridObjects.length; i++) {
        arrayOfMakerHybridObjects[i].make = arrayOfMakerHybridObjects[i].make.replace('"', '');
        arrayOfMakerHybridObjects[i].make = arrayOfMakerHybridObjects[i].make.replace('"', '');
    }
    // console.log("\n\n");
    // console.log("arrayOfMakerHybridObjects: ")
    // console.log(arrayOfMakerHybridObjects);    
    // console.log("\n\n");

    // Now I have an array filled with objects for each make of hybrid, and holds 
    // the count of each hybrid. Now I need to loop through the arrayOfHybrids getting the 
    // ids of every car with that make.
    for(let i = 0; i < arrayOfMakerHybridObjects.length; i++) {
        let arrayOfHybridsOfEachMake = new Array(0);
        // console.log("arrayOfHybridCars:");
        // console.log(arrayOfHybridCars.length);
        for(let j = 0; j < arrayOfHybridCars.length; j++) {
            // console.log("i = " + i + ", j = " + j);
            // console.log("arrayOfHybridCars[j].make: ");
            // console.log(arrayOfHybridCars[j].make);
            // console.log("arrayOfMakerHybridObjects[i].make");
            // console.log(arrayOfMakerHybridObjects[i].make);
            if(arrayOfHybridCars[j].make == arrayOfMakerHybridObjects[i].make) {
                // add id to arrayOfHybridsOfEachMake:
                arrayOfHybridsOfEachMake.push(arrayOfHybridCars[j].id);
                // console.log("arrayOfHybridCars[j].id: ");
                // console.log(arrayOfHybridCars[j].id);
            }
        }
        arrayOfMakerHybridObjects[i].hybrids = arrayOfHybridsOfEachMake.slice();
        delete arrayOfMakerHybridObjects[i].makerCount;
    }
    
    // console.log(arrayOfMakerHybridObjects);
    return arrayOfMakerHybridObjects.slice();
    

    
}

function fillAvgMpgByYearAndHybrid() {
    // avgMpgByYearAndHybrid
    // let copyOfObject = JSON.parse(JSON.stringify(carObject));
    let finalObjectToReturn = {};
    
    // filter array of cars by year?
    let arrayOfCars = getArrayOfCars(mpg_data).slice();
    let arrayOfCarsSortedByYear = arrayOfCars.slice();
    arrayOfCarsSortedByYear.sort(function (a, b) {return a - b;});
    // year range is 2009 to 2012
    let year = 2009;
    for(;year<2013;year++) {
        let filteredArrayByYear = arrayOfCarsSortedByYear.slice().filter(function(obj) {return year ==obj.year;});
        let filteredArrayByHybrid = filteredArrayByYear.slice().filter(function(car) {return car.hybrid;});
        let filteredArrayByNotHybrid = filteredArrayByYear.slice().filter(function(car) {return !car.hybrid;});
        
        // Put city and highway mpg somewhere. 
        let cityHybridMPGArray = new Array(filteredArrayByHybrid.length);
        let highwayHybridMPGArray = new Array(filteredArrayByHybrid.length);
        let cityNotHybridMPGArray = new Array(filteredArrayByNotHybrid.length);
        let highwayNotHybridMPGArray = new Array(filteredArrayByNotHybrid.length);
        for(let i = 0; i < filteredArrayByHybrid.length; i++) {
            cityHybridMPGArray[i] = filteredArrayByHybrid[i].city_mpg;
            highwayHybridMPGArray[i] = filteredArrayByHybrid[i].highway_mpg
        }

        for(let i = 0; i < filteredArrayByNotHybrid.length; i++) {
            cityNotHybridMPGArray[i] = filteredArrayByNotHybrid[i].city_mpg;
            highwayNotHybridMPGArray[i] = filteredArrayByNotHybrid[i].highway_mpg;
        }
        finalObjectToReturn[year] = {};
        finalObjectToReturn[year]["hybrid"] = {}
        finalObjectToReturn[year]["hybrid"]["city"] = cityHybridMPGArray.reduce(function (accumulator, currentValue){return accumulator + currentValue;})/cityHybridMPGArray.length;
        // console.log('finalObjectToReturn[year]["hybrid"]["city"]');
        // console.log(finalObjectToReturn[year]["hybrid"]["city"]);
        finalObjectToReturn[year]["hybrid"]["highway"] = highwayHybridMPGArray.reduce(function (accumulator, currentValue){return accumulator + currentValue;})/highwayHybridMPGArray.length;
        finalObjectToReturn[year]["notHybrid"] = {};
        finalObjectToReturn[year]["notHybrid"]["city"] = cityNotHybridMPGArray.reduce(function (accumulator, currentValue){return accumulator + currentValue;})/cityNotHybridMPGArray.length;
        finalObjectToReturn[year]["notHybrid"]["highway"] = highwayNotHybridMPGArray.reduce(function (accumulator, currentValue){return accumulator + currentValue;})/highwayNotHybridMPGArray.length;
    }


    return finalObjectToReturn;
}

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: fillMakerHybrids(),
    avgMpgByYearAndHybrid: fillAvgMpgByYearAndHybrid()
};
// let arrayTest = getArrayOfCars(mpg_data);
// console.log(arrayTest[0].city_mpg);
fillAllCarsStats();
// console.log("moreStats.makerHybrids: ");
// console.log(moreStats.makerHybrids);
// console.log("moreStats.avgMpgByYearAndHybrid : ");
// console.log(moreStats.avgMpgByYearAndHybrid);