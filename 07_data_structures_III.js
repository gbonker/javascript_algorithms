 /*
  *                                 Homework VII                                  
  *                                                                                
  *  Problem: Graph                                                                
  *                                                                                
  *  Prompt: Create a Vertex class/constructor and Graph class/constructor.        
  *          Name it Graph.                                                        
  *                                                                                
  *  The Vertex will have the following properties:                                 
  *                                                                                
  *               value: integer value (initially null)                            
  *               edges: hash that contains edges to other vertices                
  *                                                                                
  *  The Graph will have the following properties:                                 
  *                                                                                
  *            vertices: A hash/dictionary/object to store vertices                
  *       totalVertices: The total number of vertices in your Graph                
  *          totalEdges: The total number of edges in your Graph                   
  *                                                                                
  *  The Graph will also have the following methods:                               
  *                                                                                
  *           addVertex: Method that accepts an id (int/str), and creates an       
  *                      object with a "value" of id, and a property called        
  *                      "edges" which will store the edges of the vertex. If a    
  *                      vertex with the id already exists, then do not create a   
  *                      new vertex.                                               
  *                                                                                
  *           getVertex: Method that takes an id, and outputs the vertex with the  
  *                      matching id, if it exists.                                
  *                                                                                
  *             addEdge: Method that accepts two different id's as its input, and  
  *                      creates an edge between both vertices.                    
  *                      (This edge may look like [id1,id2])                       
  *                                                                                
  *          removeEdge: Method that accepts two different id's as its input, and  
  *                      removes the edge between the two vertices if it exists.   
  *                                                                                
  *        removeVertex: Method that takes an id as its input, and removes the     
  *                      vertex with the matching id.                              
  *                                                                                
  *       findNeighbors: Method that accepts an id as its input, and returns       
  *                      all of the edges of that vertex.                                            
  *                                                                                
  *  Input:  N/A                                                                   
  *  Output: A Graph instance                                                      
  *                                                                                
  *  What are the time and auxilliary space complexities of the various methods?   
  *                                                                                
  */

'use strict';


function Vertex(id = null){
  this.value = id;
  this.edges = {};
};


function Graph(){
  this.vertices = {};
  this.totalVertices = 0;
  this.totalEdges = 0;
};


// Time Complexity: O(1)
// Auxiliary Space Complexity: O(1)
Graph.prototype.addVertex = function(id) {
  if (!this.vertices[id]) {
    this.vertices[id] = new Vertex(id);
    this.totalVertices++;
  }

};


// Time Complexity: O(1)
// Auxiliary Space Complexity: O(1)
Graph.prototype.getVertex = function(id) {
  return this.vertices[id];
};


// Time Complexity: O(1)
// Auxiliary Space Complexity: O(1)
Graph.prototype.addEdge = function(id1, id2) {
  var vertex1 = this.getVertex(id1);
  var vertex2 = this.getVertex(id2);

  if ((vertex1 !== undefined) && (vertex2 !== undefined)) {
    vertex1.edges[id2] = vertex2;
    vertex2.edges[id1] = vertex1;
    this.totalEdges++;
  }
};


// Time Complexity: O(1)
// Auxiliary Space Complexity: O(1)
Graph.prototype.removeEdge = function(id1, id2) {
  var vertex1 = this.getVertex(id1);
  var vertex2 = this.getVertex(id2);

  if (vertex1 && vertex2) {
    if ((vertex1.edges[id2] !== undefined) && (vertex2.edges[id1] !== undefined)) {
      delete vertex1.edges[id2];
      delete vertex2.edges[id1];
      this.totalEdges--;
    }  
  }
};

  


// Time Complexity: O(n)
// Auxiliary Space Complexity: O(n)
Graph.prototype.removeVertex = function(id) {
  var vertex = this.getVertex(id);
  
  if (vertex !== undefined) {
    for (var edgeVertex in vertex.edges) {
      this.removeEdge(vertex.value, edgeVertex);
    }
    delete this.vertices[id];
    this.totalVertices--;
  }
};



// Time Complexity: O(n)
// Auxiliary Space Complexity: O(n)
Graph.prototype.findNeighbors = function(id) {
  var vertex = this.getVertex(id);
  var result = [];
  
  if (vertex.edges) {
    for (var edgeVertex in vertex.edges) {
      var resultVertex = this.getVertex(edgeVertex);
      result.push(resultVertex);
    }
  }
  return result;
  
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

console.log('Vertex Class');
var testCount = [0, 0];

assert(testCount, 'able to create an instance', function(){
  var work = new Vertex();
  return typeof work === 'object';
});

assert(testCount, 'has value property', function(){
  var work = new Vertex();
  return work.hasOwnProperty('value');
});

assert(testCount, 'has edges property', function(){
  var work = new Vertex();
  return work.hasOwnProperty('edges');
});

assert(testCount, 'vertex value initialized upon instantiation', function(){
  var work = new Vertex(5);
  return work.value === 5;
});

assert(testCount, 'edges property is a hash', function(){
  var work = new Vertex();
  return typeof work.edges === 'object';
});

assert(testCount, 'can create an edge between two vertices', function(){
  var work1 = new Vertex(5);
  var work2 = new Vertex(10);
  work1.edges[work2.value] = work2.value;
  work2.edges[work1.value] = work1.value;
  return work1.edges[work2.value] === 10 && work2.edges[work1.value] === 5;
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('Graph Class');
var testCount = [0, 0];

assert(testCount, 'able to create an instance', function(){
  var work = new Graph();
  return typeof work === 'object';
});

assert(testCount, 'has vertices property', function(){
  var work = new Graph();
  return work.hasOwnProperty('vertices');
});

assert(testCount, 'has totalVertices property', function(){
  var work = new Graph();
  return work.hasOwnProperty('totalVertices');
});

assert(testCount, 'has totalEdges property', function(){
  var work = new Graph();
  return work.hasOwnProperty('totalEdges');
});

assert(testCount, 'default vertices set to an object', function(){
  var work = new Graph();
  return typeof work.vertices === 'object';
});

assert(testCount, 'default totalVertices set to 0', function(){
  var work = new Graph();
  return work.totalVertices === 0;
});

assert(testCount, 'default totalEdges set to 0', function(){
  var work = new Graph();
  return work.totalEdges === 0;
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('Graph addVertex method');
var testCount = [0, 0];

assert(testCount, 'has addVertex method', function(){
  var work = new Graph();
  return Object.prototype.toString.apply(work.addVertex) === '[object Function]';
});

assert(testCount, 'is able to add a vertex', function(){
  var work = new Graph();
  work.addVertex(5);
  return work.totalVertices === 1 && typeof work.vertices[5] === 'object';
});

assert(testCount, 'is able to add two vertices', function(){
  var work = new Graph();
  work.addVertex(5);
  work.addVertex(10);
  return work.totalVertices === 2 && typeof work.vertices[5] === 'object' && 
    typeof work.vertices[10] === 'object';
});

assert(testCount, 'does not add in duplicate vertex', function(){
  var work = new Graph();
  work.addVertex(5);
  work.addVertex(5);
  return work.totalVertices === 1 && typeof work.vertices[5] === 'object';
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('Graph getVertex method');
var testCount = [0, 0];

assert(testCount, 'has getVertex method', function(){
  var work = new Graph();
  return Object.prototype.toString.apply(work.getVertex) === '[object Function]';
});

assert(testCount, 'able to return vertex instance if it exists', function(){
  var work = new Graph();
  work.addVertex(5);
  var example = work.getVertex(5);
  return typeof example === 'object';
});

assert(testCount, 'returns undefined if vertex does not exist', function(){
  var work = new Graph();
  work.addVertex(5);
  var example = work.getVertex(10);
  return example === undefined;
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('Graph addEdge method');
var testCount = [0, 0];

assert(testCount, 'has addEdge method', function(){
  var work = new Graph();
  return Object.prototype.toString.apply(work.addEdge) === '[object Function]';
});

assert(testCount, 'able to create an edge between two vertices that exist', function(){
  var work = new Graph();
  work.addVertex(5);
  work.addVertex(10);
  work.addEdge(5, 10);
  var inst1 = work.getVertex(5);
  var inst2 = work.getVertex(10);
  return work.totalEdges === 1 && inst1.edges[10] !== undefined && inst2.edges[5] !== undefined;
});

assert(testCount, 'does not create an edge when one of the vertices does not exist', function(){
  var work = new Graph();
  work.addVertex(5);
  work.addEdge(5, 10);
  var inst1 = work.getVertex(5);
  return work.totalEdges === 0 && inst1.edges[10] === undefined;
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('Graph removeEdge method');
var testCount = [0, 0];

assert(testCount, 'has removeEdge method', function(){
  var work = new Graph();
  return Object.prototype.toString.apply(work.removeEdge) === '[object Function]';
});

assert(testCount, 'able to remove an edge between two vertices', function(){
  var work = new Graph();
  work.addVertex(5);
  work.addVertex(10);
  work.addEdge(5, 10);
  work.removeEdge(5, 10);
  var inst1 = work.getVertex(5);
  var inst2 = work.getVertex(10);
  return work.totalEdges === 0 && inst1.edges[10] === undefined && inst2.edges[5] === undefined;
});

assert(testCount, 'does not remove edge when edge does not exist', function(){
  var work = new Graph();
  work.addVertex(5);
  work.addVertex(10);
  work.addEdge(5, 10);
  work.removeEdge(6, 10);
  var inst1 = work.getVertex(5);
  var inst2 = work.getVertex(10);
  return work.totalEdges === 1 && inst1.edges[10] !== undefined && inst2.edges[5] !== undefined;
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('Graph removeVertex method');
var testCount = [0, 0];

assert(testCount, 'has removeVertex method', function(){
  var work = new Graph();
  return Object.prototype.toString.apply(work.removeVertex) === '[object Function]';
});

assert(testCount, 'able to remove a vertex within graph', function(){
  var work = new Graph();
  work.addVertex(5);
  work.removeVertex(5);
  return work.totalVertices === 0 && work.vertices[5] === undefined;
});

assert(testCount, 'does not remove vertex that does not exist', function(){
  var work = new Graph();
  work.addVertex(5);
  work.removeVertex(10);
  return work.totalVertices === 1 && work.vertices[5] !== undefined;
});

assert(testCount, 'removes a vertex while safely removing edges connected to node', function(){
  var work = new Graph();
  work.addVertex(5);
  work.addVertex(10);
  work.addVertex(15);
  work.addEdge(5, 10);
  work.addEdge(5, 15);
  work.removeVertex(5);
  var inst1 = work.getVertex(10);
  var inst2 = work.getVertex(15);
  return work.totalVertices === 2 && work.totalEdges === 0 && inst1.edges[5] === undefined && inst2.edges[5] === undefined;
});

console.log('PASSED: ' + testCount[0] + ' / ' + testCount[1], '\n\n');


console.log('Graph findNeighbors method');
var testCount = [0, 0];

assert(testCount, 'has findNeighbors method', function(){
  var work = new Graph();
  return Object.prototype.toString.apply(work.findNeighbors) === '[object Function]';
});

assert(testCount, 'returns no neighbors if there are no edges for particular vertex', function(){
  var work = new Graph();
  work.addVertex(5);
  work.addVertex(10);
  work.addVertex(15);
  work.addVertex(20);
  var example = work.findNeighbors(5);
  return example.length === 0;
});

assert(testCount, 'returns neighbors if edges exist for a vertex', function(){
  var work = new Graph();
  work.addVertex(5);
  work.addVertex(10);
  work.addVertex(15);
  work.addVertex(20);
  work.addEdge(5, 10);
  work.addEdge(5, 15);
  work.addEdge(5, 20);
  var example = work.findNeighbors(5);
  var work2 = [];
  for (var i = 0; i < example.length; i++){
    work2.push(example[i].value);
  }
  return example.length === 3 && arraysMatching(work2, [10,15,20]);
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




