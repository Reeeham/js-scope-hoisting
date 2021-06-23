//Variable Declarations Are Hoisted

function f() {
    console.log(bar);  // undefined
    //We can see that the variable bar already exists in the first line of f(), but it does not have a value yet;
    var bar = 'abc';
    console.log(bar);  // abc
}
//If you declare a variable that has already been declared, nothing happens (the variable’s value is unchanged):

var x = 123;
var x;
// x = 123


//Each function declaration is also hoisted,
//In sloppy mode, assigning to a variable that hasn’t been declared via var creates a global variable:
function sloppyFunc() { x = 123 }
sloppyFunc()
// x  is 123

//Thankfully, strict mode throws an exception when that happens:
function strictFunc() { 'use strict'; x = 123 }
strictFunc()
//ReferenceError: x is not defined

//we don’t want them to “leak out” into the surrounding scope:

function f() {
    if (condition) {
        var tmp = '';
    }
    // tmp still exists here
    // => not what we want
}
//If you want to introduce a new scope for the then block,
// you can define a function and immediately invoke it. 
//This is a workaround, a simulation of block scoping:
function f() {
    if (condition) {
        (function () {  // open block
            var tmp = '';

        }());  // close block
    }
}
(function () { // open IIFE
    // inside IIFE
}()); // close IIFE

//You can also enforce the expression context via prefix operators. For example, ! or void before function declaration:

!function () { // open IIFE
    // inside IIFE
}(); // close IIFE

//or via the void operator (see The void Operator):
void function () { // open IIFE
    // inside IIFE
}(); // close IIFE
//The advantage of using prefix operators is that forgetting the terminating semicolon does not cause trouble.


//IIFE Variation: Already Inside Expression Context
/// you need no parentheses or prefix operators
var File = function () { // open IIFE
    var UNTITLED = 'Untitled';
    function File(name) {
        this.name = name || UNTITLED;
    }
    return File;
}(); // close IIFE

// An IIFE with Parameters
var x = 23;
(function (twice) {
    console.log(twice);
}(x * 2));

//This is similar to:

var x = 23;
(function () {
    var twice = x * 2;
    console.log(twice);
}());

//An IIFE enables you to attach private data to a function. 
//Then you don’t have to declare a global variable and can tightly package the function with its state. 
//You avoid polluting the global namespace:

var setValue = function () {
    var prevValue;
    return function (value) { // define setValue
        if (value !== prevValue) {
            console.log('Changed: ' + value);
            prevValue = value;
        }
    };
}();

//here we are in global scope
var globalVariable = 'xyz'
function f() {
    var localVariable = true;
    function g() {

        var anotherLocalVariable = 123;
        //All variables of surround scopes are acceccible 
        localVariable = false;
        globalVariable = 'abc';
    }
}
//here we are again in global scope

//Don’t do this

// Global scope
var tmp = generateData();
processData(tmp);
persistData(tmp);

//instead use IIFE

void function () {  // open IIFE
    // Local scope
    var tmp = generateData();
    processData(tmp);
    persistData(tmp);
}();


//Module Systems Lead to Fewer Globals
//each module has its own scope for module-global variables

//Note that the global object has prototypes
getAllPropertyNames(window).sort().slice(0, 5)
//[ 'AnalyserNode', 'Array', 'ArrayBuffer', 'Attr', 'Audio' ]


(function (glob) {
    // glob points to global object
}(typeof window !== 'undefined' ? window : global));
//From now on, I use window to refer to the global object,
// but in cross-platform code, you should use the preceding pattern and glob instead


var foo = 123;
(function () {
    console.log(window.foo);  // 123
}());

(function () {
    var foo = 123;
    console.log(window.foo);  // undefined
}());

// it is better to refer to foo as a variable, not as a property of window
var g_foo = 123;
(function () {
    console.log(g_foo);
}());

window.isNaN()  // no
isNaN()  // yes

// checking whether a global variable exists
if (window.someVariable) {}
if (window.someVariable !== undefined) { }
if ('someVariable' in window) { }

// Don’t do this
if (someVariable) {  }

//The general way of checking whether a variable exists is via typeof
if (typeof someVariable !== 'undefined') {  }

//creating things in global scope
if (!window.someApiFunction) {
    window.someApiFunction = '';
}

//invoking functions
//Every time a function is invoked, it needs new storage for its parameters and variables. After it is finished,
// that storage can usually be reclaimed

function fac(n){
    if(n<=1){
        return 1;
    }
    return n * fac(n-1);
}
//Each time a function is invoked, 
//a new environment is created to map identifiers (of parameters and variables) to values
function doNTimes(n, action){
    function doNTimesRec(x){
        if(x>=1){
            action();
            doNtimesRec(x-1);
        }
        doNTimesRec(n);
    }
}


function f(){
    var result = [];
    for(var i=0; i<3; i++){
        var func = function(){
            return i;
        }
        result.push(func);
    }
    return result;
}
console.log(f()[1]);//3
// f returns an array with three functions in it.
//  All of these functions can still access the environment of f and thus i. 
//  In fact, they share the same environment.
//   Alas, after the loop is finished,
//    i has the value 3 in that environment.
//     Therefore, all functions return 3.


// To fix things,
// we need to make a snapshot of the index i before creating a function that uses it
//Create a new environment for each function in the returned array.
// Store (a copy of) the current value of i in that environment.
//Only functions create environments
function f(){
    var result = [];
    for (var i=0; i<3; i++){
        (function(){
            //step1: IIFE
            var pos =i; //take a snapshot or copy from i
            var func = function(){
                return pos;
            };
            result.push(func);
        }());
    }
    return result;
}
console.log(f()[1]()); //1
//Note that the example has real-world relevance, 
//because similar scenarios arise when you add event handlers to DOM elements via loops.