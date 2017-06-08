/*
*  Homework VI
*
*  Problem 1: Quicksort
*
*  Prompt:    Given an unsorted array of integers, return the array
*             sorted using quicksort.
*
*             What are the time and auxilliary space complexity?
*
*  Input:     An unsorted array of integers
*  Output:    A sorted array of integers
*
*  Example:   input = [3,9,1,4,7] , output = [1,3,4,7,9]
*
*
*  Problem 2: Mergesort
*
*  Prompt:    Given an unsorted array of integers, return the array
*             sorted using mergesort.
*
*             What are the time and auxilliary space complexity?
*
*  Input:     An unsorted array of integers
*  Output:    A sorted array of integers
*
*  Example:   input = [3,9,1,4,7] , output = [1,3,4,7,9]
*
*/

'use strict';

// Time Complexity: O(n^2)
// Auxiliary Space Complexity: O(1) 
function quicksort(input){

  function divide(start, end) {
    if (start >= end) {
      return;
    }
    var mid = start;
    for (var i = start; i < end; i++) {
      if (input[i] < input[end]) {
        var temp = input[i];
        input[i] = input[mid];
        input[mid] = temp;
        mid++;
      }
    }
    var swapper = input[mid];
    input[mid] = input[end];
    input[end] = swapper;
    
    divide(start, mid - 1);
    divide(mid + 1, end);
  }
  divide(0, input.length - 1);
  return input;
}

// Time Complexity: O(nlogn)
// Auxiliary Space Complexity: O(n) 
function mergesort(input) {
  if (input.length < 2) {
    return input;
  }
    
  var mid = Math.floor(input.length /2);
  var subLeft = mergesort(input.slice(0,mid));
  var subRight = mergesort(input.slice(mid));

  return merge(subLeft, subRight);
}

function merge(a, b){
  var result = [];
  var i = 0;
  var j = 0;
  while(i < a.length || j < b.length){
    if(a[i] === undefined){
      result.push(b[j]);
      j++;
    }
    else if(b[j] === undefined){
      result.push(a[i]);
      i++;
    }
    else if(a[i] <= b[j]){
      result.push(a[i]);
      i++;
    }
    else{
      result.push(b[j]);
      j++;
    }
  }
  
  return result;
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

console.log('Quick Sort Tests');
var testCount = [0, 0];

assert(testCount, 'should sort example input', function(){
  var example = quicksort([3,9,1,4,7]);
  return arraysEqual(example, [1,3,4,7,9]);
});

assert(testCount, 'should return empty array for empty input', function(){
  var example = quicksort([]);
  return arraysEqual(example, []);
});

assert(testCount, 'should sort single-element input', function(){
  var example = quicksort([10]);
  return arraysEqual(example, [10]);
});

assert(testCount, 'should sort moderate-sized input', function(){
  var work = [];
  for (var i = 0; i < 1000; i++){
    work.push(Math.floor(Math.random() * 1000));
  }
  var example = quicksort(work);
  return example.length === 1000 && isSorted(example);
});

assert(testCount, 'should sort large input', function(){
  var work = [];
  for (var i = 0; i < 1000000; i++){
    work.push(Math.floor(Math.random() * 1000000));
  }
  var example = quicksort(work);
  return example.length === 1000000 && isSorted(example);
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('Merge Sort Tests');
var testCount = [0, 0];

assert(testCount, 'should sort example input', function(){
  var example = mergesort([3,9,1,4,7]);
  return arraysEqual(example, [1,3,4,7,9]);
});

assert(testCount, 'should return empty array for empty input', function(){
  var example = mergesort([]);
  return arraysEqual(example, []);
});

assert(testCount, 'should sort single-element input', function(){
  var example = mergesort([10]);
  return arraysEqual(example, [10]);
});

assert(testCount, 'should sort moderate-sized input', function(){
  var work = [];
  for (var i = 0; i < 1000; i++){
    work.push(Math.floor(Math.random() * 1000));
  }
  var example = mergesort(work);
  return example.length === 1000 && isSorted(example);
});

assert(testCount, 'should sort large input', function(){
  var work = [];
  for (var i = 0; i < 1000000; i++){
    work.push(Math.floor(Math.random() * 1000000));
  }
  var example = mergesort(work);
  return example.length === 1000000 && isSorted(example);
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');





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



