import {variance} from "./data/stats_helpers";


/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return array.reduce(reducer, 0);

}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */

 // Helper function:
export function compareNumbers(a, b){
    return a - b;
}
export function getMedian(array) {
    // even though the directions say to find the mean, according to the piazza I need to 
    // find median.

    let sortedArray = array.sort(compareNumbers).slice();
    let arrayLength = sortedArray.length;
    let median;
    if((arrayLength%2) == 0) {
        // even length
        // Median = ((Index of (Length/2)) + Index of ((Length / 2) - 1)) / 2
        median = ((sortedArray[arrayLength/2] + sortedArray[(arrayLength / 2) - 1]) / 2);

    } else {
        // odd length
        // Median = Index of (Length / 2) - 0.5
        median = (sortedArray[(arrayLength/2) -0.5]);
    }
    return median;

}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */

// Helper function: 
export function maxAndMin(numbers) {
    let mathObject = {
        min: undefined,
        max: undefined
    };

    mathObject.min = Math.min(...numbers);
    mathObject.max = Math.max(...numbers);
    
    return mathObject;
}

export function getStatistics(array) {
    let myObject = {
        length: undefined, 
        sum: undefined, 
        mean: undefined, 
        median: undefined, 
        min: undefined, 
        max: undefined, 
        variance: undefined, 
        standard_deviation: undefined
    };
    let mathObject = maxAndMin(array);

    myObject.length = array.length;
    myObject.sum = getSum(array);
    myObject.mean = myObject.sum / myObject.length;
    myObject.median = getMedian(array);
    myObject.min = mathObject.min;
    myObject.max = mathObject.max;
    myObject.variance = variance(array, myObject.mean);
    myObject.standard_deviation = Math.sqrt(myObject.variance);

    return myObject;


}

