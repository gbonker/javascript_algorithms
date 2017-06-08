/* 
 *  Homework XI                              
 *
 *  Problem 1: Bucket Sort                                            
 *                                                                    
 *  Prompt:    Given an unsorted array of numbers which are in the range 
 *             of 0.0 to 1.0, and are uniformly distributed across the   
 *             range, sort the numbers efficiently.                      
 *                                                                    
 *  Input:     Unsorted array of numbers in range of 0.0 to 1.0          
 *  Output:    A sorted array                                            
 *                                                                    
 *  Example:   input = [0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434]     
 *             output = [0.1234, 0.3434, 0.565, 0.656, 0.665, 0.897]    
 *                                                                    
 *  Notes:     What are the time and auxilliary space complexity?                
 *                                                                    
 *  
 *  
 *  
 *  Problem 2: Kth Smallest Element in a Range                        
 *                                                                    
 *  Prompt:    Given an unsorted array of whole integers in the range    
 *             1000 to 9000, find the Kth smallest element in linear time
 *             The array can have duplicates.                            
 *                                                                    
 *  Input:     Unsorted array of whole integers in range of 1000 to 9000 
 *             Kth smallest element you want to find                     
 *                                                                    
 *  Output:    Kth smalest element in the range                          
 *                                                                    
 *  Example:   array = [1984, 1337, 9000, 8304, 5150, 9000, 8304], k=5  
 *             output = 8304                                            
 *                                                                    
 *  Notes:     What are the time and auxilliary space complexity?                
 *                                                                    
 */


'use strict';



function insertionSort(arr){

  function compareAndShift(indexToCompare){
    while (indexToCompare > 0 && arr[indexToCompare] < arr[indexToCompare-1]){
      var temp = arr[indexToCompare];
      arr[indexToCompare] = arr[indexToCompare-1];
      arr[indexToCompare-1] = temp;
      indexToCompare--;
    }
  }

  for (var i = 0; i < arr.length; i++){
    compareAndShift(i);
  }

  return arr;
}

// Time Complexity: O(n+k)
// Auxiliary Space Complexity: O(n)
// for our bucket sort function, we will make use of insertion sort to sort 
// within each bucket
function bucketSort(input){
  
  var placeIntoBuckets = function(pullFrom, lowerRange, upperRange) {
    var buckets = [[], [], [], [], [], [], [], [], [], []];
    var division = (upperRange - lowerRange) / 10;
    
    pullFrom.forEach(function(value) {
      buckets[Math.floor(value/division)].push(value);
    })
    
    for (var i = 0; i < buckets.length; i++) {
      if (buckets[i].length > 1) {
        buckets[i] = insertionSort(buckets[i]);
      }
    }
    
    var result = [];
    
    buckets.forEach(function(bucket) {
      if (bucket.length > 0) {
        result = result.concat(bucket);
      }
    })
    
    return result;
    
  }
  
  return placeIntoBuckets(input, 0.0, 1.0);

}



// Time Complexity: O(logn)
// Auxiliary Space Complexity: O(1)
// kthSmallest is also commonly known as quickSelect
function kthSmallest(array, k){
  
  if (k > array.length) {
    console.log("k is too large");
    return;
  }
  
  if (k < 1) {
    console.log("k is too small");
    return;
  }
  
  var result;
  k--;
  
  var delve = function(pullFrom, start, end) {
    var pivotIndex = Math.floor(pullFrom.length / 2);
    var pivot = pullFrom[pivotIndex];
    var before = [];
    var after = [];
    
    pullFrom.forEach(function(element, index) {
      if (index !== pivotIndex) {
        if (element < pivot) {
          before.push(element);
        } else {
          after.push(element);
        }
      }
    })
    
    if (start + before.length === k) {
      result = pivot;
    } else if (start + before.length > k) {
      delve(before, start, start + before.length-1);
    } else if (start + before.length < k) {
      delve(after, start + before.length+1, end);
    }
    
  }
  
  delve(array, 0, array.length-1);
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


console.log('Bucket Sort Tests');
var testCount = [0, 0];

assert(testCount, 'should sort example input', function(){
  var example = bucketSort([0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434]);
  return arraysEqual(example, [0.1234, 0.3434, 0.565, 0.656, 0.665, 0.897]);
});

assert(testCount, 'should return empty array for empty input', function(){
  var example = bucketSort([]);
  return arraysEqual(example, []);
});

assert(testCount, 'should sort single-element input', function(){
  var example = bucketSort([0.5]);
  return arraysEqual(example, [0.5]);
});

assert(testCount, 'should sort moderate-sized input', function(){
  var work = [];
  for (var i = 0; i < 1000; i++){
    work.push(Math.floor(Math.random() * 1));
  }
  var example = bucketSort(work);
  return example.length === 1000 && arraysEqual(example, work.sort());
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('Kth Smallest Element Tests');
var testCount = [0, 0];

assert(testCount, 'should return 8304 for sample input', function(){
  var example = kthSmallest([1984, 1337, 9000, 8304, 5150, 9000, 8304], 5);
  return example === 8304;
});

assert(testCount, 'should return 1337 for 1st smallest element with sample input array', function(){
  var example = kthSmallest([1984, 1337, 9000, 8304, 5150, 9000, 8304], 1);
  return example === 1337;
});

assert(testCount, 'should error out when asking for kth smallest when k exceeds size of input array', function(){
  var example = kthSmallest([1984, 1337, 9000, 8304, 5150, 9000, 8304], 10);
  return example === undefined;
});

assert(testCount, 'should work for single-element array', function(){
  var example = kthSmallest([8304], 1);
  return example === 8304;
});

assert(testCount, 'should work for a large array', function(){
  var testCase = [];
  for (var i = 0; i < 1000000; i++){
    testCase.push(Math.floor(Math.random() * 1000000));
  }
  var example = kthSmallest(testCase, 185);
  testCase = testCase.sort(function(a, b){return a - b;});
  return example === testCase[184];
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




