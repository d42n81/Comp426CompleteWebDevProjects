import mpg_data from "./data/mpg_data";

/*
mpg_data is imported for you but that is for testing purposes only. All of the functions should use
a car_data param that is supplied as the first parameter.

As you write these functions notice how they could possibly be chained together to solve more complicated
queries.
 */

/**
 * @param {array} car_data - an instance of mpg_data that should be used for filtering.
 * @param minHorsepower {number}
 * @param minTorque {number}
 *
 * @return {array} An array of car objects with horsepower >= minHorsePower and torque >= minTorque
 * sorted by horsepower in descending order.
 *
 */
export function searchHighPower(car_data, minHorsepower, minTorque) {
    // first, filter array where horsepower >= minHorsepower and torque >= minTorque:
    let filteredArray = car_data.slice().filter(function(obj) {return ((obj.horsepower >= minHorsepower) && (obj.torque >= minTorque));});
    // now sort the array by horsepower descending order.
    filteredArray.sort(function (a,b) {return b.horsepower - a.horsepower;});
    return filteredArray;
}


/**
 * @param {array} car_data
 * @param minCity
 * @param minHighway
 *
 *
 * @return {array} An array of car objects with highway_mpg >= minHighway and city_mpg >= minCity
 * sorted by highway_mpg in descending order
 *
 */
export function searchMpg(car_data, minCity, minHighway) {
    // same as the last function. Filter by highway_mpg >= minHighway and city_mpg >= minCity. 
    // Then sort by b.highway_mpg - a.highway_mpg;
    let filteredArray = car_data.slice().filter(function(obj) {return ((obj.highway_mpg>= minHighway) &&(obj.city_mpg >= minCity));});
    filteredArray.sort(function(a,b) {return b.highway_mpg - a.highway_mpg;});
    return filteredArray;
}


/**
 * Find all cars where 'id' contains the search term below.
 * Sort the results so that if the term appears earlier in the string
 * it will appear earlier in the list. Make sure searching and sorting ignores case.
 * @param car_data
 * @param searchTerm A string to that is used for searching
 * @returns {[]} array of cars
 */
export function searchName(car_data, searchTerm) {
    // use includes to filter array.
    // index of to sort array.
    let filteredArray = car_data.slice().filter(function (obj) {return (obj.id.toLowerCase().includes(searchTerm.toLowerCase()));});
    // now the array is filled only with cars with ids that contain the search term.
    // sort with index of:
    filteredArray.sort(function (a,b) {return (a.id.indexOf(searchTerm) - b.id.indexOf(searchTerm));});
    return filteredArray;
}


/**
 * Find all cars made in the years asked for.
 * Sort the results by year in descending order. 
 *
 * @param car_data
 * @param {number[]} years - array of years to be included in the results e.g. [2010, 2012]
 * @returns {[]} an array of car objects
 */
export function searchByYear(car_data, years) {
    let filteredArray = new Array(0);
    let copyOfCarData = car_data.slice();
    for(let i = 0; i < copyOfCarData.length; i++) {
        for(let j = 0; j < years.length; j++) {
            if(copyOfCarData[i].year == years[j]) {
                filteredArray.push(copyOfCarData[i]);
            }
            
        }
    }
    // now I have filteredArray filled with all the cars that fit the given years.
    // I now need to sort the array by the years in descending order:
    filteredArray.sort(function (a,b) {return b.year-a.year;});
    return filteredArray;
    
}

console.log(searchName(mpg_data, "HONDA"));
