/* Homework IV                        
*                                                                 
* Problem 1: Insertion Sort                                          
*                                                                 
* Prompt:    Given an unsorted array of integers, return the array   
*            sorted using insertion sort.                            
*                                                                 
*            What are the time and auxilliary space complexity?      
*                                                                 
* Input:     An unsorted array of integers                           
* Output:    A sorted array of integers                              
*                                                                 
* Example:   input = [3,9,1,4,7] , output = [1,3,4,7,9]              
*                                                                 
*                                                                 
*                                                                 
* Problem 2: Selection Sort                                          
*                                                                 
* Prompt:    Given an unsorted array of integers, return the array   
*            sorted using selection sort.                            
*                                                                 
*            What are the time and auxilliary space complexity?      
*                                                                 
* Input:     An unsorted array of integers                           
* Output:    A sorted array of integers                              
*                                                                 
* Example:   input = [3,9,1,4,7] , output = [1,3,4,7,9]              
*                                                                 
*                                                                 
*                                                                 
* Problem 3: Bubble Sort                                             
*                                                                 
* Prompt:    Given an unsorted array of integers, return the array   
*            sorted using bubble sort.                               
*                                                                 
*            What are the time and auxilliary space complexity?      
*                                                                 
* Input:     An unsorted array of integers                           
* Output:    A sorted array of integers                              
*                                                                 
* Example:   input = [3,9,1,4,7] , output = [1,3,4,7,9]  
*
*/

'use strict';


// Time Complexity: O(n^2)
// Auxiliary Space Complexity: 0(1) 
function insertionSort(input){
  for (var i = 0; i < input.length; i++) {
    // store the current value because it may shift later
    var value = input[i];
    /*
    * Whenever the value in the sorted section is greater than the value
    * in the unsorted section, shift all items in the sorted section over
    * by one. This creates space in which to insert the value.
    */
    for (var j = i - 1; j >= 0 && input[j] > value; j--) {
      input[j+1] = input[j];
    }
    input[j+1] = value;
  }
  return input;
};
  

// Time Complexity: O(n^2)
// Auxiliary Space Complexity: O(1) 
function selectionSort(input){
  var length = input.length;
  for (var i = 0; i < length - 1; i++) {
    //Number of passes
    var min = i; //min holds the current minimum number position for each pass; i holds the Initial min number
    for (var j = i + 1; j < length; j++) { //Note that j = i + 1 as we only need to go through unsorted array
      if (input[j] < input[min]) { //Compare the numbers
          min = j; //Change the current min number position if a smaller num is found
      }
    }
    if (min != i) {
      //After each pass, if the current min num != initial min num, exchange the position.
      //Swap the numbers 
      var temp = input[i];
      input[i] = input[min];
      input[min] = temp;
    }
  }
  return input;
};


// Time Complexity: O(n^2)
// Auxiliary Space Complexity: O(1) 
function bubbleSort(input){
  var length = input.length;
  for (var i = (length - 1); i >= 0; i--) {
    //Number of passes
    for (var j = (length - i); j > 0; j--) {
      //Compare the adjacent positions
      if (input[j] < input[j - 1]) {
        //Swap the numbers
        var temp = input[j];
        input[j] = input[j - 1];
        input[j - 1] = temp;
      }
    }
  }
  return input;
};






































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

console.log('Insertion Sort Tests');
var testCount = [0, 0];

assert(testCount, 'should sort example input', function(){
  var example = insertionSort([3,9,1,4,7]);
  return arraysEqual(example, [1,3,4,7,9]);
});

assert(testCount, 'should return empty array for empty input', function(){
  var example = insertionSort([]);
  return arraysEqual(example, []);
});

assert(testCount, 'should sort single-element input', function(){
  var example = insertionSort([10]);
  return arraysEqual(example, [10]);
});

assert(testCount, 'should sort moderate-sized input', function(){
  var work = [];
  for (var i = 0; i < 1000; i++){
    work.push(Math.floor(Math.random() * 1000));
  }
  var example = insertionSort(work);
  return example.length === 1000 && arraysEqual(example, work.sort());
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('Selection Sort Tests');
var testCount = [0, 0];

assert(testCount, 'should sort example input', function(){
  var example = selectionSort([3,9,1,4,7]);
  return arraysEqual(example, [1,3,4,7,9]);
});

assert(testCount, 'should return empty array for empty input', function(){
  var example = selectionSort([]);
  return arraysEqual(example, []);
});

assert(testCount, 'should sort single-element input', function(){
  var example = selectionSort([10]);
  return arraysEqual(example, [10]);
});

assert(testCount, 'should sort moderate-sized input', function(){
  var work = [];
  for (var i = 0; i < 1000; i++){
    work.push(Math.floor(Math.random() * 1000));
  }
  var example = selectionSort(work);
  return example.length === 1000 && arraysEqual(example, work.sort());
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('Bubble Sort Tests');
var testCount = [0, 0];

assert(testCount, 'should sort example input', function(){
  var example = bubbleSort([3,9,1,4,7]);
  return arraysEqual(example, [1,3,4,7,9]);
});

assert(testCount, 'should return empty array for empty input', function(){
  var example = bubbleSort([]);
  return arraysEqual(example, []);
});

assert(testCount, 'should sort single-element input', function(){
  var example = bubbleSort([10]);
  return arraysEqual(example, [10]);
});

assert(testCount, 'should sort moderate-sized input', function(){
  var work = [];
  for (var i = 0; i < 1000; i++){
    work.push(Math.floor(Math.random() * 1000));
  }
  var example = bubbleSort(work);
  return example.length === 1000 && arraysEqual(example, work.sort());
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

// custom function for checking if array is sorted (linear runtime)
function isSorted(input){
  if (input.length < 2){
    return true;
  }
  for (var i = 1; i < input.length; i++){
    if (input[i-1] > input[i]){
      return false;
    }
  }
  return true;
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





