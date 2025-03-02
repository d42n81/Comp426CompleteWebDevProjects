/**
 *
 * @param {number} a
 * @param {number} b
 * @returns {string} 'a + b = (a + b)'
 *
 * example: sumToString(3, 4)
 * returns: '3 + 4 = 7'
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */
export function sumToString(a, b) {
    let sum = a + b;
    return "" + a + " + " + b + " " +  "=" + " " + sum;
}


/**
 *
 * @param {number} startNumber
 * @param {number} endNumber
 * @returns {number[]}
 *
 * example: getIncreasingArray(3, 7)
 * returns: [ 3, 4, 5, 6, 7 ]
 *
 */
export function getIncreasingArray(startNumber, endNumber) {
    let difference = endNumber - startNumber;
    if (difference < 0) {
        let array = [];
        return array;;
    }
    let array = [difference + 1];
    for(let i = 0; i < difference + 1; i++) {
        // fill array;
        array[i] = startNumber + i;
        
    }
    return array;
}

/**
 *
 * @param {number[]} numbers
 * @return {{min: number, max: number}}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 * and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
 */
export function maxAndMin(numbers) {
    let mathObject = {
        min: undefined,
        max: undefined
    };

    mathObject.min = Math.min(...numbers);
    mathObject.max = Math.max(...numbers);
    
    return mathObject;
}

/**
 *
 * @param array - An array of any primitive type
 * @returns {object} Object where the keys are the values that were passed in
 * and the value was the number of times it occurred.
 *
 * example: countArray([3, 6, 3, 2, 2, 3, 'some', 'hello', 'some', [1, 2]])
 * returns: {'2': 2, '3': 3, '6': 1, some: 2, hello: 1, '1,2': 1}
 *
 */
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
// Personal Testing: 
// let numbers = [10,0,20,5];
// console.log("Sum to String: ");
// console.log(sumToString(5, 7));
// console.log("Get Increasing Array: ");
// console.log(getIncreasingArray(3,7));
// console.log("Max and Min: ");
// console.log(maxAndMin(numbers));
// console.log("Count Array:");
// console.log(countArray([{}, {}, [34, 43], [33, 33], {}, {}, [34, 43]]));