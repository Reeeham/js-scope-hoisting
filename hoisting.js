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

(function () { // open IIFE
    // inside IIFE
}()); // close IIFE

//You can also enforce the expression context via prefix operators. For example, you can do so via the logical Not operator:

!function () { // open IIFE
    // inside IIFE
}(); // close IIFE

//or via the void operator (see The void Operator):
void function () { // open IIFE
    // inside IIFE
}(); // close IIFE

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

getAllPropertyNames(window).sort().slice(0, 5)
//[ 'AnalyserNode', 'Array', 'ArrayBuffer', 'Attr', 'Audio' ]