/**************************************************************************
 *
 * Functions as first-class citizens
 *
 **************************************************************************/

/**
 * Write and export a function named "repeat" that calls a given function
 *   over and over a specified number of times.
 *
 * @param fn      The function to repetitively call
 * @param n       The number of times to call the function
 * @param params  An array of parameters to pass to every function invocation
 * @return        Returns an array containing the return values obtained
 *                from calling the function
 */
export const repeat = (fn, n, ...params) => {
    let arrayToReturn = new Array(0);
    for(let i = 0; i<n; i++) {
        // for(let j = 0; j < params.length; j++) {
        //     arrayToReturn.push(fn.apply(this, params[j]));
        // }
        arrayToReturn.push(fn(...params));
        
    }
    return arrayToReturn;
};


/**
 * Use the repeat function to log the string "Hello, world!" to the console
 *   10 times.
 */
export const repeatDemo = () => {
    repeat(console.log, 10, "Hello, world!");
    // for(let i = 0; i < 10; i++) {
    //     console.log("Hellw, world!");
    // }
};


/**************************************************************************
 *
 * Function currying
 *
 **************************************************************************/

/**
 * Write and export a function named "multiplyBy" which takes a single number
 *   parameter "num1" and returns a function that takes a different number
 *   parameter "num2". The returned function should calculate and return the
 *   product of num1 and num2.
 */
export const multiplyBy = (num1) => {
    return (num2) => {
        return num1 * num2;
    }
};


/**
 * Use the multiplyBy function to create and export a function named
 *   "tenTimes" that multiplies a number by 10.
 */
export const tenTimes = multiplyBy(10);


/**
 * Write and export a function named "tenTimesFifty" which uses the tenTimes
 *   function to multiply 50 by 10 and returns the result.
 */
export const tenTimesFifty = () => {
    return tenTimes(50);
};


/**************************************************************************
 *
 * Array callback filtering
 *
 **************************************************************************/

/**
 * Write and export a function named "everyEven" which takes an array and a test
 *   function for checking individual elements of the array. The "everyEven"
 *   function should test the even elements of the array and return true only
 *   if at least one of the even elements passes the test.
 *
 * @param arr   An array whose even elements should be tested
 * @param test  A function which takes as input a single element of the array
 *              and returns true or false, such that true means the element
 *              passed the test and false means it failed
 * @return      boolean true if at every even-indexed element passes the test
 *              function
 *
 * Example usage:
 *    everyEven([1, 5, 1, 0, 1], x => x === 1)  <--  returns true
 *    everyEven([1, 1, 0, 1, 1], x => x === 1)  <--  returns false
 */
export const everyEven = (arr, test) => {
    // Despite the initial direcertions, I believe the function only returns 
    // true if literally every even index would return true for the condition:
    let finalBooleanToReturn = true;
    for(let i = 0; i < arr.length; i+=2) {
        if(test(arr[i]) != true) {
            finalBooleanToReturn = false;
        }
    }
    return finalBooleanToReturn;
};


/**
 * Write and export a function named "someEven" which takes an array and a test
 *   function for checking individual elements of the array. The "someEven"
 *   function should test the even elements of the array and return true only
 *   if at least one of the even elements passes the test.
 *
 * @param arr   An array whose even elements should be tested
 * @param test  A function which takes as input a single element of the array
 *              and returns true or false, such that true means the element
 *              passed the test and false means it failed
 * @return      boolean true if at least one even-indexed element passes the
 *              test function
 *
 * Example usage:
 *    someEven([4, 3, 2, 1, 0], x => x === 3)  <--  returns false
 *    someEven([1, 0, 1, 0, 1], x => x === 0)  <--  returns false
 *    someEven([1, 1, 1, 1, 0], x => x === 0)  <--  returns true
 *    someEven([0, 0, 0, 0, 0], x => x === 0)  <--  returns true
 */
export const someEven = (arr, test) => {
    let finalBooleanToReturn = false;
    for(let i = 0; i < arr.length; i+=2) {
        if(test(arr[i])) {
            finalBooleanToReturn = true;
        }
    }
    return finalBooleanToReturn;

};


/**
 * Write and export a function named "filter" which takes an array and a test
 *   function for checking individual elements of the array. The "filter"
 *   function should test the elements of the array and return true only
 *   if all of the odd elements pass the test.
 *
 * @param arr   An array whose elements should be tested
 * @param test  A function which takes as input a single element of the array
 *              and returns true or false, such that true means the element
 *              passes the test and false means it fails the test
 * @return      {fail: [], pass: []} an object with two keys: "pass" and "fail". The value
 *              of "pass" should be an array containing all the elements of arr
 *              which passed the test. The value of "fail" should be an array
 *              containing all the elements of arr which failed the test.
 *
 * Example usage:
 *    filter(['yes', 'nope', 'maybe', 'yellow'], x => x[0] === 'y')
 *       -->  { pass: ['yes', 'yellow'], fail: ['nope', 'maybe'] }
 *    filter([1, 90, 5, 31], x => x % 2 === 1)
 *       -->  { pass: [1, 5, 31], fail: [90] }
 */
export const filter = (arr, test) => {
    let objectToReturn = {
        pass: undefined,
        fail: undefined
    };
    objectToReturn.pass = new Array(0);
    objectToReturn.fail = new Array(0);
    for(let i = 0; i < arr.length; i++) {
        // console.log("Top of Loop");
        if(test(arr[i])) {
            // if true:
            objectToReturn.pass.push(arr[i]);
        } else {
            // console.log("Test failed! Pushing: ");
            // console.log(arr[i]);
            // false
            objectToReturn.fail.push(arr[i]);
        }
    }
    return objectToReturn;

};


/**
 * Write and export a function named "allEvensAreOdd" which takes as input an
 *   array and returns true only if all of the even elements in the array are
 *   odd numbers. Use the "everyEven" function in this function.
 */
export const allEvensAreOdd = (arr) => {
    return everyEven(arr, x => x % 2 === 1);
};


/**
 * Write and export a function named "anEvenIsOdd" which takes as input an
 *   array and returns true if at least one of the even-indexed elements in the
 *   array is an odd number. Use the "someEven" function in this function.
 */
export const anEvenIsOdd = (arr) => {
    return someEven(arr, x => x%2 === 1);    

};


/**
 * Write and export a function named "hasExactly" which takes an array, a test
 *   function for checking individual elements of the array, and a number n.
 *   The "hasExactly" function should return true only if exactly n elements
 *   pass the test. You must use the filter function.
 */
export const hasExactly = (arr, test, n) => {
    let filterObject = filter(arr, test);
    let trueCounter = filterObject.pass.length;
    return (trueCounter === n);
};


// repeatDemo();
// for(let i = 0; i < 10; i++) {
//     console.log("Hello World");
// }

// console.log("multiplyBy(10)(5) =");
// console.log(multiplyBy(10)(5));
// console.log(tenTimes(5));
// console.log(filter(['yes', 'nope', 'maybe', 'yellow'], x => x[0] === 'y'));