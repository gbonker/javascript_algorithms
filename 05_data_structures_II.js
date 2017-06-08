/*
*  Homework V
*
*  Problem 1: Node class
*
*  Prompt:    Create a Node class
*             The Node class should contain the following properties:
*
*                   value:   integer value (default null)
*               leftChild:   pointer to another node (initially null)
*              rightChild:   pointer to another node (initially null)
*
*                 Example:   var sample = new Node(1)
*                            sample.value        // 1
*                            sample.leftChild    // null
*                            sample.rightChild   // null
*
*
*  Problem 2: BinarySearchTree class.
*
*  Prompt:    Create a BinarySearchTree class
*
*             The BinarySearchTree class should contain the following
*             properties:
*
*                    root:   A pointer to the root node (initially null)
*                    size:   The number of nodes in the BinarySearchTree
*
*             The BinarySearchTree class should also contain the following
*             methods:
*
*                  insert:   A method that takes takes an integer value, and
*                            creates a node with the given input.  The method
*                            will then find the correct place to add the new
*                            node. Values larger than the current node node go
*                            to the right, and smaller values go to the left.
*
*                            Input:     value
*                            Output:    undefined
*
*                  search:   A method that will search to see if a node with a
*                            specified value exists and returns true or false
*                            if found.
*
*                            Input:     value
*                            Output:    boolean
*
*
*             What are the time and auxilliary space complexities of the
*             various methods?
*
*
*  Extra:     Remove method for BinarySearchTree class
*
*  Prompt:    Add the following method to the BinarySearchTree class:
*
*                  remove:   A method that removes a value matching the input
*                            the tree is then retied so that the binary search
*                            tree order is not violated.
*
*/

'use strict';

function Node(value = null){
  this.value = value;
  this.leftChild = null;
  this.rightChild = null;
}

function BinarySearchTree(){
  this.root = null;
  this.size = 0;
}

  // Time Complexity: O(logn)
  // Auxiliary Space Complexity: O(1)
BinarySearchTree.prototype.insert = function(value) {
  var node = new Node(value);
  if (this.size === 0) {
    this.root = node;
    this.size++;
    return;
  }
  function traverse(current) {
    if (node.value <= current.value) {
      // add to the left
      if (current.leftChild !== null) {
        traverse(current.leftChild);
      } else {
        current.leftChild = node;
      }
    } else if (node.value > current.value) {
      // add to the right
      if (current.rightChild !== null) {
        traverse(current.rightChild);
      } else {
        current.rightChild = node;
      }
    }
  }
  traverse(this.root);
  this.size++;
  
};


  // Time Complexity: O(logn)
  // Auxiliary Space Complexity: O(1) 
BinarySearchTree.prototype.search = function(value) {
  if (this.root.value === value) {
    return true;
  }
  function traverse(current) {
    if (current.value === value) {
      return true;
    } else if (value < current.value) {
      if (current.leftChild !== null) {
        return traverse(current.leftChild);
      } else {
        return false;
      }
    } else if (value > current.value) {
      if (current.rightChild !== null) {
        return traverse(current.rightChild);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  return traverse(this.root);
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



console.log('Node Class')
var testCount = [0, 0];

assert(testCount, 'able to create an instance', function(){
  var node = new Node();
  return typeof node === 'object';
});

assert(testCount, 'has value property', function(){
  var node = new Node();
  return node.hasOwnProperty('value');
});

assert(testCount, 'has leftChild property', function(){
  var node = new Node();
  return node.hasOwnProperty('leftChild');
});

assert(testCount, 'has rightChild property', function(){
  var node = new Node();
  return node.hasOwnProperty('rightChild');
});

assert(testCount, 'has default value set to null', function(){
  var node = new Node();
  return node.value === null;
});

assert(testCount, 'able to assign a value upon instantiation', function(){
  var node = new Node(5);
  return node.value === 5;
});

assert(testCount, 'able to reassign a value', function(){
  var node = new Node();
  node.value = 5
  return node.value === 5;
});

assert(testCount, 'able to point to left child node', function(){
  var node1 = new Node(5);
  var node2 = new Node(10);
  node1.leftChild = node2;
  return node1.leftChild.value === 10;
});

assert(testCount, 'able to point to right child node', function(){
  var node1 = new Node(5);
  var node2 = new Node(10);
  node1.rightChild = node2;
  return node1.rightChild.value === 10;
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('Binary Search Tree Class')
var testCount = [0, 0];

assert(testCount, 'able to create an instance', function(){
  var bst = new BinarySearchTree();
  return typeof bst === 'object';
});

assert(testCount, 'has root property', function(){
  var bst = new BinarySearchTree();
  return bst.hasOwnProperty('root');
});

assert(testCount, 'has size property', function(){
  var bst = new BinarySearchTree();
  return bst.hasOwnProperty('size');
});

assert(testCount, 'default root set to null', function(){
  var bst = new BinarySearchTree();
  return bst.root === null;
});

assert(testCount, 'default size set to zero', function(){
  var bst = new BinarySearchTree();
  return bst.size === 0;
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('BinarySearchTree Insert Method')
var testCount = [0, 0];

assert(testCount, 'has insert method', function(){
  var bst = new BinarySearchTree();
  return Object.prototype.toString.apply(bst.insert) === '[object Function]';
});

assert(testCount, 'able to insert a node into empty binary search tree', function(){
  var bst = new BinarySearchTree();
  bst.insert(5);
  return bst.size === 1 && bst.root.value === 5;
});

assert(testCount, 'able to insert node to left of root node', function(){
  var bst = new BinarySearchTree();
  bst.insert(5);
  bst.insert(3);
  return bst.size === 2 && bst.root.value === 5 && bst.root.leftChild.value === 3;
});

assert(testCount, 'able to insert node to right of node left of root node', function(){
  var bst = new BinarySearchTree();
  bst.insert(5);
  bst.insert(3);
  bst.insert(4);
  return bst.size === 3 && bst.root.value === 5 && bst.root.leftChild.value === 3 &&
    bst.root.leftChild.rightChild.value === 4;
});

assert(testCount, 'able to insert node to right of root node', function(){
  var bst = new BinarySearchTree();
  bst.insert(5);
  bst.insert(8);
  return bst.size === 2 && bst.root.value === 5 && bst.root.rightChild.value === 8;
});

assert(testCount, 'able to insert node to left of node right of root node', function(){
  var bst = new BinarySearchTree();
  bst.insert(5);
  bst.insert(8);
  bst.insert(7);
  return bst.size === 3 && bst.root.value === 5 && bst.root.rightChild.value === 8 &&
    bst.root.rightChild.leftChild.value === 7;
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('BinarySearchTree Search Method')
var testCount = [0, 0];

assert(testCount, 'has search method', function(){
  var bst = new BinarySearchTree();
  return Object.prototype.toString.apply(bst.search) === '[object Function]';
});

assert(testCount, 'returns true when element exists in binary search tree', function(){
  var bst = new BinarySearchTree();
  bst.insert(5);
  bst.insert(3);
  bst.insert(8);
  bst.insert(4);
  bst.insert(7);
  return bst.search(4) === true;
});

assert(testCount, 'returns false when element does not exist in binary search tree', function(){
  var bst = new BinarySearchTree();
  bst.insert(5);
  bst.insert(3);
  bst.insert(8);
  bst.insert(4);
  bst.insert(7);
  return bst.search(10) === false;
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





