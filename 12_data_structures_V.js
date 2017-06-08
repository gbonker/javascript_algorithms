 /*
  *                                 Homework XII                                  
  *                                                                                
  *  Problem: Heap                                                                
  *                                                                                
  *  Prompt: Create a Heap class/constructor 
  *
  *  The Heap will take in the following input: 
  *
  *                type: argument should be either 'min' or 'max'. This will 
  *                      dictate whether the heap will be a minheap or maxheap. 
  *                      The comparator method will be affected by this 
  *                      argument. See method description below
  *                                                                                
  *  The Heap will have the following property:                                 
  *                                                                                
  *             storage: array
  *
  *                type: property that will be either 'min' or 'max'. This will
  *                      be dictated by 
  *                                                           
  *  The Heap will have the following methods:                               
  *
  *             compare: takes in two arguments (a and b). Depending on the heap
  *                      type (minheap or maxheap), the comparator will behave
  *                      differently. If the heap is a minheap, then the compare
  *                      function will return true if a is less than b, false 
  *                      otherwise. If the heap is a maxheap, then the compare 
  *                      function will return true if a is greater than b, false
  *                      otherwise. 
  *                                                                                
  *                swap: takes in two indexes and swaps the elements at the two 
  *                      indexes in the storage array
  *                                                                                
  *                peak: returns the peak element of the storage array. This 
  *                      will be the most minimum and maximum element for a 
  *                      minheap and maxheap respectively
  *                                                                                
  *                size: returns the number of elements in the heap
  *                            
  *              insert: inserts a value into the heap. Should begin by pushing 
  *                      the value onto the end of the array, and then calling 
  *                      the bubbleUp method from the last index of the array
  *                                                                                
  *            bubbleUp: takes in an index, and considers the element at that 
  *                      index to be a child. Continues to swap that child with 
  *                      its parent value if the heap comparator condition is 
  *                      not fulfilled
  *                                                                                
  *          removePeak: removes the peak element from the heap and returns it. 
  *                      Should begin by swapping the 0th-index element with the 
  *                      last element in the storage array. Uses bubbleDown 
  *                      method from the 0th index 
  *                                                                                
  *          bubbleDown: takes in an index, and considers the element at this 
  *                      index to be the parent. Continues to swap this parent
  *                      element with its children if the heap comparator 
  *                      condition is not fulfilled 
  *                                                                                
  *              remove: takes in a value and (if it exists in the heap), 
  *                      removes that value from the heap data structure and 
  *                      returns it. Should rearrange the rest of the heap to 
  *                      ensure the heap comparator conditions are fulfilled
  *                      for all of its elements
  *                      
  *                      
  *                                                                                
  *  Input:  N/A                                                                   
  *  Output: A Heap instance                                                      
  *                                                                                
  *  What are the time and auxilliary space complexities of the various methods?   
  *                                                                                
  */

'use strict';
 


class Heap {

  constructor(type){
    this.storage = [];
    this.type = "min";
    if (type === "max") {
      this.type = "max";
    }
  }

  // Time Complexity: O(1)
  // Auxiliary Space Complexity: O(1) 
  compare(a, b){
    if (this.type === "min") {
      return this.storage[a] < this.storage[b];
    } else {
      return this.storage[a] > this.storage[b];
    }
  }

  // Time Complexity: O(1)
  // Auxiliary Space Complexity: O(1)
  swap(index1, index2){
    var temp = this.storage[index1];
    this.storage[index1] = this.storage[index2];
    this.storage[index2] = temp;
  }

  // Time Complexity: O(1)
  // Auxiliary Space Complexity: O(1)
  peak(){
    return this.storage[0];
  }

  // Time Complexity: O(1)
  // Auxiliary Space Complexity: O(1) 
  size(){
    return this.storage.length;
  }

  // Time Complexity: O(logn)
  // Auxiliary Space Complexity: O(1) 
  insert(value){
    this.storage.push(value);
    this.bubbleUp(this.size() - 1);
  }

  // Time Complexity: O(logn)
  // Auxiliary Space Complexity: O(1) 
  bubbleUp(childIndex){
    var parentIndex = this.getParentIndex(childIndex);
    
    if (this.type === "min") {
      while (childIndex > 0 && this.storage[parentIndex] > this.storage[childIndex]) {
        this.swap(childIndex, parentIndex);

        childIndex = parentIndex;
        parentIndex = this.getParentIndex(childIndex);
      }  
    } else {
      while (childIndex > 0 && this.storage[parentIndex] < this.storage[childIndex]) {
        this.swap(childIndex, parentIndex);

        childIndex = parentIndex;
        parentIndex = this.getParentIndex(childIndex);
      } 
    }
  }
  
  getParentIndex(childIndex){
    if (childIndex % 2 === 0){
      return (childIndex - 2) / 2;
    } else {
      return (childIndex - 1) / 2;
    }
  }

  // Time Complexity: O(logn)
  // Auxiliary Space Complexity: O(1) 
  removePeak(){
    this.swap(0, this.size() - 1);
    var removedElement = this.storage.pop();
    this.bubbleDown(0);
    return removedElement;
  }

  // Time Complexity: O(logn)
  // Auxiliary Space Complexity: O(1) 
  bubbleDown(parentIndex){
    var childIndex = this.getChildIndex(parentIndex);

    if (this.type === "min") {
      while (parentIndex < this.size() - 1 && this.storage[parentIndex] > this.storage[childIndex]) {
        this.swap(parentIndex, childIndex);

        parentIndex = childIndex;
        childIndex = this.getChildIndex(parentIndex);  
      }  
    } else {
      while (parentIndex < this.size() - 1 && this.storage[parentIndex] < this.storage[childIndex]) {
        this.swap(parentIndex, childIndex);

        parentIndex = childIndex;
        childIndex = this.getChildIndex(parentIndex);  
      }
    }
  }
  
  getChildIndex(parentIndex){
    let ci1 = 2 * parentIndex + 1;
    let ci2 = 2 * parentIndex + 2;
    
    if (this.type === "min") { 
      if (ci1 >= this.size()){
        return ci1;
      } else if (ci2 >= this.size()){
        return ci1;
      } else if (this.storage[ci1] < this.storage[ci2]){
        return ci1;
      } else {
        return ci2;
      }
    } else {
      if (ci1 >= this.size()){
        return ci1;
      } else if (ci2 >= this.size()){
        return ci1;
      } else if (this.storage[ci1] > this.storage[ci2]){
        return ci1;
      } else {
        return ci2;
      }
    }
  }


  // Time Complexity: O(logn)
  // Auxiliary Space Complexity: O(1)
  remove(value){
    var indexToRemove = this.storage.indexOf(value);
    if (indexToRemove > -1) {
      this.swap(indexToRemove, this.size() - 1);
      var removedElement = this.storage.pop();
      this.bubbleDown(indexToRemove);
      this.bubbleUp(indexToRemove);
      return removedElement;
    }
  }  
}
































////////////////////////////////////////////////////////////
///////////////  DO NOT TOUCH TEST BELOW!!!  ///////////////
////////////////////////////////////////////////////////////

// code for capturing console.log output
var record = [];
(function () {
  var log = console.log;
  console.log = function () {
    record = record.concat(Array.prototype.slice.call(arguments));
    log.apply(this, Array.prototype.slice.call(arguments));
  };
}());


console.log('Heap Class');
var testCount = [0, 0];

assert(testCount, 'able to create an instance', function(){
  var work = new Heap();
  return typeof work === 'object';
});

assert(testCount, 'has storage property', function(){
  var work = new Heap();
  return work.hasOwnProperty('storage');
});

assert(testCount, 'has type property', function(){
  var work = new Heap();
  return work.hasOwnProperty('type');
});

assert(testCount, 'default storage set to an array', function(){
  var work = new Heap();
  return Array.isArray(work.storage);
});

assert(testCount, 'default type property is set to \'min\'', function(){
  var work = new Heap();
  return work.type === 'min';
});

assert(testCount, 'default type property can be set to \'max\'', function(){
  var work = new Heap('max');
  return work.type === 'max';
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('Heap compare method');
var testCount = [0, 0];

assert(testCount, 'has compare method', function(){
  var work = new Heap();
  return Object.prototype.toString.apply(work.compare) === '[object Function]';
});

assert(testCount, 'returns true for minheap if element at first argument index is less than element at second argument index', function(){
  var work = new Heap('min');
  work.storage.push(1);
  work.storage.push(10);
  return work.compare(0, 1) === true;
});

assert(testCount, 'returns false for minheap if element at first argument index is greater than element at second argument index', function(){
  var work = new Heap('min');
  work.storage.push(10);
  work.storage.push(1);
  return work.compare(0, 1) === false;
});

assert(testCount, 'returns true for maxheap if element at first argument index is greater than element at second argument index', function(){
  var work = new Heap('max');
  work.storage.push(10);
  work.storage.push(1);
  return work.compare(0, 1) === true;
});

assert(testCount, 'returns false for maxheap if element at first argument index is less than element at second argument index', function(){
  var work = new Heap('max');
  work.storage.push(1);
  work.storage.push(10);
  return work.compare(0, 1) === false;
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('Heap swap method');
var testCount = [0, 0];

assert(testCount, 'has swap method', function(){
  var work = new Heap();
  return Object.prototype.toString.apply(work.swap) === '[object Function]';
});

assert(testCount, 'should be able to swap the locations of two elements given two indices', function(){
  var work = new Heap();
  work.storage.push(1);
  work.storage.push(5);
  work.storage.push(10);
  work.swap(0, 2);
  return work.storage[0] === 10 && work.storage[2] === 1;
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('Heap peak method');
var testCount = [0, 0];

assert(testCount, 'has peak method', function(){
  var work = new Heap();
  return Object.prototype.toString.apply(work.peak) === '[object Function]';
});

assert(testCount, 'should return the 0th element of the storage array', function(){
  var work = new Heap();
  work.storage.push(1);
  work.storage.push(5);
  work.storage.push(10);
  return work.peak() === 1;
});

assert(testCount, 'upon building out your insert method, should return the smallest element for a minheap', function(){
  var work = new Heap('min');
  work.insert(2);
  work.insert(5);
  work.insert(10);
  work.insert(1);
  return work.peak() === 1;
});

assert(testCount, 'upon building out your insert method, should return the largest element for a maxheap', function(){
  var work = new Heap('max');
  work.insert(2);
  work.insert(5);
  work.insert(10);
  work.insert(1);
  return work.peak() === 10;
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('Heap size method');
var testCount = [0, 0];

assert(testCount, 'has size method', function(){
  var work = new Heap();
  return Object.prototype.toString.apply(work.size) === '[object Function]';
});

assert(testCount, 'returns number of elements in the storage array', function(){
  var work = new Heap();
  work.storage.push(1);
  work.storage.push(5);
  work.storage.push(10);
  return work.size() === 3;
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('Heap insert method');
var testCount = [0, 0];

assert(testCount, 'has insert method', function(){
  var work = new Heap();
  return Object.prototype.toString.apply(work.insert) === '[object Function]';
});

assert(testCount, 'should be able to insert a single element', function(){
  var work = new Heap('min');
  work.insert(5);
  return work.storage[0] === 5;
});

assert(testCount, 'should be able to insert multiple elements into a minheap and have peak element be smallest element', function(){
  var work = new Heap('min');
  work.insert(5);
  work.insert(10);
  work.insert(7);
  work.insert(1);
  work.insert(8);
  work.insert(6);
  return work.peak() === 1;
});

assert(testCount, 'should be able to insert multiple elements into a maxheap and have peak element be largest element', function(){
  var work = new Heap('max');
  work.insert(5);
  work.insert(10);
  work.insert(7);
  work.insert(1);
  work.insert(8);
  work.insert(6);
  return work.peak() === 10;
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('Heap bubbleUp method');
var testCount = [0, 0];

assert(testCount, 'has bubbleUp method', function(){
  var work = new Heap();
  return Object.prototype.toString.apply(work.bubbleUp) === '[object Function]';
});

assert(testCount, 'should be able to \'bubble up\' an element if its minheap condition is not fulfilled', function(){
  var work = new Heap('min');
  work.storage = [2,4,7,6,9,10,8,1];
  work.bubbleUp(7);
  return arraysEqual([1,2,7,4,9,10,8,6], work.storage);
});

assert(testCount, 'should be able to \'bubble up\' an element if its maxheap condition is not fulfilled', function(){
  var work = new Heap('max');
  work.storage = [9,8,5,7,3,6,2,10];
  work.bubbleUp(7);
  return arraysEqual([10,9,5,8,3,6,2,7], work.storage);
});

assert(testCount, 'should not perform bubbling up if minheap conditions are fulfilled', function(){
  var work = new Heap('min');
  work.storage = [1,2,7,4,9,10,8,6];
  work.bubbleUp(7);
  return arraysEqual([1,2,7,4,9,10,8,6], work.storage);
});

assert(testCount, 'should not perform bubbling up if maxheap conditions are fulfilled', function(){
  var work = new Heap('max');
  work.storage = [10,9,5,8,3,6,2,7];
  work.bubbleUp(7);
  return arraysEqual([10,9,5,8,3,6,2,7], work.storage);
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('Heap removePeak method');
var testCount = [0, 0];

assert(testCount, 'has removePeak method', function(){
  var work = new Heap();
  return Object.prototype.toString.apply(work.removePeak) === '[object Function]';
});

assert(testCount, 'should be able to remove a single element', function(){
  var work = new Heap();
  work.insert(5);
  work.removePeak();
  return work.storage.length === 0;
});

assert(testCount, 'should be able to remove and return peak element for a minheap and rearrange minheap accordingly', function(){
  var work = new Heap('min');
  work.storage = [1,2,7,4,9,10,8,6];
  var example = work.removePeak();
  return example === 1 && arraysEqual([2,4,7,6,9,10,8], work.storage);
});

assert(testCount, 'should be able to remove and return peak element for a maxheap and rearrange maxheap accordingly', function(){
  var work = new Heap('max');
  work.storage = [10,9,5,8,3,6,2,7];
  var example = work.removePeak();
  return example === 10 && arraysEqual([9,8,5,7,3,6,2], work.storage);
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('Heap bubbleDown method');
var testCount = [0, 0];

assert(testCount, 'has bubbleDown method', function(){
  var work = new Heap();
  return Object.prototype.toString.apply(work.bubbleDown) === '[object Function]';
});

assert(testCount, 'should be able to \'bubble down\' an element if its minheap condition is not fulfilled', function(){
  var work = new Heap('min');
  work.storage = [10,1,2,7,4,9,8,6];
  work.bubbleDown(0);
  return arraysEqual([1,4,2,7,10,9,8,6], work.storage);
});

assert(testCount, 'should be able to \'bubble down\' an element if its maxheap condition is not fulfilled', function(){
  var work = new Heap('max');
  work.storage = [2,10,9,5,8,3,6,7];
  work.bubbleDown(0);
  return arraysEqual([10,8,9,5,2,3,6,7], work.storage);
});

assert(testCount, 'should not perform bubbling down if minheap conditions are fulfilled', function(){
  var work = new Heap('min');
  work.storage = [1,2,7,4,9,10,8,6];
  work.bubbleDown(0);
  return arraysEqual([1,2,7,4,9,10,8,6], work.storage);
});

assert(testCount, 'should not perform bubbling down if maxheap conditions are fulfilled', function(){
  var work = new Heap('max');
  work.storage = [10,9,5,8,3,6,2,7];
  work.bubbleDown(0);
  return arraysEqual([10,9,5,8,3,6,2,7], work.storage);
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('Heap remove method');
var testCount = [0, 0];

assert(testCount, 'has remove method', function(){
  var work = new Heap();
  return Object.prototype.toString.apply(work.remove) === '[object Function]';
});

assert(testCount, 'is able to remove specified value from minheap', function(){
  var work = new Heap('min');
  work.storage = [1,2,7,4,9,10,8,6];
  var example = work.remove(10);
  return example === 10 && arraysEqual(work.storage, [1,2,6,4,9,7,8]);
});

assert(testCount, 'is able to remove specified value from maxheap', function(){
  var work = new Heap('max');
  work.storage = [10,9,5,8,3,6,2,7];
  var example = work.remove(6);
  return example === 6 && arraysEqual(work.storage, [10,9,7,8,3,5,2]);
});

assert(testCount, 'is able to remove last value from minheap', function(){
  var work = new Heap('min');
  work.storage = [1,2,7,4,9,10,8,6];
  var example = work.remove(6);
  return example === 6 && arraysEqual(work.storage, [1,2,7,4,9,10,8]);
});

assert(testCount, 'is able to remove last value from maxheap', function(){
  var work = new Heap('max');
  work.storage = [10,9,5,8,3,6,2,7];
  var example = work.remove(7);
  return example === 7 && arraysEqual(work.storage, [10,9,5,8,3,6,2]);
});

assert(testCount, 'does not remove anything from minheap if value does not exist', function(){
  var work = new Heap('min');
  work.storage = [1,2,7,4,9,10,8,6];
  work.remove(3);
  return arraysEqual(work.storage, [1,2,7,4,9,10,8,6]);
});

assert(testCount, 'does not remove anything from maxheap if value does not exist', function(){
  var work = new Heap('max');
  work.storage = [10,9,5,8,3,6,2,7];
  work.remove(4);
  return arraysEqual(work.storage, [10,9,5,8,3,6,2,7]);
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');



// function for checking if arrays are equal
function arraysEqual(arr1, arr2) {
  if(arr1.length !== arr2.length)
    return false;
  for(var i = arr1.length; i--;) {
    if(arr1[i] !== arr2[i])
      return false;
  }
  return true;
}

// function for checking if arrays contain same elements 
// (do not need to be in the same order)
function arraysMatching(arr1, arr2){
  if (arr1.length !== arr2.length){
    return false;
  } else {
    var lib = {};
    for (var i = 0; i < arr1.length; i++){
      lib[arr1[i]] = true;
    }
    for (var j = 0; j < arr2.length; j++){
      if (lib[arr2[j]] === undefined){
        return false;
      }
    }
    return true;
  }
}

// custom assert function to handle tests
// Array count : keeps track out how many tests pass and how many total
//   in the form of a two item array i.e., [0, 0]
// String name : describes the test
// Function test : performs a set of operations and returns a boolean
//   indicating if test passed 
function assert(count, name, test){
  if(!count || !Array.isArray(count) || count.length !== 2) { 
    count = [0, '*']; 
  } else {
    count[1]++;
  }
  
  var pass = 'false';
  var errMsg = null;
  try {
    if (test()) { 
      pass = ' true';
      count[0]++;
    } 
  } catch(e) {
    errMsg = e;
  } 
  console.log('  ' + (count[1] + ')   ').slice(0,5) + pass + ' : ' + name);
  if (errMsg !== null) {
    console.log('       ' + errMsg + '\n');
  }
}

