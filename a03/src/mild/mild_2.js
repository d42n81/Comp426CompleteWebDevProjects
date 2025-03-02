/**
 *
 * @param variable
 * @returns {{type: ("undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"), value: *}}
 * example: identifyVariable(4);
 * returns: { type: 'number', value: 4 }
 */
export function identifyVariable(variable) {
   let identifyObject = {
      type: undefined, 
      value: undefined
   };
   identifyObject.type = typeof(variable);
   identifyObject.value = variable;

   return identifyObject;
}


/**
 *
 * @param array
 * @returns {[]}
 * example: identifyArray(['some', 3, [3, 4], false]);
 * returns: [
 { type: 'string', value: 'some' },
 { type: 'number', value: 3 },
 { type: 'object', value: [ 3, 4 ] },
 { type: 'boolean', value: false }
 ]

 */
export function identifyArray(array) {
   let arrayOfTypes = new Array(array.length);
   for(let i = 0; i < array.length; i++) {
      arrayOfTypes[i] = identifyVariable(array[i]);
   }
   return arrayOfTypes;
}

/**
 * mutates the object that is passed in.
 * @param object
 * @param key
 * @returns {*} does not have to return anything
 *
 * example:
 * let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
};
 removeKey(obj, 'password');
 obj now does not contain the `password` field
 */
export function removeKey(object, key) {
   delete object[key];

}

/**
 * Does not mutate the object passed in
 * @param object
 * @param key
 * @returns {*} The object with its keys removed
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 * let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
};
 obj = removeKeyNonDestructive(obj, 'password');
 obj will not have the `password` field only because it was assigned the result of the function.
 If only `removeKeyNonDestructive` was called, nothing would have changed.
 */
export function removeKeyNonDestructive(object, key) {
   // Since we don't want to edit original object, we have to copy object. 
   // JS Objects are passed by reference, so we need a way to essentially reconstruct an object
   // from info about the object. 
   // Use JSON.stringify
   // According to the DOCS, this method won't copy an object's methods. Hopefully that 
   // won't matter for the assignment.
   let copyOfObject = JSON.parse(JSON.stringify(object));
   // Delete key from copied object. Return Copy:
   removeKey(copyOfObject, key);
   return copyOfObject;

}

/**
 * Remove and return the listed keys. Without mutating the object passed in.
 * @param object
 * @param {string[]} keyList
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 *
 * example:


 let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
 };
 obj = removeKeys(obj, ['password', 'age']);
 // object not looks like this
 { name: 'Mr. Boss', title: 'boss' }

 * @return {*} The object with its keys removed.
 */
export function removeKeys(object, keyList) {
   // Copy object. Remove keys in a loop of keyList's indices:
   let copyOfObject = JSON.parse(JSON.stringify(object));
   for(let i = 0; i < keyList.length; i++) {
      // loop through indices, remove from copyOfObject's properties list.
      removeKey(copyOfObject, keyList[i]);
   }
   return copyOfObject;

}

// console.log(identifyArray([5,"h", {}]));
