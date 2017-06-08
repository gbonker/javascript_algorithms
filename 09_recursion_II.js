/*
*  Homework IX                                  
*                                                                     
*  Problem: Lattice Paths                                               
*                                                                       
*  Prompt:  Count the number of unique paths to travel from the top left 
*           corder to the bottom right corner of a lattice of N x N squares.
*
*           When moving through the lattice, one can only travel to the adjacent
*           corner on the right or down.                 
*                                                                       
*  Input:   An integer N representing the size of the lattice           
*  Output:  An integer representing the number of unique number of paths   
*                                                                       
*  Example: input: 2 
*            
*           (2 x 2 lattice of squares) 
*            __ __
*           |__|__|
*           |__|__|
*
*           output: 6 (number of unique paths from top left corner to bottom right)             
*                                                                       
*  Notes:   What is the time and auxiliary space complexity of your solution?   
*                                                                                                                                                                                       
*           Try implementing your solution using recursion with side effects.                                               
*                                                                       
*  Resource:                                                
*             1) https://projecteuler.net/problem=15                               
*                                                                       
*/

'use strict';

function latticePaths(n, x, y) {

  if (x === undefined || y === undefined) {
    x = 0;
    y = 0;
  }
  
  if (n < 0) {
    return;      
  }
  
  if (x === n & y === n) {
    return 1;
  } else if (x > n || y > n) {
    return 0;
  }
  
  return latticePaths(n, x+1, y) + latticePaths(n, x, y+1);
    
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



