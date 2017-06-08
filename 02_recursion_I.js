/*
* Homework II                               
*                                                                   
* Prompt:   Given a set S, return the power set P(S), which is        
*           a set of all subsets of S.                                
*                                                                   
* Input:    A String                                                  
* Output:   An Array of Strings representing the power set of the input
*                                                                   
* Example:  S = "abc", P(S) = ['', 'a', 'b','c','ab','ac','bc','abc']
*                                                                   
* Note:     The input string will not contain duplicate characters
*           The letters in the subset string must be in the same order
*           as the original input.
*
*/

'use strict';


function powerSet(str){
  var result = [];
  function traverse(depth, build) {
    if (depth === str.length) {
      result.push(build);
      return;
    }
    traverse(depth+1, build);
    traverse(depth+1, build + str[depth]);
  }

  traverse(0, "");
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

console.log('Power Set Tests');
var testCount = [0, 0];

assert(testCount, 'should work on example input', function(){
  var example = powerSet('abc');
  return arraysMatching(example, ['','a','b','c','ab','bc','ab','abc']);
});

assert(testCount, 'should work on empty input', function(){
  var example = powerSet('');
  return arraysMatching(example, ['']);
});

assert(testCount, 'should work on two-letter input', function(){
  var example = powerSet('ab');
  return arraysMatching(example, ['','a','b','ab']);
});

assert(testCount, 'should work on longer input', function(){
  var example = powerSet('abcdefg');
  return arraysMatching(example, [ '','g','f','fg','e','eg','ef','efg','d',
    'dg','df','dfg','de','deg','def','defg','c','cg','cf','cfg','ce','ceg',
    'cef','cefg','cd','cdg','cdf','cdfg','cde','cdeg','cdef','cdefg','b','bg',
    'bf','bfg','be','beg','bef','befg','bd','bdg','bdf','bdfg','bde','bdeg',
    'bdef','bdefg','bc','bcg','bcf','bcfg','bce','bceg','bcef','bcefg','bcd',
    'bcdg','bcdf','bcdfg','bcde','bcdeg','bcdef','bcdefg','a','ag','af','afg',
    'ae','aeg','aef','aefg','ad','adg','adf','adfg','ade','adeg','adef',
    'adefg','ac','acg','acf','acfg','ace','aceg','acef','acefg','acd','acdg',
    'acdf','acdfg','acde','acdeg','acdef','acdefg','ab','abg','abf','abfg',
    'abe','abeg','abef','abefg','abd','abdg','abdf','abdfg','abde','abdeg',
    'abdef','abdefg','abc','abcg','abcf','abcfg','abce','abceg','abcef',
    'abcefg','abcd','abcdg','abcdf','abcdfg','abcde','abcdeg','abcdef','abcdefg' ]);
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







