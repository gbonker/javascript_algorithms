 /*
  *                                 Homework VIII                                   
  *                                                                                
  *  Problem: Hash Table                                                           
  *                                                                                
  *  Prompt: Create a HashTable class/constructor.                                 
  *          Name it HashTable.                                                    
  *                                                                                
  *  The HashTable will have the following properties:                             
  *                                                                                
  *         storage:  An array of arrays.                                          
  *        buckets:   The max number of buckets that your storage can contain.     
  *                   Initialize your "buckets" at 8 buckets.                      
  *           size:   The current number (total) of key-value pairs in the storage 
  *                   Initialize your "size" to 0.                                 
  *                                                                                
  *        Example:   var sample = new HashTable()                                 
  *                   sample.storage          // []                                
  *                   sample.buckets          // 8                                 
  *                   sample.size             // 0                                 
  *                                                                                
  *                                                                                
  *  The HashTable will also have the following methods:                           
  *                                                                                
  *           hash:   Method that takes a string as an input and outputs a number  
  *                   We have provided to you the dbjb2 hashing function, so you   
  *                   do not need to write your own.                               
  *                                                                                
  *                   Input:      key                                              
  *                   Output:     index                                            
  *                                                                                
  *         insert:   Method that takes a key and a value as inputs, and places a  
  *                   tuple ([key,value]) into the proper bucket.                  
  *                   If the key already exists, it should update the value.       
  *                   You should use separate chaining to handle collisions.       
  *                                                                                
  *                   Input:      key, value                                       
  *                   Output:     undefined                                        
  *                                                                                
  *         remove:   Method that takes a key as its input, and looks for the      
  *                   [key,value] and removes it from the bucket.                  
  *                                                                                
  *                   Input:      key                                              
  *                   Output:     value                                            
  *                                                                                
  *       retrieve:   Method that a key as its input, and returns the value        
  *                   stored at that key, or undefined if the key is not present.  
  *                                                                                
  *                   Input:      key                                              
  *                   Output:     value                                            
  *                                                                                
  *                                                                                
  *  Input: N/A                                                                    
  *  Output: A HashTable instance                                                  
  *                                                                                
  *  What are the time and auxiliary space complexities of the various methods?    
  *                                                                                
  */

 /*
  *  Extra Credit: Resize
  *
  *  Prompt: If the load factor reaches a critical 0.75 or higher, resize the HashTable
  *          by doubling the number of buckets, and reindexing all the key-value pairs.
  *
  *                   Input:      undefined                                              
  *                   Output:     undefined                                            
  *                   
  */

 /*
  * djb2: JavaScript
  *
  * function djb2Code(str, buckets) {
  *   var hash = 5381;
  *   for (i = 0; i < str.length; i++) {
  *     char = str.charCodeAt(i);
  *     hash = ((hash << 5) + hash) + char; // hash * 33 + c 
  *   }
  *   return hash % buckets;
  * };
  */


'use strict';

function HashTable() {
  this.storage = [];
  this.buckets = 8;
  this.size = 0;
}


// Time Complexity: O(n)
// Auxiliary Space Complexity: O(n)
HashTable.prototype.hash = function(str){
  var hash = 5381;
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i);
    hash = ((hash << 5) + hash) + char; // hash * 33 + c 
  }
  return hash % this.buckets;
};


// Time Complexity: O(n)
// Auxiliary Space Complexity: O(1)
HashTable.prototype.insert = function(key, value){
  var index = this.hash(key);
  
  if (this.storage[index] === undefined) {
    this.storage[index] = [];
    this.storage[index].push([key, value]);
    this.size++;
    this.resize();
  } else {
    var bucket = this.storage[index];
    
    for (var i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }
    
    bucket.push([key, value]);
    this.size++;
    this.resize();
  }
};


// Time Complexity: O(n)
// Auxiliary Space Complexity: O(n)
HashTable.prototype.remove = function(key){
  var index = this.hash(key);

  if (this.storage[index] === undefined) {
    console.log("key not found.");
    return;
  } else {
    var bucket = this.storage[index];
    
    for (var i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        var toDelete = bucket[i][1];
        bucket.splice(i, 1);
        this.size--;
        this.resize();
        return toDelete;
      }
    }
    console.log("key not found.");
  }
};


// Time Complexity: O(n) 
// Auxiliary Space Complexity: O(n)
HashTable.prototype.retrieve = function(key){
  var index = this.hash(key);

  if (this.storage[index] === undefined) {
    console.log("key not found.");
    return;
  } else {
    var bucket = this.storage[index];
    
    for (var i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }
    console.log("key not found.");
    
  }
};


// Time Complexity: O(n^2)
// Auxiliary Space Complexity: O(n)
HashTable.prototype.resize = function(){  
  var resizing = false; 
  
  if (this.size > (0.75 * this.buckets)) {
    resizing = true;
    this.buckets *= 2;
    console.log("HashTable has doubled in size. It now contains " + this.buckets + " buckets.");
  } else if ((this.buckets > 8) && (this.size < 0.25 * this.buckets)) {
    resizing = true;
    this.buckets *= 0.5;
    console.log("HashTable has halved in size. It now contains " + this.buckets + " buckets.");
  } 
  
  if (resizing) {
    var allKeyValuePairs = [];
    this.storage.forEach(function(bucket) {
      if (bucket !== undefined) {
        bucket.forEach(function(tuple) {
          allKeyValuePairs.push(tuple);
        })
      }
    })
    
    this.storage = [];
    this.size = 0;
    
    var that = this;
    allKeyValuePairs.forEach(function(tuple) {
      that.resizeInsert(tuple[0], tuple[1]);
    })    
  }
};


HashTable.prototype.resizeInsert = function(key, value){
  var index = this.hash(key);
  if(!this.storage[index]) {
    this.storage[index] = [[key, value]];
  } else {
    this.storage[index].push([key, value]);
  }
  this.size++;
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

console.log('HashTable Class');
var testCount = [0, 0];

assert(testCount, 'able to create an instance', function(){
  var work = new HashTable();
  return typeof work === 'object';
});

assert(testCount, 'has storage property', function(){
  var work = new HashTable();
  return work.hasOwnProperty('storage');
});

assert(testCount, 'has buckets property', function(){
  var work = new HashTable();
  return work.hasOwnProperty('buckets');
});

assert(testCount, 'has size property', function(){
  var work = new HashTable();
  return work.hasOwnProperty('size');
});

assert(testCount, 'default storage set to an array', function(){
  var work = new HashTable();
  return Array.isArray(work.storage);
});

assert(testCount, 'default buckets set to 8', function(){
  var work = new HashTable();
  return work.buckets === 8;
});

assert(testCount, 'default size set to 0', function(){
  var work = new HashTable();
  return work.size === 0;
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('HashTable Hash method');
var testCount = [0, 0];

assert(testCount, 'has hash method', function(){
  var work = new HashTable();
  return Object.prototype.toString.apply(work.hash) === '[object Function]';
});

assert(testCount, 'should take in a string key and return an index', function(){
  var work = new HashTable();
  if (work.hash.length === 1){
    var example = work.hash('hello');
    return Number.isInteger(example);
  } else {
    var example = work.hash('hello', 8);
    return Number.isInteger(example);
  }
  return Object.prototype.toString.apply(work.hash) === '[object Function]';
});

assert(testCount, 'should take in an integer key and return an index', function(){
  var work = new HashTable();
  if (work.hash.length === 1){
    var example = work.hash(70);
    return Number.isInteger(example);
  } else {
    var example = work.hash(70, 8);
    return Number.isInteger(example);
  }
  return Object.prototype.toString.apply(work.hash) === '[object Function]';
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('HashTable Insert method');
var testCount = [0, 0];

assert(testCount, 'has insert method', function(){
  var work = new HashTable();
  return Object.prototype.toString.apply(work.insert) === '[object Function]';
});

assert(testCount, 'can insert a key-value pair into hashtable', function(){
  var work = new HashTable();
  work.insert('hello', 10);
  if (work.hash.length === 1){
    var index = work.hash('hello');
  } else {
    var index = work.hash('hello', work.buckets);
  }
  return work.size === 1 && Array.isArray(work.storage[index]);
});

assert(testCount, 'can insert a second key-value pair into hashtable', function(){
  var work = new HashTable();
  work.insert('hello', 10);
  work.insert('bye', 20);
  if (work.hash.length === 1){
    var index1 = work.hash('hello');
    var index2 = work.hash('bye');
  } else {
    var index1 = work.hash('hello', work.buckets);
    var index2 = work.hash('bye', work.buckets);
  }
  return work.size === 2 && Array.isArray(work.storage[index1]) &&
    Array.isArray(work.storage[index2]);
});

assert(testCount, 'can overwrite value if key already exists', function(){
  var work = new HashTable();
  work.insert('hello', 10);
  work.insert('hello', 20);
  if (work.hash.length === 1){
    var index = work.hash('hello');
  } else {
    var index = work.hash('hello', work.buckets);
  }
  return work.size === 1 && Array.isArray(work.storage[index]) && work.storage[index][0][1] === 20;
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('HashTable Remove method');
var testCount = [0, 0];

assert(testCount, 'has remove method', function(){
  var work = new HashTable();
  return Object.prototype.toString.apply(work.remove) === '[object Function]';
});

assert(testCount, 'can remove a key-value pair', function(){
  var work = new HashTable();
  work.insert('hello', 10);
  work.remove('hello');
  if (work.hash.length === 1){
    var index = work.hash('hello');
  } else {
    var index = work.hash('hello', work.buckets);
  }
  return work.size === 0 && (work.storage[index] === undefined || work.storage[index].length === 0);
});

assert(testCount, 'does not remove a key-value pair that does not exist', function(){
  var work = new HashTable();
  work.insert('hello', 10);
  work.remove('bye');
  if (work.hash.length === 1){
    var index = work.hash('hello');
  } else {
    var index = work.hash('hello', work.buckets);
  }
  return work.size === 1 && work.storage[index][0][0] === 'hello' && work.storage[index][0][1] === 10;
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('HashTable Retrieve method');
var testCount = [0, 0];

assert(testCount, 'has retrieve method', function(){
  var work = new HashTable();
  return Object.prototype.toString.apply(work.retrieve) === '[object Function]';
});

assert(testCount, 'should return value for inputted key if it exists', function(){
  var work = new HashTable();
  work.insert('hello', 10);
  return work.retrieve('hello') === 10;
});

assert(testCount, 'should return undefined for inputted key if it does not exist', function(){
  var work = new HashTable();
  work.insert('hello', 10);
  return work.retrieve('bye') === undefined;
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('HashTable Resize method');
var testCount = [0, 0];

assert(testCount, 'has resize method', function(){
  var work = new HashTable();
  return Object.prototype.toString.apply(work.resize) === '[object Function]';
});

assert(testCount, 'doubles hashtable number of buckets if size exceeds 75% of the number of buckets', function(){
  var work = new HashTable();
  work.insert('one', 10);
  work.insert('two', 20);
  work.insert('three', 30);
  work.insert('four', 40);
  work.insert('five', 50);
  work.insert('six', 60);
  work.insert('seven', 70);
  return work.buckets === 16;
});

assert(testCount, 'halves hashtable number of buckets if size drops below 25% of the number of buckets', function(){
  var work = new HashTable();
  work.insert('one', 10);
  work.insert('two', 20);
  work.insert('three', 30);
  work.insert('four', 40);
  work.insert('five', 50);
  work.insert('six', 60);
  work.insert('seven', 70);
  work.remove('four');
  work.remove('five');
  work.remove('six');
  work.remove('seven');
  return work.buckets === 8;
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



