/*
 *  Homework I
 *
 *  Instructions:
 *  List the Time and Auxiliary Space Complexity of each of the following 
 *  functions.
 *
 */

'use strict'

/*
 *  Problem 1:
 *  Time Complexity: O(1)
 *  Auxiliary Space Complexity: O(n)
 */

function firstTimesLast(arr) {
  var result = null;

  if (arr.length < 2) {
    return result;
  } else {
    result = arr[0] * arr[length - 1];
    return result;
  }
}


/*
 *  Problem 2:
 *  Time Complexity: O(n)
 *  Auxiliary Space Complexity: O(n)
 */

function mostFrequentOccurrence(str) {
  var lowerString = str.toLowerCase();
  var letters = {};
  var mostFrequent = [];
  
  for (var i = 0; i < lowerString.length; i++) {
    if (letters[lowerString[i]]) {
      letters[lowerString[i]]++;
    } else {
      letters[lowerString[i]] = 1;
    }
  }

  for (var key in letters) {
    if (!mostFrequent.length || letters[key] > mostFrequent[1]) {
        mostFrequent = [key, letters[key]];
    }
  }

  return mostFrequent[0];
}


/*
 *  Problem 3:
 *  Time Complexity: O(n^2)
 *  Auxiliary Space Complexity: O(n^2) 
 */

function printUnorderedPairs(array) {
 for (var i = 0; i < array.length; i++) {
    for (var j = i + 1; j < array.length; j++) {
      console.log(array[i] + ',' + array[j]);
    }
  }
}


/*
 *  Problem 4:
 *  Time Complexity: O(logn)
 *  Auxiliary Space Complexity: O(n) 
 */

function sortedArraySearch(sortedArray, target) {

  function hunt(start, end) {
    if (start > end){ return false; }
    var mid = Math.floor((start + end) / 2);
    
    if (sortedArray[mid] === target) {
      return true;
    } else if (sortedArray[mid] > target){
      return hunt(start, mid-1);
    } else {
      return hunt(mid+1, end);
    }
  }
  
  return hunt(0, sortedArray.length-1);
}


/*
 *  Problem 5:
 *  Time Complexity: O(n^2)
 *  Auxiliary Space Complexity: O(n^2) 
 */

function makeCombinedMatrix(arr1, arr2) {
  var result = [];
  var row;

  for (var i = 0; i < arr1.length; i++) {
    row = [];
    for (var j = 0; j < arr2.length; j++) {
      row.push(arr2[j] + arr1[i]);
    }
    result.push(row);
  }
  return result;
}

