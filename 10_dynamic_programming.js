/*
 *  Homework X                               
 *                           
 *  Problem 1: Max Consecutive Sum                                    
 *                                                                    
 *  Prompt:    Given an array of integers find the sum of consecutive    
 *             values in the array that produces the maximum value.      
 *                                                                    
 *  Input:     Unsorted array of positive and negative integers          
 *  Output:    Integer (max consecutive sum)                             
 *                                                                    
 *  Example:   input = [6, -1, 3, 5, -10]                               
 *             output = 13 (6 + -1 + 3 + 5 = 13)                        
 *                                                                    
 *  Time Complexity: O(n)                                             
 *  Auxiliary Space Complexity: O(1)                                  
 *
 *
 * 
 *  Problem 2: Lattice Paths (Dynamic Programming Approach)              
 *                                                                       
 *  Prompt:    Count the number of unique paths to travel from the top left 
 *             to the bottom right of a lattice of squares.                 
 *                                                                       
 *  Input:     An interger N (which is the size of the lattice)             
 *  Output:    An interger (which represents the number of unique paths)    
 *                                                                       
 *  Example:   input: 2 
 *            
 *             (2 x 2 lattice of squares) 
 *              __ __
 *             |__|__|
 *             |__|__|
 *
 *             output: 6 (number of unique paths from top left corner to bottom 
 *                     right)
 *                                                                       
 *  Notes:     What is the time and auxilliary space complexity of your solution?   
 *                                                                       
 *             When moving through the lattice, you can only move either down or 
 *             to the left.                                                
 *                                                                       
 *             You did this problem before with recursion. Try implementing it 
 *             now with dynamic programming!                               
 *                                                                       
 *  Resources:                                                
 *    1: https://projecteuler.net/problem=15                             
 *    2: https://en.wikipedia.org/wiki/Lattice_path 
 *                                                                    
 */

'use strict';

// Time Complexity: O(n)
// Auxiliary Space Complexity: O(1) 
// Tabulation
function maxConsecutiveSum(arr) {
  if(arr.length === 0) {
    return 0;
  }
  
  if(arr.length === 1){
    return arr[0];
  }
  
  var start = 0;
  var maxSum = 0;
  var currentIntervalSum = 0;
    
  for(var end = 0; end < arr.length; end++){
    if (currentIntervalSum > maxSum) {
      maxSum = currentIntervalSum;
    }

    if (currentIntervalSum > 0) {
      currentIntervalSum += arr[end];
    } else {
      start = end;
      currentIntervalSum = arr[end];
    }
  }
  
  return maxSum;

}





// Time Complexity: O(n)
// Auxiliary Space Complexity: O(n)
// Dynamic Programming Solution

function latticePaths(n){
  var cache = {};
  
  function traverse(x,y) {
    if (cache[x + "," + y] !== undefined) {
      return cache[x + "," + y];
    } else if (x === n && y === n) {
      return 1;
    } else if (x > n || y > n) {
      return 0;
    }
    
    cache[x + "," + y] = traverse(x+1, y) + traverse(x, y+1);
    return cache[x + "," + y];
  }
  
  return traverse(0,0);
  
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

console.log('maxConsecutiveSum Tests');
var testCount = [0, 0];

assert(testCount, 'should work on example input', function(){
  var example = maxConsecutiveSum([6,-1,3,5,-10]);
  return example === 13;
});

assert(testCount, 'should work on single-element input', function(){
  var example = maxConsecutiveSum([5]);
  return example === 5;
});

assert(testCount, 'should return 0 for empty input', function(){
  var example = maxConsecutiveSum([]);
  return example === 0;
});

assert(testCount, 'should work on longer input', function(){
  var example = maxConsecutiveSum([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
  return example === 6;
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('Lattice Paths Tests');
var testCount = [0, 0];

assert(testCount, 'should work on example case', function(){
  var example = latticePaths(2);
  return example === 6;
});

assert(testCount, 'should return 1 for 0', function(){
  var example = latticePaths(0);
  return example === 1;
});

assert(testCount, 'should return 184756 for 10', function(){
  var example = latticePaths(10);
  return example === 184756;
});

assert(testCount, 'should return answer given larger input: 137846528820 for 20', function(){
  var example = latticePaths(20);
  return example === 137846528820;
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


